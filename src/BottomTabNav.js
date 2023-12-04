import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 하단 탭바 컴포넌트
const BottomTabNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 /home 또는 /map 인지 확인
  const shouldShowTabNav = location.pathname === '/home' || location.pathname === '/map';

  if (!shouldShowTabNav) {
    // 현재 경로가 /home 또는 /map이 아니라면 탭바를 렌더링하지 않음
    return null;
  }

  return (
    <div className="bottom-tab-nav">
      <button onClick={() => navigate('/home')}>홈</button>
      <button onClick={() => navigate('/map')}>지도</button>
      <button onClick={() => navigate('/Chats')}>채팅</button>
    </div>
  );
};

export default BottomTabNav;