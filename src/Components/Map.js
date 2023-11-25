import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { auth } from '../Components/LoginSignup/firebase_config.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateMarkerData, saveMarkerData, getMarkers, deleteMarkerData } from '../GuYong/firebaseService.js';
import YourModalComponent from '../GuYong/YourModalComponent.js';
import PartyListModal from '../GuYong/PartyListModal.js';
import axios from 'axios';

function Map() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [parties, setParties] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPartyLocation, setNewPartyLocation] = useState(null);
    const [selectedParty, setSelectedParty] = useState(null);
    const [zoom, setZoom] = useState(15);
    const [showPartyListModal, setShowPartyListModal] = useState(false);
    const userParties = parties.filter(party =>
        party.mates.some(mate => mate.uid === user?.uid)
    );
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
            await deleteMarkerData(partyId);
            setParties(parties.filter(party => party.id !== partyId)); // 상태 업데이트
            setShowModal(false);
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
        setZoom(18.5); // Set the zoom level to a higher value
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
        let address = ''; // 초기 주소 값을 빈 문자열로 설정
    
        try {
            // Geocoding API 호출
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPartyLocation.lat},${newPartyLocation.lng}&key=AIzaSyBXSxMFjzikCYRuUJ_7DvFxAvoib0INVq8`);
            if (response.data.status === 'OK') {
                if (response.data.results.length > 0) {
                    address = response.data.results[0].formatted_address; // 주소 업데이트
                } else {
                    console.log('No address found for this location.');
                }
            } else {
                console.error('Geocoding failed: ' + response.data.status);
            }
        } catch (error) {
            console.error('Error fetching address: ', error);
        }
    
        // 새 파티 객체 생성
        const newParty = {
            mates: user ? [{ uid: user.uid, displayName: user.displayName || 'Anonymous' }] : [],
            cuisine: cuisine,
            foodChoice: foodChoice,
            position: newPartyLocation,
            address: address // 여기에 주소 추가
        };
    
        try {
            // 데이터베이스에 새 파티 저장
            const docRefId = await saveMarkerData(newParty);
            setParties([...parties, { ...newParty, id: docRefId }]);
            openModalWithParty({ ...newParty, id: docRefId });
        } catch (error) {
            console.error('Error saving new party: ', error);
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
                    zoom={zoom}
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
                <PartyListModal
                    isOpen={showPartyListModal}
                    onClose={() => setShowPartyListModal(false)}
                    parties={userParties}
                />

                <button onClick={() => setShowPartyListModal(true)} style={ListButtonStyle} >
                    내 파티 목록 보기
                </button>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                    로그아웃
                </button>

                {showModal && selectedParty && (
                    <YourModalComponent
                        selectedParty={selectedParty}
                        setShowModal={setShowModal}
                        handleSaveData={handleSaveData}
                        joinParty={joinParty}
                        deleteMarker={deleteMarker}
                        user={user}
                        currentUserId={user && user.uid}
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
const ListButtonStyle = {
    position: 'absolute',
    top: '50px',
    right: '10px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};
export default Map;
