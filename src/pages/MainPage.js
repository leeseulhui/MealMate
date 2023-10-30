import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Link to="/siginin" style={{ marginRight: '10px' }}>로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
      <h1>환영합니다!</h1>
    </div>
  );
};

export default MainPage;
