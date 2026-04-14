import React, { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.patch(
        '/api/auth/password/change',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data?.status?.code === 200) {
        //  성공 시: 토큰 제거 + 로그인 페이지로 이동
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common['Authorization'];

        setMessage('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
        setError('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);  // 2초 뒤 로그인 페이지로 이동
      } else {
        setMessage('');
        setError('비밀번호 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setMessage('');
      setError('현재 비밀번호가 올바르지 않거나 서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">비밀번호 변경</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          placeholder="현재 비밀번호 입력"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          placeholder="새 비밀번호 입력"
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
      >
        비밀번호 변경
      </button>

      {message && (
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded text-center">{message}</div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-center">{error}</div>
      )}
    </div>
  );
};

export default ChangePassword;