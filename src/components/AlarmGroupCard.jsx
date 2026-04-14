import React, { useState } from 'react';
import axios from '../lib/axiosInstance';
import EditAlarmGroupModal from './EditAlarmGroupModal';

const AlarmGroupCard = ({ group, onRefresh }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ elderlyId 추출 함수
  const getElderlyId = () => {
    return group.elderlyId || group.alarms?.[0]?.elderlyId;
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      const elderlyId = getElderlyId();
      await axios.delete(`/api/social-worker/alarm/group/${group.groupId}`, {
        params: { elderlyId }
      });
      onRefresh();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 실패');
    } finally {
      setIsProcessing(false);
      setShowDeleteConfirm(false);
    }
  };

  const markAllComplete = async () => {
    setIsProcessing(true);
    try {
      const elderlyId = getElderlyId();
      await axios.patch(`/api/social-worker/alarm/group/${group.groupId}/complete`, null, {
        params: { elderlyId }
      });
      onRefresh();
    } catch (error) {
      console.error('완료 처리 실패:', error);
      alert('완료 처리 실패');
    } finally {
      setIsProcessing(false);
    }
  };

  const markAlarmComplete = async (alarmId) => {
    try {
      const elderlyId = getElderlyId();
      await axios.patch(`/api/social-worker/alarm/alarm/${alarmId}/complete`, null, {
        params: { elderlyId },
      });
      onRefresh();
    } catch (error) {
      console.error("개별 알람 완료 처리 실패:", error);
      alert("복용 완료 처리에 실패했습니다.");
    }
  };

  const repeatLabels = {
    'ONCE': '한번만',
    'DAILY': '매일',
    'EVERY_OTHER_DAY': '격일',
    'WEEKLY': '매주'
  };

  const completedCount = group.alarms?.filter(alarm => alarm.completed).length || 0;
  const totalCount = group.alarms?.length || 0;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💊</span>
            <h3 className="text-xl font-bold text-gray-800">{group.medicineName}</h3>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">📝 주의사항:</span>
              <span>{group.medicineNote || '없음'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">🔄 복용주기:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {repeatLabels[group.repeatCycle] || group.repeatCycle}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">완료율</div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(completionRate)}%
          </div>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>진행상황</span>
          <span>{completedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* 알람 시간 목록 */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">⏰ 복용 시간</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {group.alarms?.map((alarm) => (
            <div
              key={alarm.alarmId}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                alarm.completed
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {alarm.completed ? '✅' : '⏰'}
                </span>
                <span className="font-medium">{alarm.time.substring(11, 16)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  alarm.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {alarm.completed ? '완료' : '대기'}
                </span>

                {!alarm.completed && (
                  <button
                    onClick={() => markAlarmComplete(alarm.alarmId)}
                    className="text-xs text-blue-600 border border-blue-300 rounded px-2 py-1 hover:bg-blue-50"
                  >
                    완료 처리
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={markAllComplete}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          ✅ 모두 완료
        </button>

        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          ✏️ 수정
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          🗑️ 삭제
        </button>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">알람 삭제</h3>
              <p className="text-gray-600">
                '{group.medicineName}' 알람을 정말로 삭제하시겠습니까?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEdit && (
        <EditAlarmGroupModal
          group={group}
          elderlyId={getElderlyId()}
          onClose={() => setShowEdit(false)}
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
};

export default AlarmGroupCard;