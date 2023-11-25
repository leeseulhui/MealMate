import React from 'react';
import Modal from 'react-modal';

const PartyListModal = ({ isOpen, onClose, parties }) => {
  const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
  };

  const titleStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const itemStyle = {
    backgroundColor: '#f7f7f7',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
  };

  const infoStyle = {
    margin: '5px 0',
  };

  const closeButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <h2 style={titleStyle}>내 파티 목록</h2>
      <ul style={listStyle}>
        {parties.map((party) => (
          <li key={party.id} style={itemStyle}>
            <p style={infoStyle}><strong>파티 주소:</strong> {party.address}</p>
            <p style={infoStyle}><strong>음식 유형:</strong> {party.cuisine}</p>
            <p style={infoStyle}><strong>선택된 음식:</strong> {party.foodChoice}</p>
            <p style={infoStyle}><strong>참가자 수:</strong> {party.mates.length}</p>
          </li>
        ))}
      </ul>
      <button onClick={onClose} style={closeButtonStyle} onMouseEnter={e => e.target.style.backgroundColor = '#d32f2f'} onMouseLeave={e => e.target.style.backgroundColor = '#f44336'}>닫기</button>
    </Modal>
  );
};

export default PartyListModal;
