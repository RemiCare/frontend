import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { forceRefreshFcmToken } from '../firebase/fcm-token';
import { signupStyles } from '../styles/SignupStyle';

const Signup = () => {
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(true); // 전화번호 인증 상태 (테스트를 위해 기본값 true로 설정)
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const [formData, setFormData] = useState({
    loginId: '', password: '', confirmPassword: '',
    name: '', rrn: '', rrnFirst: '', rrnLast: '',
    email: '', phoneNumber: '', address: '',
    birthDate: '', gender: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rrnFirst' || name === 'rrnLast') {
      const numericValue = value.replace(/\D/g, '');
      const limited = name === 'rrnFirst' ? numericValue.slice(0, 6) : numericValue.slice(0, 7);
      setFormData(prev => {
        const rrnFirst = name === 'rrnFirst' ? limited : prev.rrnFirst;
        const rrnLast = name === 'rrnLast' ? limited : prev.rrnLast;
        return {
          ...prev,
          [name]: limited,
          rrn: rrnFirst + rrnLast,
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const sendVerificationCode = async () => {
    if (!/^010\d{7,8}$/.test(formData.phoneNumber)) {
      alert('올바른 전화번호 형식을 입력해주세요. 예: 01012345678');
      return;
    }

    try {
      await axiosInstance.get(`/api/auth/sms?phone=${formData.phoneNumber}`);
      setIsCodeSent(true);
      setIsPhoneVerified(false);
      alert('인증번호가 전송되었습니다.');
    } catch (err) {
      console.error(err);
      alert('인증번호 전송 실패: ' + (err.response?.data?.status?.message || '서버 오류'));
    }
  };

  const verifyCode = async () => {
    try {
      await axiosInstance.post('/api/auth/sms/verify', {
        phoneNumber: formData.phoneNumber,
        verificationCode,
      });
      setIsPhoneVerified(true);
      alert('전화번호 인증 성공');
    } catch (err) {
      console.error(err);
      alert('인증 실패: ' + (err.response?.data?.status?.message || '코드를 다시 확인해주세요.'));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    //if (!isPhoneVerified) {
    // alert('전화번호 인증을 완료해주세요.');
    // return;
    //}

    if (formData.rrnFirst.length !== 6 || formData.rrnLast.length !== 7) {
      alert('주민등록번호를 정확히 입력해주세요.');
      return;
    }

    try {
      const fcmToken = await forceRefreshFcmToken();

      const payload = {
        loginId: formData.loginId,
        password: formData.password,
        name: formData.name,
        rrn: formData.rrn,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        birthDate: formData.birthDate.replaceAll('-', '/'),
        gender: formData.gender,
        fcmToken: fcmToken || 'test-fcm-token',
      };

      await axiosInstance.post('/api/auth/signup/social-worker', payload);
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('가입 실패:', error);
      alert(`회원가입 실패: ${error.response?.data?.status?.message || error.message || '서버 오류'}`);
    }
  };

  const getInputType = (fieldName) => {
    if (fieldName === 'password' || fieldName === 'confirmPassword') return 'password';
    if (fieldName === 'birthDate') return 'date';
    if (fieldName === 'email') return 'email';
    if (fieldName === 'phoneNumber') return 'tel';
    return 'text';
  };

  return (
    <div className={signupStyles.container}>
      <div className={signupStyles.wrapper}>
        <div className={signupStyles.header}>
          <h1 className={signupStyles.title}>사회복지사 포털</h1>
          <p className={signupStyles.subtitle}>회원가입 후 다양한 서비스를 이용하실 수 있습니다</p>
        </div>
        <div className={signupStyles.box}>
          <form onSubmit={submitForm} className={signupStyles.section}>
            <h2 className={signupStyles.formHeading}>사회복지사 정보 입력</h2>

            {[
              ['loginId', '아이디'],
              ['password', '비밀번호'],
              ['confirmPassword', '비밀번호 확인'],
              ['name', '이름'],
              ['email', '이메일'],
              ['phoneNumber', '전화번호'],
              ['address', '주소'],
              ['birthDate', '생년월일 (yyyy/MM/dd)'],
            ].map(([field, label]) => (
              <div key={field} className={signupStyles.field}>
                <label htmlFor={field} className={signupStyles.label}>{label}</label>
                <input
                  type={getInputType(field)}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={signupStyles.input}
                  required
                />
              </div>
            ))}

            <div className={signupStyles.phoneBox}>
              <label className={signupStyles.label}>인증번호</label>
              <div className={signupStyles.phoneRow}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className={signupStyles.phoneInput}
                  disabled={!isCodeSent}
                  placeholder="인증번호 입력"
                />
                <button type="button" onClick={verifyCode} className={signupStyles.verifyButton} disabled={!isCodeSent}>확인</button>
              </div>
              <button type="button" onClick={sendVerificationCode} className={signupStyles.sendButton}>인증번호 받기</button>
            </div>

            <div className={signupStyles.field}>
              <label htmlFor="rrn" className={signupStyles.label}>주민등록번호</label>
              <div className={signupStyles.rrnWrapper}>
                <input
                  type="text" id="rrnFirst" name="rrnFirst" value={formData.rrnFirst}
                  onChange={handleInputChange} placeholder="앞 6자리" maxLength={6}
                  className={signupStyles.rrnInput} required
                />
                <span className={signupStyles.rrnDash}>-</span>
                <input
                  type="password" id="rrnLast" name="rrnLast" value={formData.rrnLast}
                  onChange={handleInputChange} placeholder="뒤 7자리" maxLength={7}
                  className={signupStyles.rrnInput} required
                />
              </div>
            </div>

            <div className={signupStyles.genderWrapper}>
              <label className={signupStyles.label}>성별</label>
              <div className={signupStyles.genderOptions}>
                {['남', '여'].map((g) => (
                  <label key={g} className={signupStyles.genderLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleInputChange}
                      className={signupStyles.genderRadio}
                      required
                    />
                    <span className={signupStyles.genderText}>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className={signupStyles.submitButton}>가입 완료</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
