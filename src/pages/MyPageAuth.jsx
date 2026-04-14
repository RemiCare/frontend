import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { myPageAuthStyles, getInputClassName, getButtonClassName } from '../styles/MyPageAuthStyle';

const MyPageAuth = () => {
  const [form, setForm] = useState({ loginId: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = {};
    if (!form.loginId.trim()) {
      errors.loginId = '아이디를 입력해주세요';
    }
    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = '전화번호를 입력해주세요';
    } else if (!/^\d{10,11}$/.test(form.phoneNumber)) {
      errors.phoneNumber = '올바른 전화번호 형식을 입력해주세요 (예: 01012345678)';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      if (!user) {
        setError('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }

      const isMatch = 
        form.loginId === user.loginId && form.phoneNumber === user.phoneNumber;

      if (isMatch) {
        navigate('/mypage');
      } else {
        setError('아이디 또는 전화번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('인증 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    // 숫자만 입력 허용
    const numbers = e.target.value.replace(/[^\d]/g, '');
    setForm({ ...form, phoneNumber: numbers });
    
    if (fieldErrors.phoneNumber) {
      setFieldErrors(prev => ({ ...prev, phoneNumber: '' }));
    }
    if (error) setError('');
  };

  return (
    <div className={myPageAuthStyles.container}>
      <div className={myPageAuthStyles.wrapper}>
        {/* 헤더 섹션 */}
        <div className={myPageAuthStyles.header.container}>
          <div className={myPageAuthStyles.header.iconWrapper}>
            <svg className={myPageAuthStyles.header.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={myPageAuthStyles.icons.shield} />
            </svg>
          </div>
          <h1 className={myPageAuthStyles.header.title}>본인 인증</h1>
          <p className={myPageAuthStyles.header.subtitle}>마이페이지 접근을 위해 본인 확인이 필요합니다</p>
        </div>

        {/* 메인 카드 */}
        <div className={myPageAuthStyles.card.container}>
          <div className={myPageAuthStyles.card.content}>
            <form onSubmit={handleSubmit} className={myPageAuthStyles.form.container}>
              {/* 아이디 입력 */}
              <div className={myPageAuthStyles.form.fieldContainer}>
                <label htmlFor="loginId" className={myPageAuthStyles.form.label}>
                  아이디
                </label>
                <div className={myPageAuthStyles.form.inputWrapper}>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    value={form.loginId}
                    onChange={handleChange}
                    className={getInputClassName(fieldErrors.loginId, isLoading)}
                    placeholder="아이디를 입력하세요"
                    required
                    disabled={isLoading}
                  />
                  <div className={myPageAuthStyles.inputIcon.wrapper}>
                    <svg className={myPageAuthStyles.inputIcon.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={myPageAuthStyles.icons.user} />
                    </svg>
                  </div>
                </div>
                {fieldErrors.loginId && (
                  <p className={myPageAuthStyles.error.field}>
                    <svg className={myPageAuthStyles.error.fieldIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={myPageAuthStyles.icons.exclamation} clipRule="evenodd" />
                    </svg>
                    {fieldErrors.loginId}
                  </p>
                )}
              </div>

              {/* 전화번호 입력 */}
              <div className={myPageAuthStyles.form.fieldContainer}>
                <label htmlFor="phoneNumber" className={myPageAuthStyles.form.label}>
                  전화번호
                </label>
                <div className={myPageAuthStyles.form.inputWrapper}>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange}
                    className={getInputClassName(fieldErrors.phoneNumber, isLoading)}
                    placeholder="01012345678"
                    maxLength={11}
                    required
                    disabled={isLoading}
                  />
                  <div className={myPageAuthStyles.inputIcon.wrapper}>
                    <svg className={myPageAuthStyles.inputIcon.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={myPageAuthStyles.icons.phone} />
                    </svg>
                  </div>
                </div>
                {fieldErrors.phoneNumber && (
                  <p className={myPageAuthStyles.error.field}>
                    <svg className={myPageAuthStyles.error.fieldIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={myPageAuthStyles.icons.exclamation} clipRule="evenodd" />
                    </svg>
                    {fieldErrors.phoneNumber}
                  </p>
                )}
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className={myPageAuthStyles.error.general}>
                  <div className={myPageAuthStyles.error.generalContent}>
                    <svg className={myPageAuthStyles.error.generalIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={myPageAuthStyles.icons.exclamation} clipRule="evenodd" />
                    </svg>
                    <p className={myPageAuthStyles.error.generalText}>{error}</p>
                  </div>
                </div>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isLoading}
                className={getButtonClassName(isLoading)}
              >
                {isLoading ? (
                  <div className={myPageAuthStyles.button.content}>
                    <svg className={myPageAuthStyles.button.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d={myPageAuthStyles.icons.spinnerCircle}></path>
                    </svg>
                    인증 중...
                  </div>
                ) : (
                  <div className={myPageAuthStyles.button.content}>
                    <svg className={myPageAuthStyles.button.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={myPageAuthStyles.icons.check} />
                    </svg>
                    인증하기
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* 하단 도움말 */}
          <div className={myPageAuthStyles.help.container}>
            <div className={myPageAuthStyles.help.content}>
              <svg className={myPageAuthStyles.help.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={myPageAuthStyles.icons.info} />
              </svg>
              <div className={myPageAuthStyles.help.textContainer}>
                <p className={myPageAuthStyles.help.title}>본인 인증 안내</p>
                <p className={myPageAuthStyles.help.description}>계정에 등록된 아이디와 전화번호를 정확히 입력해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageAuth;