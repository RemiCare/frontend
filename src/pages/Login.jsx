import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useUser } from '../context/UserContext';
import { loginStyles } from '../styles/LoginStyle';
import { forceRefreshFcmToken } from '../firebase/fcm-token';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUserInfo } = useUser();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        loginId,
        password,
      });

      const userInfo = response.data.results?.[0];
      const token = userInfo?.token;
      if (!token) throw new Error('서버 응답에 토큰 없음');


      localStorage.setItem('accessToken', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await fetchUserInfo();
      window.dispatchEvent(new Event('loginStatusChanged'));

      const fcmToken = await forceRefreshFcmToken();
      if (fcmToken) {
        localStorage.setItem('fcmToken', fcmToken);
        await axiosInstance.patch('/api/auth/fcm-token', { fcmToken });
        console.log('✅ FCM 토큰 서버 등록 성공');
      } else {
        console.warn('❌ FCM 토큰 요청 실패 또는 권한 거부됨');
      }

      alert('로그인 성공');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.wrapper}>
        <div className={loginStyles.header}>
          <h1 className={loginStyles.title}>사회복지사 포털</h1>
          <p className={loginStyles.subtitle}>로그인 후 다양한 서비스를 이용하실 수 있습니다</p>
        </div>

        <div className={loginStyles.box}>
          <div className={loginStyles.formWrapper}>
            <div className={loginStyles.formInner}>
              <div className={loginStyles.fieldWrapper}>
                <label htmlFor="loginId" className={loginStyles.label}>아이디</label>
                <input
                  type="text"
                  id="loginId"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={loginStyles.input}
                  placeholder="아이디를 입력하세요"
                />
              </div>

              <div className={loginStyles.fieldWrapper}>
                <label htmlFor="password" className={loginStyles.label}>비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={loginStyles.input}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div className={loginStyles.options}>
                <div className={loginStyles.checkboxWrapper}>
                  <input type="checkbox" id="remember" className={loginStyles.checkbox} />
                  <label htmlFor="remember" className={loginStyles.checkboxLabel}>아이디 저장</label>
                </div>
                <div className={loginStyles.findLinks}>
                  <a href="/find-id" className={loginStyles.link}>아이디 찾기</a>
                  <span className={loginStyles.divider}>|</span>
                  <a href="/find-password" className={loginStyles.link}>비밀번호 찾기</a>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={loginStyles.loginButton(loading)}
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>

              <div className={loginStyles.footer}>
                <p className={loginStyles.footerText}>아직 회원이 아니신가요?</p>
                <a href="/signup" className={loginStyles.footerLink}>회원가입 하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;