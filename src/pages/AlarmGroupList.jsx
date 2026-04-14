import React, { useEffect, useState, useCallback } from 'react';
import axios from '../lib/axiosInstance';
import AlarmGroupCard from '../components/AlarmGroupCard';
import AlarmGroupForm from '../components/AlarmGroupForm';

const AlarmGroupList = () => {
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [assignedElderly, setAssignedElderly] = useState([]);
  const [selectedElderlyId, setSelectedElderlyId] = useState('');

  const fetchAssignedElders = useCallback(async () => {
    try {
      const res = await axios.get('/api/user/elderly/assigned');
      const list = res.data.results || res.data.result || [];
      setAssignedElderly(list);
      if (list.length > 0) {
        setSelectedElderlyId(list[0].id);
      }
    } catch (err) {
      console.error('할당된 노인 목록 불러오기 실패:', err);
      setAssignedElderly([]);
    }
  }, []);

  const fetchAlarmGroups = useCallback(async (elderlyId) => {
    if (!elderlyId) return;
    try {
      const res = await axios.get(`/api/social-worker/alarm/${elderlyId}/alarms`);
      setAlarmGroups(res.data.results || []);
    } catch (err) {
      console.error('알람 그룹 불러오기 실패:', err);
      setAlarmGroups([]);
    }
  }, []);

  useEffect(() => {
    fetchAssignedElders();
  }, [fetchAssignedElders]);

  useEffect(() => {
    
    if (selectedElderlyId) fetchAlarmGroups(selectedElderlyId);
  }, [selectedElderlyId, fetchAlarmGroups]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💊 약 복용 알람 관리
          </h1>
          <p className="text-gray-600">노인분들의 건강한 복약을 도와드립니다</p>
        </div>

        {/* 노인 선택 */}
        {assignedElderly.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              👤 담당 어르신 선택
            </label>
            <select
              value={selectedElderlyId}
              onChange={(e) => setSelectedElderlyId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {assignedElderly.map((elder) => (
                <option key={elder.id} value={elder.id}>
                  {elder.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 알람 등록 폼 */}
        <AlarmGroupForm
          assignedElderly={assignedElderly}
          selectedElderlyId={selectedElderlyId}
          onSuccess={() => fetchAlarmGroups(selectedElderlyId)}
        />

        {/* 알람 목록 */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 등록된 알람 목록
            <span className="text-sm font-normal text-gray-500">
              ({alarmGroups.length}개)
            </span>
          </h2>
          
          {alarmGroups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">💊</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                등록된 알람이 없습니다
              </h3>
              <p className="text-gray-500">
                위 폼을 사용해서 첫 번째 알람을 등록해보세요
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {alarmGroups.map((group) => (
                <AlarmGroupCard
                  key={group.groupId}
                  group={group}
                  onRefresh={() => fetchAlarmGroups(selectedElderlyId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmGroupList;