import React from 'react';
import Modal from 'react-modal';

const PartyListModal = ({ isOpen, onClose, parties }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>내 파티 목록</h2>
      <ul>
        {parties.map((party) => (
          <li key={party.id}>
            <p>파티 주소: {party.address}</p>
            <p>음식 유형: {party.cuisine}</p>
            <p>선택된 음식: {party.foodChoice}</p>
            <p>참가자 수: {party.mates.length}</p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>닫기</button>
    </Modal>
  );
};

export default PartyListModal;
