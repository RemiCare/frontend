 import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

// 사용자 컨텍스트 생성
const UserContext = createContext();

// 사용자 컨텍스트 제공자 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setUserRole(null);
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    try {
      // 사용자 정보 가져오기
      const userResponse = await axiosInstance.get('/api/user/me');
      if (userResponse.data.results?.[0]) {
        setUser(userResponse.data.results[0]);
        setIsLoggedIn(true);
      }

      // 사용자 역할 확인
      const roleResponse = await axiosInstance.get('/api/user/role-check');
      if (roleResponse.data.results?.[0]) {
        setUserRole(roleResponse.data.results[0]);
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      // 오류 발생 시 로그아웃 처리 (토큰이 만료되었거나 유효하지 않은 경우)
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        setUser(null);
        setUserRole(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // 로그인 상태 변경 감지
  useEffect(() => {
    const handleLoginStatusChange = () => {
      fetchUserInfo();
    };

    // 초기 로그인 상태 확인
    fetchUserInfo();

    // 로그인 상태 변경 이벤트 리스너 등록
    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  // 사용자 정보 업데이트 함수
  const updateUserInfo = async (updatedInfo) => {
    try {
      await axiosInstance.patch('/api/user/me', updatedInfo);
      await fetchUserInfo(); // 업데이트 후 정보 다시 가져오기
      return true;
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error);
      return false;
    }
  };

  // 로그아웃 처리 함수
  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStatusChanged'));
  };

  const value = {
    user,
    userRole,
    isLoggedIn,
    loading,
    fetchUserInfo,
    updateUserInfo,
    logout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 사용자 컨텍스트 사용을 위한 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;