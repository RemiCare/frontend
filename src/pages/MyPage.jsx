import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { myPageStyles } from '../styles/MyPageStyle';

const MyPage = () => {
  const { user, userRole, loading, updateUserInfo } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phoneNumber: '', address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleEditClick = () => {
    setFormData({
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = '이름을 입력해주세요';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = '전화번호를 입력해주세요';
    if (!formData.address.trim()) errors.address = '주소를 입력해주세요';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setUpdateLoading(true);
    try {
      const success = await updateUserInfo(formData);
      if (success) {
        setIsEditing(false);
        alert('회원 정보가 성공적으로 업데이트되었습니다.');
      } else {
        alert('회원 정보 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 정보 업데이트 중 오류:', error);
      alert('회원 정보 업데이트 중 오류가 발생했습니다.');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return (
    <div className={myPageStyles.loadingContainer}>
      <div className="text-center">
        <div className={myPageStyles.spinner}></div>
        <p className={myPageStyles.loadingText}>로딩 중...</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className={myPageStyles.loadingContainer}>
      <div className={myPageStyles.authRequiredBox}>
        <h2 className={myPageStyles.authRequiredTitle}>로그인이 필요합니다</h2>
        <p className={myPageStyles.authRequiredDesc}>마이페이지에 접근하기 위해서는 로그인이 필요합니다.</p>
        <div className="flex justify-center">
          <button onClick={() => navigate('/login')} className={myPageStyles.authRequiredButton}>
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={myPageStyles.wrapper}>
      <div className={myPageStyles.inner}>
        <div className={myPageStyles.box}>
          <div className={myPageStyles.content}>
            <div className={myPageStyles.titleRow}>
              <h1 className={myPageStyles.pageTitle}>마이페이지</h1>
              {!isEditing && (
                <button onClick={handleEditClick} className={myPageStyles.editButton}>정보 수정</button>
              )}
            </div>

            {userRole && <div className={myPageStyles.roleBox}><p className={myPageStyles.roleText}>{userRole}</p></div>}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className={myPageStyles.formGrid}>
                  {['name', 'phoneNumber', 'address'].map((field) => (
                    <div key={field} className={field === 'address' ? 'md:col-span-2' : ''}>
                      <label className={myPageStyles.label}>{field === 'name' ? '이름' : field === 'phoneNumber' ? '전화번호' : '주소'}</label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`${myPageStyles.input} ${formErrors[field] ? myPageStyles.inputInvalid : myPageStyles.inputValid}`}
                      />
                      {formErrors[field] && <p className={myPageStyles.errorText}>{formErrors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div className={myPageStyles.buttonGroup}>
                  <button type="button" onClick={handleCancel} className={myPageStyles.cancelButton}>취소</button>
                  <button type="submit" disabled={updateLoading} className={myPageStyles.submitButton(updateLoading)}>
                    {updateLoading ? '저장 중...' : '저장'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className={myPageStyles.formGrid}>
                  {[{ label: '이름', value: user.name }, { label: '아이디', value: user.loginId }, { label: '이메일', value: user.email }, { label: '전화번호', value: user.phoneNumber }, { label: '주소', value: user.address, span: true }, { label: '생년월일', value: user.birthDate }, { label: '성별', value: user.gender }].map(({ label, value, span }) => (
                    <div key={label} className={span ? 'md:col-span-2' : ''}>
                      <p className={myPageStyles.viewLabel}>{label}</p>
                      <p className={myPageStyles.viewValue}>{value || '-'}</p>
                    </div>
                  ))}
                </div>
                <div className={myPageStyles.sectionGap}>
                  <button onClick={() => navigate('/change-password')} className={myPageStyles.pwChangeButton}>비밀번호 변경</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
