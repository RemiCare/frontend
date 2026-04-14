import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';

const ChatButton = ({ userId, userName }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartChat = async () => {
    if (!userId) {
      alert('대화 상대 ID가 필요합니다.');
      return;
    }
    
    setLoading(true);
    
    try {
      // API 명세서에 따라 receiverId를 쿼리 파라미터로 전달
      const response = await axiosInstance.get(`/api/chat-room/create?receiverId=${userId}`);
      
      if (response.data && response.data.status?.code === 200) {
        // 새로 생성된 채팅방으로 이동
        if (response.data.results && response.data.results.length > 0) {
          const roomId = response.data.results[0].roomId;
          navigate(`/chat/${roomId}`);
        }
      } else if (response.data.status?.code === 400) {
        // 자신과의 채팅방 생성 시도 등 오류 처리
        alert(response.data.status.message || '채팅방 생성에 실패했습니다.');
      } else {
        alert('채팅방 생성에 실패했습니다.');
      }
    } catch (err) {
      console.error('채팅방 생성 오류:', err);
      if (err.response?.data?.status?.message) {
        alert(`채팅방 생성 중 오류가 발생했습니다: ${err.response.data.status.message}`);
      } else {
        alert('채팅방 생성 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartChat}
      disabled={loading}
      className={`${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
      } text-white px-4 py-2 rounded-lg flex items-center`}
    >
      {loading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          처리 중...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          대화 참여하기
        </>
      )}
    </button>
  );
};

export default ChatButton;