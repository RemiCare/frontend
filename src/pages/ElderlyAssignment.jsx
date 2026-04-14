import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../lib/axiosInstance';

const ElderlyAssignment = () => {
  const [assignableElders, setAssignableElders] = useState([]);
  const [myAssignedElders, setMyAssignedElders] = useState([]);
  const [selectedAssignId, setSelectedAssignId] = useState('');
  const [selectedUnassignId, setSelectedUnassignId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('assign');

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/user/me');
      if (response.data?.status?.code === 200) {
        const userData = response.data.results?.[0] || response.data.data;
        setCurrentUser(userData);
        return userData;
      }
    } catch (err) {
      console.error('사용자 정보 조회 오류:', err);
      setMessage({ type: 'error', text: '사용자 정보를 불러오는 중 오류가 발생했습니다.' });
    }
    return null;
  }, []);

  const fetchAssignableElders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/user/elderly/assignable');
      if (response.data?.status?.code === 200) {
        setAssignableElders(response.data.results || []);
      } else {
        setMessage({ type: 'error', text: '할당 가능한 노인 목록 조회 실패' });
      }
    } catch (err) {
      console.error('할당 가능한 노인 조회 오류:', err);
      setMessage({ type: 'error', text: '노인 목록을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyAssignedElders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/user/elderly/assigned');
      if (response.data?.status?.code === 200) {
        setMyAssignedElders(response.data.results || []);
      } else {
        setMessage({ type: 'error', text: '할당된 노인 목록 조회 실패' });
      }
    } catch (err) {
      console.error('할당된 노인 목록 조회 오류:', err);
      setMessage({ type: 'error', text: '할당된 노인 목록을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  }, []);

  const assignElder = useCallback(async () => {
    if (!selectedAssignId || !currentUser?.id) {
      setMessage({ type: 'error', text: '노인과 사회복지사 정보가 필요합니다.' });
      return;
    }
    
    // 데이터 유효성 검사 추가
    const elderlyId = parseInt(selectedAssignId);
    const socialWorkerId = parseInt(currentUser.id);
    
    if (isNaN(elderlyId) || isNaN(socialWorkerId)) {
      setMessage({ type: 'error', text: 'ID 값이 유효하지 않습니다.' });
      return;
    }
    
    try {
      setLoading(true);
      console.log('요청 데이터:', { elderlyId, socialWorkerId }); // 디버깅용
      
      
      try {
        const response = await axiosInstance.post('/api/user/assign-elderly', {
          elderlyId,
          socialWorkerId
        });
        
        if (response.data?.status?.code === 200) {
          setMessage({ type: 'success', text: '노인 할당 성공' });
          setSelectedAssignId('');
          await fetchAssignableElders();
          await fetchMyAssignedElders();
        } else {
          const errorMsg = response.data?.status?.message || '노인 할당 실패';
          setMessage({ type: 'error', text: errorMsg });
        }
      } catch (requestErr) {
        // 서버 오류 처리
        if (requestErr.message && requestErr.message.includes('500')) {
          // IndexOutOfBoundsException 오류 발생 가능성이 높음
          setMessage({ 
            type: 'error', 
            text: '서버에서 처리 중 오류가 발생했습니다. 관리자에게 문의하세요. (오류: 인덱스 범위 초과)' 
          });
        } else {
          throw requestErr; // 다른 오류는 상위 catch 블록으로 전달
        }
      }
    } catch (err) {
      console.error('노인 할당 오류:', err);
      // 더 자세한 오류 정보 표시
      const errorMessage = err.response?.data?.status?.message || 
                          err.response?.data?.message ||
                          err.message ||
                          '알 수 없는 오류가 발생했습니다.';
      setMessage({ type: 'error', text: `노인 할당 중 오류 발생: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  }, [selectedAssignId, currentUser, fetchAssignableElders, fetchMyAssignedElders]);

  const unassignElder = useCallback(async () => {
    if (!selectedUnassignId || !currentUser?.id) {
      setMessage({ type: 'error', text: '노인과 사회복지사 정보가 필요합니다.' });
      return;
    }
    
    // 데이터 유효성 검사 추가
    const elderlyId = parseInt(selectedUnassignId);
    const socialWorkerId = parseInt(currentUser.id);
    
    if (isNaN(elderlyId) || isNaN(socialWorkerId)) {
      setMessage({ type: 'error', text: 'ID 값이 유효하지 않습니다.' });
      return;
    }
    
    try {
      setLoading(true);
      console.log('요청 데이터:', { elderlyId, socialWorkerId }); // 디버깅용
      
      const response = await axiosInstance.post('/api/user/unassign-elderly', {
        elderlyId,
        socialWorkerId
      });
      
      if (response.data?.status?.code === 200) {
        setMessage({ type: 'success', text: '노인 할당 해제 성공' });
        setSelectedUnassignId('');
        await fetchAssignableElders();
        await fetchMyAssignedElders();
      } else {
        const errorMsg = response.data?.status?.message || '노인 할당 해제 실패';
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (err) {
      console.error('노인 할당 해제 오류:', err);
      // 더 자세한 오류 정보 표시
      const errorMessage = err.response?.data?.status?.message || 
                          err.response?.data?.message ||
                          err.message ||
                          '알 수 없는 오류가 발생했습니다.';
      setMessage({ type: 'error', text: `노인 할당 해제 중 오류 발생: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  }, [selectedUnassignId, currentUser, fetchAssignableElders, fetchMyAssignedElders]);

  useEffect(() => {
    const init = async () => {
      const user = await fetchCurrentUser();
      if (user && user.role === 'SOCIAL_WORKER') {
        await fetchAssignableElders();
        await fetchMyAssignedElders();
      } else {
        setMessage({ type: 'error', text: '사회복지사만 접근할 수 있는 페이지입니다.' });
      }
    };
    init();
  }, [fetchCurrentUser, fetchAssignableElders, fetchMyAssignedElders]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">노인 관리</h2>
      <div className="flex border-b border-gray-200 mb-6">
        <button onClick={() => setActiveTab('assign')} className={`py-2 px-4 font-medium ${activeTab === 'assign' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>노인 할당</button>
        <button onClick={() => setActiveTab('unassign')} className={`py-2 px-4 font-medium ${activeTab === 'unassign' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>할당 해제</button>
      </div>
      {message.text && (
        <div className={`p-3 rounded-lg text-center mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>
      )}
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">처리 중...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeTab === 'assign' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">할당할 노인 선택</label>
                {assignableElders.length === 0 ? (
                  <div className="bg-yellow-50 p-3 rounded-lg text-yellow-700 text-sm">할당 가능한 노인이 없습니다.</div>
                ) : (
                  <select value={selectedAssignId} onChange={(e) => setSelectedAssignId(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">선택하세요</option>
                    {assignableElders.map(elderly => (
                      <option key={elderly.id} value={elderly.id}>{elderly.name} ({elderly.birthDate})</option>
                    ))}
                  </select>
                )}
              </div>
              <button onClick={assignElder} disabled={!selectedAssignId || loading} className={`w-full py-2 px-4 rounded-lg ${!selectedAssignId || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>할당하기</button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">할당 해제할 노인 선택</label>
                {myAssignedElders.length === 0 ? (
                  <div className="bg-yellow-50 p-3 rounded-lg text-yellow-700 text-sm">할당된 노인이 없습니다.</div>
                ) : (
                  <select value={selectedUnassignId} onChange={(e) => setSelectedUnassignId(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">선택하세요</option>
                    {myAssignedElders.map(elderly => (
                      <option key={elderly.id} value={elderly.id}>{elderly.name} ({elderly.birthDate})</option>
                    ))}
                  </select>
                )}
              </div>
              <button onClick={unassignElder} disabled={!selectedUnassignId || loading} className={`w-full py-2 px-4 rounded-lg ${!selectedUnassignId || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}>할당 해제하기</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ElderlyAssignment;