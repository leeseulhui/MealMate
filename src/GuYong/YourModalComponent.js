import React, { useState } from 'react';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getPositionValue } from './helpers';
import foodOptions from './FoodOptions';
import modalStyles from './ModalStyles';

Modal.setAppElement('#root');

const YourModalComponent = ({ selectedParty, setShowModal, handleSaveData, joinParty, deleteMarker, currentUserId }) => {
    const [cuisine, setCuisine] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);
    const [isSaved, setIsSaved] = useState(selectedParty.id !== 'new');
    const isCreator = selectedParty.mates && selectedParty.mates[0] && selectedParty.mates[0].uid === currentUserId;
    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
        setSelectedFood(null);
    };
    const deleteParty = () => {    
        if (window.confirm('파티를 삭제하시겠습니까?')) {
            deleteMarker(selectedParty.id);
        }
    };

    const selectFoodCard = (food) => {
        setSelectedFood(food);
    };

    const savePartyData = () => {
        if (cuisine && selectedFood) {
            handleSaveData(cuisine, selectedFood.name);
            setShowModal(false);
            setIsSaved(true);
        } else {
            alert('음식 유형과 음식을 모두 선택해주세요.');
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={() => setShowModal(false)}
            style={modalStyles}
            contentLabel="Party Modal"
        >
            <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#5e72e4' }}>파티 정보</h2>
            </div>
            {selectedParty.id !== 'new' && (
                <div style={{ marginBottom: '20px' ,alignItems: 'center'}}>
                    <div style={{ marginBottom: '10px' ,textAlign: 'center'}}>
                        <strong>주소:</strong>
                        <p>{getPositionValue(selectedParty)}</p>
                    </div>
                    <div style={{ marginBottom: '10px',textAlign: 'center' }}>
                        <strong>음식 유형:</strong>
                        <p>{selectedParty.cuisine || '미정'}</p>
                    </div>
                    <div style={{ marginBottom: '10px',textAlign: 'center' }}>
                        <strong>선택된 음식:</strong>
                        <p>{selectedParty.foodChoice || '미정'}</p>
                    </div>
                    <h3 style={{ color: '#5e72e4', marginBottom: '10px',textAlign: 'center' }}>파티 멤버</h3>
                    <ul style={{ listStyleType: 'none', padding: 0,textAlign: 'center' }}>
                        {selectedParty.mates.map((mate, index) => (
                            <li key={index} style={{ background: '#e9ecef', padding: '5px 10px', borderRadius: '5px', margin: '5px 0' }}>
                                {mate.displayName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedParty.id === 'new' && (
                <div>
                    <h3 style={{ color: '#5e72e4', marginBottom: '10px',textAlign: 'center' }}>음식 선택</h3>
                    <div>
                        {Object.keys(foodOptions).map((option) => (
                            <button
                                key={option}
                                onClick={() => handleCuisineChange({ target: { value: option } })}
                                style={{
                                    margin: '5px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    background: cuisine === option ? '#5e72e4' : '#f8f9fa',
                                    color: cuisine === option ? 'white' : 'black',
                                    border: 'none',
                                    width: '100%',
                                    cursor: 'pointer'
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                        {cuisine && (
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={3}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {foodOptions[cuisine].map((food) => (
                                    <SwiperSlide key={food.name}>
                                        <div
                                            onClick={() => selectFoodCard(food)}
                                            style={{
                                                cursor: 'pointer',
                                                flex: '0 1 30%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                margin: '10px',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: selectedFood && selectedFood.name === food.name ? '#5e72e4' : '#f8f9fa',
                                                color: selectedFood && selectedFood.name === food.name ? 'white' : 'black',
                                                padding: '10px'
                                            }}
                                        >
                                            <img src={food.image} alt={food.name} style={{ width: '100%', borderRadius: '5px' }} />
                                            <h4>{food.name}</h4>
                                            <p>{food.description}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <button onClick={savePartyData} style={{ backgroundColor: '#5e72e4', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
                            저장
                        </button>
                    </div>
                </div>
            )}
            {isCreator && (
                <button onClick={deleteParty} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px', }}>
                    삭제
                </button>
            )}
            {isSaved && (
                <>
                    <button onClick={() => joinParty(selectedParty)} style={{ backgroundColor: '#5e72e4', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
                        참가
                    </button>
                </>
            )}
            <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#f8f9fa', color: '#5e72e4', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
                닫기
            </button>
        </Modal>
    );
};

export default YourModalComponent;