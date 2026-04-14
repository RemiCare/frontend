import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';
import { chatListStyles } from '../styles/ChatListStyle';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('/api/user/me');
      if (response.data && response.data.status?.code === 200) {
        setCurrentUser(response.data.results?.[0] || response.data.data);
        return response.data.results?.[0] || response.data.data;
      }
    } catch (err) {
      console.error('사용자 정보 조회 오류:', err);
    }
    return null;
  };

  const fetchChatPartners = async (user) => {
    try {
      setLoadingUsers(true);
      let chatPartners = [];

      if (user.role === 'SOCIAL_WORKER') {
        const response = await axiosInstance.get('/api/elderly/assigned');
        if (response.data && response.data.status?.code === 200) {
          chatPartners = response.data.results || [];
        }
      } else {
        const response = await axiosInstance.get('/api/social-worker/assigned');
        if (response.data && response.data.status?.code === 200) {
          chatPartners = response.data.results || [];
        }
      }

      setUsers(chatPartners);
    } catch (err) {
      console.error('채팅 상대 목록 조회 오류:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUsers = async () => {
    const user = currentUser || await fetchCurrentUser();
    if (user) {
      fetchChatPartners(user);
    }
  };

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/chat-room/list');
      if (response.data && response.data.status?.code === 200) {
        setChatRooms(response.data.results || []);
        setError('');
      } else {
        setError('채팅방 목록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('채팅방 목록 조회 오류:', err);
      if (err.response?.data?.status?.message) {
        setError(`채팅방 목록을 불러오는 중 오류가 발생했습니다: ${err.response.data.status.message}`);
      } else {
        setError('채팅방 목록을 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const createChatRoom = async () => {
    if (!receiverId) {
      alert('대화 상대를 선택해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/chat-room/create?receiverId=${receiverId}`);
      if (response.data && response.data.status?.code === 200) {
        fetchChatRooms();
        setShowNewChatForm(false);

        if (response.data.results && response.data.results.length > 0) {
          const roomId = response.data.results[0].roomId;
          navigate(`/chat/${roomId}`);
        }
      } else {
        setError(response.data.status?.message || '채팅방 생성에 실패했습니다.');
      }
    } catch (err) {
      console.error('채팅방 생성 오류:', err);
      setError(err.response?.data?.status?.message || '채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  const enterChatRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const toggleNewChatForm = () => {
    setShowNewChatForm(!showNewChatForm);
    if (!showNewChatForm && users.length === 0) {
      fetchUsers();
    }
  };

  useEffect(() => {
    const initData = async () => {
      await fetchCurrentUser();
      fetchChatRooms();
    };
    initData();
  }, []);

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    try {
      const date = new Date(dateTimeStr.replace(' ', 'T'));
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } catch (err) {
      console.error('시간 변환 오류:', err);
      return dateTimeStr;
    }
  };

  const renderNoChatPartnersMessage = () => (
    <div className={chatListStyles.warningBox}>
      <p className={chatListStyles.warningTitle}>채팅 가능한 상대가 없습니다</p>
      <p className={chatListStyles.warningText}>
        {currentUser?.role === 'SOCIAL_WORKER'
          ? '노인이 할당되어 있지 않습니다. 먼저 노인을 할당받아야 채팅이 가능합니다.'
          : '담당 사회복지사가 할당되어 있지 않습니다. 담당자 배정 후 채팅이 가능합니다.'}
      </p>
    </div>
  );

  return (
    <div className={chatListStyles.container}>
      <div className={chatListStyles.header}>
        <h2 className={chatListStyles.title}>채팅방 목록</h2>
        {!showNewChatForm && (
          <button onClick={toggleNewChatForm} className={chatListStyles.newChatButton}>
            새 채팅방
          </button>
        )}
      </div>

      {showNewChatForm && (
        <div className={chatListStyles.newChatForm}>
          <div className={chatListStyles.formHeader}>
            <h3 className={chatListStyles.formTitle}>새 채팅방 만들기</h3>
            <button onClick={() => setShowNewChatForm(false)} className={chatListStyles.closeButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-3">
            <label className={chatListStyles.label}>대화 상대 선택</label>
            {loadingUsers ? (
              <div className="text-center py-2">
                <span className="text-sm text-gray-500">사용자 목록을 불러오는 중...</span>
              </div>
            ) : users.length === 0 ? (
              renderNoChatPartnersMessage()
            ) : (
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className={chatListStyles.select}
              >
                <option value="">선택하세요</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.role && `(${user.role === 'SOCIAL_WORKER' ? '사회복지사' : '노인'})`}
                  </option>
                ))}
              </select>
            )}
          </div>
          {users.length > 0 && (
            <button
              onClick={createChatRoom}
              className={chatListStyles.createButton}
              disabled={!receiverId}
            >
              채팅방 만들기
            </button>
          )}
        </div>
      )}

      {error && <div className={chatListStyles.errorBox}>{error}</div>}

      {loading ? (
        <div className={chatListStyles.loadingWrapper}>
          <div className={chatListStyles.spinner}></div>
          <p className={chatListStyles.loadingText}>채팅방 목록을 불러오는 중...</p>
        </div>
      ) : chatRooms.length === 0 ? (
        <div className={chatListStyles.emptyBox}>
          <svg xmlns="http://www.w3.org/2000/svg" className={chatListStyles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className={chatListStyles.emptyText}>참여 중인 채팅방이 없습니다.</p>
        </div>
      ) : (
        <ul className={chatListStyles.chatList}>
          {chatRooms.map((room) => (
            <li key={room.roomId} className={chatListStyles.chatItem}>
              <button onClick={() => enterChatRoom(room.roomId)} className={chatListStyles.chatButton}>
                <div className={chatListStyles.chatInfo}>
                  <h3 className={chatListStyles.chatName}>{room.receiverName || `채팅방 ${room.roomId}`}</h3>
                  <p className={chatListStyles.chatMessage}>{room.lastMessage || '새 채팅방'}</p>
                  {room.lastMessageAt && (
                    <p className={chatListStyles.chatTime}>{formatTime(room.lastMessageAt)}</p>
                  )}
                </div>
                <div className={chatListStyles.chatArrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;