import React, { useState } from 'react';
import axios from '../lib/axiosInstance';
import TimeInputRow from './TimeInputRow';

const AlarmGroupForm = ({ selectedElderlyId, onSuccess }) => {
  const [form, setForm] = useState({
    medicineName: '',
    medicineNote: '',
    repeatCycle: 'DAILY',
    times: [''],
    dosage: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidTime = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

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

    if (!selectedElderlyId) {
      alert('노인을 선택해주세요.');
      return;
    }

    if (form.times.length === 0) {
      alert('최소 1개의 시간은 입력해야 합니다.');
      return;
    }

    if (form.times.some((t) => !isValidTime(t))) {
      alert('올바른 시간 형식만 입력해주세요 (예: 08:30)');
      return;
    }

    if (!form.dosage || form.dosage < 1) {
      alert('복용량은 1 이상이어야 합니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`/api/social-worker/alarm/${selectedElderlyId}/group`, {
        medicineName: form.medicineName,
        medicineNote: form.medicineNote,
        repeatCycle: form.repeatCycle,
        times: form.times,
        dosage: form.times.map(() => parseFloat(form.dosage)), 
      });

      alert('알람 등록 완료');
      setForm({
        medicineName: '',
        medicineNote: '',
        repeatCycle: 'DAILY',
        times: [''],
        dosage: 1,
      });
      onSuccess?.();
    } catch (error) {
      console.error('알람 등록 실패:', error);
      alert('알람 등록 실패');
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
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">💊</span>
        <h3 className="text-xl font-bold text-gray-800">새 알람 등록</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">약 이름 *</label>
          <input
            required
            placeholder="복용할 약의 이름을 입력하세요"
            value={form.medicineName}
            onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">주의사항</label>
          <textarea
            placeholder="복용시 주의사항이나 메모를 입력하세요"
            value={form.medicineNote}
            onChange={(e) => setForm({ ...form, medicineNote: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">복용 주기</label>
          <select
            value={form.repeatCycle}
            onChange={(e) => setForm({ ...form, repeatCycle: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            {Object.entries(repeatOptions).map(([value, { label, icon }]) => (
              <option key={value} value={value}>
                {icon} {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">복용량 (알 수) *</label>
          <input
            type="number"
            min="1"
            required
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">복용 시간 *</label>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? '등록 중...' : '알람 등록'}
        </button>
      </form>
    </div>
  );
};

export default AlarmGroupForm;
