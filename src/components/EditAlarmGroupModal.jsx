import React, { useState, useEffect } from 'react';
import axios from '../lib/axiosInstance';
import TimeInputRow from './TimeInputRow';

const EditAlarmGroupModal = ({ group, elderlyId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    medicineName: '',
    medicineNote: '',
    repeatCycle: 'DAILY',
    times: [],
    dosage: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidTime = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

  useEffect(() => {
    if (group) {
      setForm({
        medicineName: group.medicineName,
        medicineNote: group.medicineNote ?? '',
        repeatCycle: group.repeatCycle,
        times: group.alarms.map((a) => a.time.substring(11, 16)),
        dosage: group.alarms[0]?.dosage || 1,
      });
    }
  }, [group]);

  const updateTime = (idx, value) => {
    const newTimes = [...form.times];
    newTimes[idx] = value;
    setForm({ ...form, times: newTimes });
  };

  const removeTime = (idx) => {
    const newTimes = form.times.filter((_, i) => i !== idx);
    setForm({ ...form, times: newTimes });
  };

  const addTime = () => setForm({ ...form, times: [...form.times, ''] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.times.length === 0 || form.times.some((t) => !isValidTime(t))) {
      alert('복용 시간을 확인해주세요 (예: 08:30)');
      return;
    }

    if (!form.dosage || form.dosage < 1) {
      alert('복용량은 1 이상이어야 합니다.');
      return;
    }

    const payload = {
      medicineName: form.medicineName,
      medicineNote: form.medicineNote ?? '',
      repeatCycle: form.repeatCycle,
      times: form.times,
      dosage: form.times.map(() => parseFloat(form.dosage)), 
    };

    setIsSubmitting(true);
    try {
      await axios.put(
        `/api/social-worker/alarm/${group.groupId}/alarm?elderlyId=${elderlyId}`,
        payload
      );
      alert('알람 수정 완료');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('알람 수정 실패:', error);
      alert('알람 수정 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  const repeatOptions = {
    ONCE: { label: '한번만', icon: '1️⃣' },
    DAILY: { label: '매일', icon: '📅' },
    EVERY_OTHER_DAY: { label: '격일', icon: '📆' },
    WEEKLY: { label: '매주', icon: '🗓️' },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💊 약 알람 수정</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            placeholder="약 이름"
            value={form.medicineName}
            onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            placeholder="주의사항"
            value={form.medicineNote}
            onChange={(e) => setForm({ ...form, medicineNote: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
          />

          <select
            value={form.repeatCycle}
            onChange={(e) => setForm({ ...form, repeatCycle: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {Object.entries(repeatOptions).map(([value, { label, icon }]) => (
              <option key={value} value={value}>
                {icon} {label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            required
            placeholder="복용량"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div>
            <label className="block mb-2">복용 시간 *</label>
            <div className="space-y-2">
              {form.times.map((time, idx) => (
                <TimeInputRow
                  key={idx}
                  index={idx}
                  value={time}
                  onChange={updateTime}
                  onDelete={form.times.length > 1 ? removeTime : null}
                  showDelete={form.times.length > 1}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addTime}
              className="mt-3 px-4 py-2 border text-blue-600 rounded-lg hover:bg-blue-50"
            >
              + 시간 추가
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isSubmitting ? '수정 중...' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlarmGroupModal;