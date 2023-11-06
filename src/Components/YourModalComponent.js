import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Replace '#root' with the actual root element ID of your app

const YourModalComponent = ({
    selectedParty,
    setShowModal,
    handleSaveData,
    joinParty
}) => {
    const [cuisine, setCuisine] = useState('');
    const [foodChoice, setFoodChoice] = useState('');

    const foodOptions = {
        한식: ["김치찌개", "불고기", "비빔밥"],
        중식: ["짜장면", "마파두부", "꿔바로우"],
        양식: ["스테이크", "파스타", "피자"],
        일식: ["초밥", "라멘", "돈부리"],
    };

    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
        setFoodChoice('');
    };

    const handleFoodChoiceChange = (event) => {
        setFoodChoice(event.target.value);
    };

    const savePartyData = () => {
        if (cuisine && foodChoice) {
            handleSaveData(cuisine, foodChoice);
            setShowModal(false);
        } else {
            alert('음식 유형과 음식을 모두 선택해주세요.');
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '33%',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '20px',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backgroundColor: '#f7f7f7', // Light gray background for the modal content
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={() => setShowModal(false)}
            style={customStyles}
            contentLabel="Party Modal"
        >
            <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2 style={{ color: '#5e72e4' }}>파티 정보</h2> {/* Primary color for the title */}
            </div>

            {selectedParty.id !== 'new' && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>주소:</strong>
                        <p>{selectedParty.position.lat}, {selectedParty.position.lng}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>음식 유형:</strong>
                        <p>{selectedParty.cuisine || '미정'}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>선택된 음식:</strong>
                        <p>{selectedParty.foodChoice || '미정'}</p>
                    </div>
                    <h3 style={{ color: '#5e72e4', marginBottom: '10px' }}>파티 멤버</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {selectedParty.mates.map((mate, index) => (
                            <li key={index} style={{ background: '#e9ecef', padding: '5px 10px', borderRadius: '5px', margin: '5px 0' }}>
                                {mate.displayName}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => joinParty(selectedParty)}
                        style={{ backgroundColor: '#5e72e4', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Join Party
                    </button>
                </div>
            )}

            {selectedParty.id === 'new' && (
                <div>
                    <h3 style={{ color: '#5e72e4', marginBottom: '10px' }}>음식 선택</h3>
                    <select value={cuisine} onChange={handleCuisineChange} style={{ margin: '5px', padding: '10px', borderRadius: '5px', width: '100%' }}>
                        <option value="">음식 유형 선택</option>
                        {Object.keys(foodOptions).map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {cuisine && (
                        <select value={foodChoice} onChange={handleFoodChoiceChange} style={{ margin: '5px', padding: '10px', borderRadius: '5px', width: '100%' }}>
                            <option value="">음식 선택</option>
                            {foodOptions[cuisine].map((food) => (
                                <option key={food} value={food}>{food}</option>
                            ))}
                        </select>
                    )}
                    <button
                        onClick={savePartyData}
                        style={{ backgroundColor: '#5e72e4', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        파티 생성
                    </button>
                </div>
            )}

            <button
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: '#f5365c', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}
            >
                Close
            </button>
        </Modal>
    );
};

export default YourModalComponent;
