import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { auth } from '../Components/LoginSignup/firebase_config.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateMarkerData, saveMarkerData, getMarkers, deleteMarkerData } from './firebaseService.js';
import YourModalComponent from './YourModalComponent.js';
import axios from 'axios';

function Map() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [parties, setParties] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPartyLocation, setNewPartyLocation] = useState(null);
    const [selectedParty, setSelectedParty] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchMarkers = async () => {
            const markers = await getMarkers();
            setParties(markers);
        };
        fetchMarkers();
    }, []);

    const deleteMarker = async (partyId) => {
        try {
            await deleteMarkerData(partyId); // 가정: deleteMarkerData는 firebaseService.js에 정의된 함수
            setParties(parties.filter(party => party.id !== partyId));
            setShowModal(false); // 삭제 후 모달을 닫음
        } catch (error) {
            console.error('Error deleting marker: ', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleMapClick = (event) => {
        const location = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setNewPartyLocation(location);
        openModalWithParty({ position: location, mates: [], id: 'new' });
    };

    const handleMarkerClick = (party) => {
        openModalWithParty(party);
    };

    const openModalWithParty = (party) => {
        setSelectedParty(party);
        setShowModal(true);
    };

    const handleSaveData = async (cuisine, foodChoice) => {
        const newParty = {
            mates: user ? [{ uid: user.uid, displayName: user.displayName || 'Anonymous' }] : [],
            cuisine: cuisine,
            foodChoice: foodChoice,
            position: newPartyLocation, // Save the latitude and longitude
            // Initialize with an empty address; will be filled in by geocoding
            address: ''
        };

        try {
            // Use Google Maps Geocoding API to get the address
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPartyLocation.lat},${newPartyLocation.lng}&key=AIzaSyBXSxMFjzikCYRuUJ_7DvFxAvoib0INVq8`);

            // Check if any results were returned
            if (response.data.status === 'OK') {
                if (response.data.results.length > 0) {
                    newParty.address = response.data.results[0].formatted_address;
                } else {
                    console.log('No address found for this location.');
                    newParty.address = 'No address found';
                }
            } else {
                console.error('Geocoding failed: ' + response.data.status);
            }

            // Continue with saving the data
            const docRefId = await saveMarkerData(newParty);
            setParties([...parties, { ...newParty, id: docRefId }]);
            openModalWithParty({ ...newParty, id: docRefId });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    const joinParty = async (party) => {
        const partyId = party.id;
        if (!Array.isArray(party.mates)) {
            party.mates = [];
        }

        if (party.mates.length < 4) {
            const userExists = party.mates.some((mate) => mate.uid === user.uid);

            if (!userExists) {
                party.mates.push({
                    uid: user.uid,
                    displayName: user.displayName || "Anonymous",
                });

                try {
                    await updateMarkerData(partyId, { mates: party.mates });
                    setSelectedParty({ ...party, id: partyId, mates: party.mates });
                    console.log("Party updated with new mate!");
                } catch (e) {
                    console.error("Error updating party: ", e);
                }
            } else {
                alert("You are already part of this party.");
            }
        } else {
            alert("This party is already full.");
        }
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBXSxMFjzikCYRuUJ_7DvFxAvoib0INVq8">
            <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                    }}
                    center={newPartyLocation || { lat: 36.8, lng: 127.074 }}
                    zoom={15}
                    onClick={handleMapClick}
                >
                    {parties.map((party) => (
                        <Marker
                            key={party.id}
                            position={party.position}
                            onClick={() => handleMarkerClick(party)}
                        />
                    ))}
                    {newPartyLocation && (
                        <Marker
                            position={newPartyLocation}
                            draggable={true}
                            onDragEnd={(event) => setNewPartyLocation({
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng(),
                            })}
                            onClick={() => handleMarkerClick({ position: newPartyLocation, id: 'new' })}
                        />
                    )}
                </GoogleMap>

                <button onClick={handleLogout} style={logoutButtonStyle}>
                    로그아웃
                </button>

                {showModal && selectedParty && (
                    <YourModalComponent
                        selectedParty={selectedParty}
                        setShowModal={setShowModal}
                        handleSaveData={handleSaveData}
                        joinParty={joinParty}
                        deleteMarker={deleteMarker} // 추가
                        user={user}
                    />
                )}
            </div>
        </LoadScript>
    );
}
const logoutButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Map;
