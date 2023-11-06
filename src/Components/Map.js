import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { auth } from '../Components/LoginSignup/firebase_config.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateMarkerData, saveMarkerData, getMarkers } from './firebaseService.js';
import YourModalComponent from './YourModalComponent.js';

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
            position: newPartyLocation,
            mates: user ? [{ uid: user.uid, displayName: user.displayName || 'Anonymous' }] : [],
            cuisine: cuisine,
            foodChoice: foodChoice,
        };

        try {
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
                        handleSaveData={(cuisine, foodChoice) => handleSaveData(cuisine, foodChoice)} // Pass a wrapper function
                        joinParty={joinParty}
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