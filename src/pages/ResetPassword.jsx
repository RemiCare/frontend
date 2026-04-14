import React, { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordStyles } from '../styles/ResetPasswordStyle';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginId, phoneNumber } = location.state || {};

  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleResetPassword = async () => {
    if (!verificationCode.trim()) return setError('인증번호를 입력해주세요.');
    if (!newPassword.trim()) return setError('새 비밀번호를 입력해주세요.');
    if (newPassword !== confirmPassword) return setError('비밀번호가 일치하지 않습니다.');

    const payload = { loginId, newPassword, verificationCode };
    setDebugInfo(payload);
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.patch('/api/auth/reset-password', payload);
      if (response.data?.status?.code === 200) {
        setMessage('✅ 비밀번호가 성공적으로 재설정되었습니다.');
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage('');
        setError(`비밀번호 재설정에 실패했습니다: ${response.data?.status?.message || '알 수 없는 오류'}`);
      }
    } catch (err) {
      console.error('Error details:', err);
      setMessage('');
      setError(`❌ 서버 오류로 비밀번호 재설정에 실패했습니다: ${err.response?.data?.status?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loginId || !phoneNumber) {
    return <div className={resetPasswordStyles.invalidAccess}>인증되지 않은 접근입니다. 처음부터 다시 시도해주세요.</div>;
  }

  return (
    <div className={resetPasswordStyles.container}>
      <h2 className={resetPasswordStyles.title}>비밀번호 재설정</h2>
      <p className={resetPasswordStyles.subtitle}>
        <span className={resetPasswordStyles.highlight}>{loginId}</span> 님의 비밀번호를 변경합니다.
      </p>

      <div className={resetPasswordStyles.inputGroup}>
        <label className={resetPasswordStyles.label}>인증번호</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className={resetPasswordStyles.input}
          placeholder="휴대폰으로 받은 인증번호 입력"
        />
        <p className={resetPasswordStyles.helperText}>휴대폰으로 전송된 인증번호를 입력하세요.</p>
      </div>

      <div className={resetPasswordStyles.inputGroup}>
        <label className={resetPasswordStyles.label}>새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={resetPasswordStyles.input}
          placeholder="새 비밀번호 입력"
        />
      </div>

      <div className={resetPasswordStyles.inputGroup}>
        <label className={resetPasswordStyles.label}>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={resetPasswordStyles.input}
          placeholder="비밀번호 다시 입력"
        />
      </div>

      <button
        onClick={handleResetPassword}
        disabled={isSubmitting}
        className={resetPasswordStyles.button(isSubmitting)}
      >
        {isSubmitting ? '처리 중...' : '비밀번호 재설정'}
      </button>

      {message && <div className={resetPasswordStyles.successBox}>{message}</div>}
      {error && <div className={resetPasswordStyles.errorBox}>{error}</div>}

      {debugInfo && (
        <div className={resetPasswordStyles.debugBox}>
          <h4 className={resetPasswordStyles.debugTitle}>서버 전송 데이터 확인</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;