import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios';
import { auth } from "../firebase_config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getFirebase } from "../firebase_config"; // ensure you export your firebase instance

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 36.800,
    lng: 127.074,
};

async function saveMarkerData(markerData) {
    const db = getFirestore(getFirebase());
    const markerCollection = collection(db, "markers");

    try {
        const docRef = await addDoc(markerCollection, markerData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

function Map() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");
    const [mates, setMates] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (markerPosition && showModal) {
            const fetchAddress = async () => {
                try {
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${markerPosition.lat},${markerPosition.lng}&key=AIzaSyBXSxMFjzikCYRuUJ_7DvFxAvoib0INVq8`);
                    setAddress(response.data.results[0].formatted_address);
                } catch (error) {
                    console.error("Error fetching address: ", error);
                }
            };
            fetchAddress();
        }
    }, [markerPosition, showModal]);

    const addMate = () => {
        if (mates.length < 4 && user) {
            const userExists = mates.some(mate => mate.uid === user.uid);
    
            if (!userExists) {
                const newUser = {
                    uid: user.uid,
                    displayName: user.displayName || "Anonymous",
                };
                setMates(prev => [...prev, newUser]);
            } else {
                alert('이미 식사 메이트로 등록된 사용자입니다.');
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const saveData = () => {
        const newData = {
            position: markerPosition,
            address: address,
            mates: mates
        };
        saveMarkerData(newData); // save data to Firestore
        setShowModal(false);
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBXSxMFjzikCYRuUJ_7DvFxAvoib0INVq8">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={markerPosition || center}
                zoom={15}
                onClick={(event) => {
                    setMarkerPosition({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    });
                }}
            >
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={(event) => {
                            setMarkerPosition({
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng(),
                            });
                        }}
                        onClick={() => setShowModal(true)}
                    />
                )}
            </GoogleMap>
            <button onClick={logout} style={{
                position: 'absolute',
                top: '100px',
                right: '10px',
                padding: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}>로그아웃</button>
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    zIndex: 1000
                }}>
                    주소: {address}
                    <div>
                        식사 메이트:
                        <ul>
                            {mates.map((mate, index) => <li key={index}>{mate.displayName}</li>)}
                        </ul>
                        {mates.length < 4 && (
                            <button onClick={addMate}>가입</button>
                        )}
                    </div>
                    <button onClick={saveData}>저장</button>
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}
        </LoadScript>
    );
}

export default Map;