import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';
import { findPasswordStyles } from '../styles/FindPasswordStyle';

const FindPassword = () => {
  const [loginId, setLoginId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!loginId.trim() || !phoneNumber.trim()) {
      setError('아이디와 전화번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/find-password', {
        loginId,
        phoneNumber,
      });

      if (response.data?.status?.code === 200) {
        setMessage('인증번호가 발송되었습니다. 비밀번호 재설정 페이지로 이동합니다.');
        setError('');
        setTimeout(() => {
          navigate('/reset-password', {
            state: { loginId, phoneNumber },
          });
        }, 1500);
      } else {
        setMessage('');
        setError('일치하는 정보가 없습니다.');
      }
    } catch (err) {
      console.error('Error details:', err);
      setMessage('');
      setError(`인증번호 전송 중 오류가 발생했습니다: ${err.response?.data?.status?.message || err.message}`);
    }
  };

  return (
    <div className={findPasswordStyles.container}>
      <h2 className={findPasswordStyles.title}>비밀번호 찾기</h2>

      <div className={findPasswordStyles.inputWrapper}>
        <label className={findPasswordStyles.label}>로그인 ID</label>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={findPasswordStyles.input}
          placeholder="아이디 입력"
        />
      </div>

      <div className={findPasswordStyles.inputWrapper}>
        <label className={findPasswordStyles.label}>전화번호</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={findPasswordStyles.input}
          placeholder="01012345678"
        />
      </div>

      <button
        onClick={handleSendCode}
        className={findPasswordStyles.button}
      >
        인증번호 전송
      </button>

      {message && <div className={findPasswordStyles.messageBox}>{message}</div>}
      {error && <div className={findPasswordStyles.errorBox}>{error}</div>}
    </div>
  );
};

export default FindPassword;
