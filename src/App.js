import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import TpriMap from './TpriMap';
import LandingPage from './LandingPage';
import './styles/App.css';
import axios from 'axios';

function App() {
  const [user_id, setId] = useState(null);
  const [access_token, setAccessToken] = useState(null);

  const id_request = async(auth) => {
    try {
      const response = await axios.get("/v2/user/me",
      {headers: {
        'Authorization' : 'Bearer ' + auth.access_token
      }});
      localStorage.setItem('id', response.data.id);
      setId(response.data.id);
    } catch(err) {
      console.error(err);
    }
  }

  const loginWithKakao = () => {
    try {
      return new Promise((resolve, reject) => {
        if (!window.Kakao) {
          reject('Kakao 인스턴스가 존재하지 않습니다.');
        }
        window.Kakao.Auth.login({
          success: (auth) => {
            console.log('로그인 되었습니다.', auth);
            id_request(auth);
            setAccessToken(auth.access_token);
          },
          fail: (err) => {
            console.error(err);
          }
        })
      })
    } catch(err) {
      console.error(err);
    }
  }
  const logoutWithKakao = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      console.log('카카오 인증 액세스 토큰이 존재합니다.', window.Kakao.Auth.getAccessToken());
      window.Kakao.Auth.logout(() => {
        console.log('로그아웃 되었습니다.', window.Kakao.Auth.getAccessToken());
        localStorage.removeItem('id');
        setId(null);
      })
    }
  }
  return (
    <div>
      <header>
        <div className="wrap-head">
          <h1>
            <Link to="/" className="link-tpri">
              <span>TPRI</span>
            </Link>
          </h1>
          <h2>
          {localStorage.getItem('id') !== null ?
            <div>
              <span className="user-auth" onClick={logoutWithKakao}>sIgn ouT</span>
              <Link to='/tprimap' className="link-map">
                <span>go TPRI</span>
              </Link>
            </div>
            :
            <span className="user-auth" onClick={loginWithKakao}>sIgn In</span>}
          </h2>
        </div>
      </header>
      <div>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/tprimap'>
            <TpriMap/>
        </Route>
      </div>
    </div>
  );
}

export default App;
