import React, { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { findIdStyles } from '../styles/FindIdStyle';

const FindId = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foundId, setFoundId] = useState('');
  const [error, setError] = useState('');

  const handleFindId = async () => {
    try {
      const response = await axiosInstance.post('/api/auth/find-id', {
        name,
        phoneNumber,
      });

      const foundLoginId = response.data?.results?.[0]?.loginId;

      if (foundLoginId) {
        setFoundId(foundLoginId);
        setError('');
      } else {
        setFoundId('');
        setError('일치하는 아이디를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      setFoundId('');
      setError('아이디 찾기 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={findIdStyles.container}>
      <h2 className={findIdStyles.title}>아이디 찾기</h2>

      <div className={findIdStyles.inputWrapper}>
        <label className={findIdStyles.label}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={findIdStyles.input}
          placeholder="이름 입력"
        />
      </div>

      <div className={findIdStyles.inputWrapper}>
        <label className={findIdStyles.label}>전화번호</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={findIdStyles.input}
          placeholder="01012345678"
        />
      </div>

      <button onClick={handleFindId} className={findIdStyles.button}>
        아이디 찾기
      </button>

      {foundId && (
        <div className={findIdStyles.resultBox}>
          회원님의 아이디는 <strong>{foundId}</strong> 입니다.
        </div>
      )}
      {error && <div className={findIdStyles.errorBox}>{error}</div>}
    </div>
  );
};

export default FindId;
