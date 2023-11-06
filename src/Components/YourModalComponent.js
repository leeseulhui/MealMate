import React, { useState } from 'react';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import kimchiStewImage from '../images/free-icon-kimchi-2276924.png'
Modal.setAppElement('#root');

const foodOptions = {
    한식: [
        { name: "김치찌개", description: "1", image:  kimchiStewImage},
        { name: "불고기", description: "2", image: "../../images/free-icon-kimchi-2276924.png" },
        { name: "비빔밥", description: "3", image: "/images/free-icon-kimchi-2276924.png" },
        { name: "비빔", description: "4", image: "../../images/asd.jpg" },
        { name: "비", description: "5", image: "../../images/asd.jpg" }
    ],
    중식: [
        { name: "짜장면", description: "전통 한국 김치 스튜", image: "../../images/asd.jpg" },
        { name: "마파두부", description: "마리네이드된 구이용 소고기", image: "../../images/asd.jpg" },
        { name: "꿔바로우", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: "../../images/asd.jpg" }
    ],
    양식: [
        { name: "스테이크", description: "전통 한국 김치 스튜", image: "../../images/asd.jpg" },
        { name: "파스타", description: "마리네이드된 구이용 소고기", image: "../../images/asd.jpg" },
        { name: "비빔밥", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: "../../images/asd.jpg" }
    ],
    일식: [
        { name: "초밥", description: "전통 한국 김치 스튜", image: "../../images/asd.jpg" },
        { name: "라멘", description: "마리네이드된 구이용 소고기", image: "../../images/asd.jpg" },
        { name: "돈부리", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: "../../images/asd.jpg" }
    ],
};




const YourModalComponent = ({ selectedParty, setShowModal, handleSaveData, joinParty }) => {
    const [cuisine, setCuisine] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);

    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
        setSelectedFood(null);
    };

    const selectFoodCard = (food) => {
        setSelectedFood(food);
    };

    const savePartyData = () => {
        if (cuisine && selectedFood) {
            handleSaveData(cuisine, selectedFood.name);
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
                                slidesPerView={3} // 한 번에 보여질 슬라이드 개수
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
                        <button onClick={savePartyData} style={{ backgroundColor: '#5e72e4', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>저장</button>
                    </div>
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