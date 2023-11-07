import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1 className="welcome-text">홈페이지에 오신 것을 환영합니다!</h1>
      <button className="login-button" onClick={goToLogin}>회원가입 / 로그인</button>
    </div>
  );
}

export default Home;
