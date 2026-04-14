import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setupAllListeners } from './firebase/fcm-token';

// 📄 페이지 컴포넌트 임포트
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import MyPageAuth from './pages/MyPageAuth'; 
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import ElderlyAssignment from './pages/ElderlyAssignment';
import NotificationList from './pages/NotificationList';
import AlarmGroupList from './pages/AlarmGroupList';

const Services = () => <div className="p-8">복지서비스 페이지</div>;
const Apply = () => <div className="p-8">서비스 신청 페이지</div>;
const Report = () => <div className="p-8">복지신고 페이지</div>;
const Admin = () => <div className="p-8">관리 페이지</div>;

function App() {
  useEffect(() => {
    setupAllListeners();

    const handleNotificationUpdate = () => {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      if (notifications.length > 0) {
        const latest = notifications[0];
        toast.info(`${latest.title} - ${latest.body}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    };

    window.addEventListener('notificationUpdated', handleNotificationUpdate);
    return () => {
      window.removeEventListener('notificationUpdated', handleNotificationUpdate);
    };
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage-auth" element={<MyPageAuth />} /> 
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/report" element={<Report />} />
              <Route path="/chat" element={<ChatList />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
              <Route path="/assign-elderly" element={<ElderlyAssignment />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/find-id" element={<FindId />} />
              <Route path="/find-password" element={<FindPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/notifications" element={<NotificationList />} />
              <Route path="/alarm-groups" element={<AlarmGroupList />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
