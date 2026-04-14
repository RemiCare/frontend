import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { chatRoomStyles } from '../styles/ChatRoomStyle';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null); 

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/api/user/me');
      if (response.data && response.data.status?.code === 200) {
        setUser(response.data.results?.[0] || response.data.data);
      }
    } catch (err) {
      console.error('사용자 정보 조회 오류:', err);
      setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchMessagesData = async () => {
      if (!roomId) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/chat-room/messages/${roomId}`);
        if (response.data && response.data.status?.code === 200) {
          setMessages(response.data.results || []);
          if (response.data.roomInfo) setRoomInfo(response.data.roomInfo);
          setError('');
        } else {
          setError('메시지를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('메시지 조회 오류:', err);
        setError(err.response?.data?.status?.message || '메시지를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessagesData();
    fetchUserInfo();
  }, [roomId]);

  useEffect(() => {
    if (!loading && messageContainerRef.current) {
      if (messages.length > 0) {
        messageContainerRef.current.scrollTop = 0;
      }
    }
  }, [loading, messages.length]);

  useEffect(() => {
    if (!roomId || !user) return;

    if (stompClientRef.current) stompClientRef.current.deactivate();
    setConnectionStatus('connecting');

    const client = new Client({
      webSocketFactory: () => new SockJS('https://server.lifewatch.store/chat'),
      connectHeaders: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      debug: (str) => console.log('STOMP: ' + str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('WebSocket 연결 성공!');
      setConnectionStatus('connected');
      client.subscribe(`/exchange/chat.exchange/room.${roomId}`, (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          setMessages(prev => [...prev, receivedMessage]);
        } catch (err) {
          console.error('메시지 수신 오류:', err);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP 오류:', frame);
      setError('WebSocket 연결 중 오류가 발생했습니다.');
      setConnectionStatus('error');
    };

    client.onWebSocketClose = () => {
      console.log('WebSocket 연결 종료');
      setConnectionStatus('disconnected');
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) stompClientRef.current.deactivate();
    };
  }, [roomId, user]);

  const leaveRoom = async () => {
    if (!window.confirm('정말로 채팅방을 나가시겠습니까?')) return;
    try {
      const response = await axiosInstance.delete(`/api/chat-room/delete/${roomId}`);
      if (response.data && response.data.status?.code === 200) {
        if (stompClientRef.current) stompClientRef.current.deactivate();
        navigate('/chat');
      } else {
        setError('채팅방 나가기에 실패했습니다.');
      }
    } catch (err) {
      console.error('채팅방 나가기 오류:', err);
      setError(err.response?.data?.status?.message || '채팅방 나가기 중 오류가 발생했습니다.');
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !stompClientRef.current || !user || connectionStatus !== 'connected') return;
    try {
      const message = {
        userId: user.id,
        roomId: parseInt(roomId),
        message: newMessage.trim(),
      };
      stompClientRef.current.publish({
        destination: '/pub/chat.message',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    } catch (err) {
      console.error('메시지 전송 오류:', err);
      setError('메시지 전송 중 오류가 발생했습니다.');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!loading && messages.length > 0) {

      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length, loading]);

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

  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      if (!message.createdAt) return;
      
      const date = new Date(message.createdAt.replace(' ', 'T'));
      const dateStr = date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      });
      
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      
      groups[dateStr].push(message);
    });
    
    return groups;
  };

  return (
    <div className={chatRoomStyles.wrapper}>
      <div className={chatRoomStyles.header}>
        <button onClick={() => navigate('/chat')} className={chatRoomStyles.headerButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className={chatRoomStyles.headerTitle}>{roomInfo?.receiverName || `채팅방 ${roomId}`}</h2>
        <button onClick={leaveRoom} className={chatRoomStyles.headerButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {connectionStatus === 'connecting' && <div className={chatRoomStyles.statusConnecting}>채팅 서버에 연결 중...</div>}
      {connectionStatus === 'error' && <div className={chatRoomStyles.statusError}>채팅 서버 연결 오류! 새로고침 후 다시 시도해주세요.</div>}

      <div ref={messageContainerRef} className={chatRoomStyles.messageContainer}>
        {loading ? (
          <div className={chatRoomStyles.loadingWrapper}>
            <div className={chatRoomStyles.spinner}></div>
            <p className={chatRoomStyles.loadingText}>메시지를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className={chatRoomStyles.errorBox}>{error}</div>
        ) : messages.length === 0 ? (
          <div className={chatRoomStyles.emptyBox}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className={chatRoomStyles.emptyText}>아직 메시지가 없습니다. 첫 메시지를 보내보세요!</p>
          </div>
        ) : (
          <div className={chatRoomStyles.messageList}>
            {/* 메시지를 날짜별로 그룹화하여 표시 */}
            {Object.entries(groupMessagesByDate(messages)).map(([dateStr, messagesForDate]) => (
              <React.Fragment key={dateStr}>
                <div className={chatRoomStyles.dateGroup}>
                  <span className={chatRoomStyles.dateText}>{dateStr}</span>
                </div>
                
                {messagesForDate.map((message, index) => {
                  const isMe = message.senderId === user?.id;
                  return (
                    <div key={message.id || index} className={chatRoomStyles.messageLine(isMe)}>
                      <div className={chatRoomStyles.messageBox(isMe)}>
                        {!isMe && <p className={chatRoomStyles.messageSender}>{message.senderName || '상대방'}</p>}
                        <p className={chatRoomStyles.messageText}>{message.message}</p>
                        <p className={chatRoomStyles.messageTime}>{formatTime(message.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className={chatRoomStyles.inputWrapper}>
        <div className={chatRoomStyles.inputRow}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className={chatRoomStyles.inputField}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={connectionStatus !== 'connected'}
          />
          <button
            onClick={sendMessage}
            className={chatRoomStyles.sendButton(connectionStatus === 'connected')}
            disabled={connectionStatus !== 'connected'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={chatRoomStyles.sendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;