import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { navbarStyles } from '../styles/NavbarStyle';

const menuItems = {
  "복지서비스": [
    {
      category: "서비스 찾기",
      items: [
        { name: "서비스 목록", link: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52005M.do" }, 
        { name: "사회서비스 목록", link: "https://www.bokjiro.go.kr/ssis-tbu/twataa/sociServiceList/sociServiceListView.do" }, 
      ],
    },
    {
      category: "모의계산",
      items: [
        { name: "기초연금", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertBspnPage.do" }, 
        { name: "장애(아동)수당", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertDscaPage.do" }, 
        { name: "국민기초 생활보장", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertNblgPage.do" }, 
        { name: "장애인연금", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertDspnPage.do" }, 
        { name: "한부모 가족지원", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertOprnPage.do" }, 
        { name: "산모신생아 건강관리", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertPwnbPage.do" }, 
        { name: "아이돌봄 서비스", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertCcsvPage.do" }, 
        { name: "자산형성지원", link: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclAstfmSpbizPage.do" },
      ],
    },
    {
      category: "맞춤형급여안내(복지멤버십)",
      items: [
        { name: "제도 안내", link: "https://www.bokjiro.go.kr/ssis-tbu/twatza/wmAplyMng/selectWmGdnc.do" }, 
        { name: "이용 방법", link: "https://www.bokjiro.go.kr/ssis-tbu/twatza/wmAplyMng/selectWmJoinProcGdnc.do" },
        { name: "안내 대상 사업", link: "https://www.bokjiro.go.kr/ssis-tbu/twatza/wmAplyMng/selectWmJoinProcGdnc.do" }, 
      ],
    },
    {
      category: "전자바우처 서비스 안내",
      items: [
        { name: "국가바우처", link: "https://www.bokjiro.go.kr/ssis-tbu/twataia/vouReld/vouNtnVouView.do" }, 
        { name: "사업안내", link: "https://www.bokjiro.go.kr/ssis-tbu/twataca/BizGdnc/moveTWAT52060M.do" }, 
        { name: "사업현황", link: "https://www.bokjiro.go.kr/ssis-tbu/twataca/BizGdnc/moveTWAT52096M.do" }, 
        { name: "국민행복카드", link: "https://www.bokjiro.go.kr/ssis-tbu/twataca/BizGdnc/moveTWAT54000M.do" }, 
      ],
    },
  ],
  "서비스신청": [
    {
      category: "복지서비스 신청",
      items: [
        { name: "복지급여 신청", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160428128_5000000081_11d9d002-8065-4d0e-9406-8742ce18a353&acrValues=2#/" }, 
        { name: "복지서비스 신청서식", link: "https://www.bokjiro.go.kr/ssis-tbu/twatza/apfmEsotSrv/apfmEsotSrvLst.do" }, 
      ],
    },
    {
      category: "민원서비스 신청",
      items: [
        { name: "민원서비스 신청", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160448852_5000000081_b87f5b97-4dec-4c25-b7a8-61cfe0d3ff0c&acrValues=2#/" }, 
        { name: "가족정보 제공동의", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160454689_5000000081_96193296-65e6-4c3c-b5e8-9fe7d51571fd&acrValues=2#/" }, 
        { name: "복지급여계좌변경 동의", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160459514_5000000081_537f3d74-4105-47c3-923f-3c3dc65f259e&acrValues=2#/" }, 
        { name: "직권신청요청 동의", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160505118_5000000081_23fbec4b-3a14-4230-ad40-6d3ccdc4160b&acrValues=2#/" }, 
        { name: "증빙서류 제출", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160509980_5000000081_7b5fb5df-7962-4585-bf2a-83e291bfc98f&acrValues=2#/" },
      ],
    },
    {
      category: "증명서발급·진위확인",
      items: [
        { name: "증명서발급", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160520548_5000000081_233d850a-c700-4467-96ee-98cd82619ed8&acrValues=2#/" }, 
        { name: "증명서 진위 확인", link: "https://www.bokjiro.go.kr/ssis-tbu/twatza/certfIssuAplyMng/selectCertfTruflsIdnty.do" },
        { name: "장애인등록증 진위 확인", link: "https://www.bokjiro.go.kr/ssis-tbu/loginView.do?tx=20250603160531737_5000000081_282b3054-8109-483d-a26d-1462d71537dd&acrValues=2#/" }, 
      ],
    },
    {
      category: "사회서비스 신청",
      items: [
        { name: "시설 이용 신청", link: "https://www.bokjiro.go.kr/ssis-tbu/twataa/sociServiceList/sociServiceListView.do?aplyYn=Y" }, 
      ],
    },
  ],
};

const navMenus = [
  { name: "복지서비스" },
  { name: "서비스신청" },
];

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, loading } = useUser();
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    const checkNotifications = () => {
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const lastRead = localStorage.getItem("notifications_last_read");
      if (notifications.length > 0) {
        const latestTime = new Date(notifications[0].time).getTime();
        const lastReadTime = lastRead ? new Date(lastRead).getTime() : 0;
        setHasNewNotification(latestTime > lastReadTime);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('로그아웃 되었습니다.');
  };

  const handleMenuEnter = (menuName, event) => {
    setHovered(menuName);
    
    // 드롭다운 위치 계산
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownWidth = 800;
    
    let leftPosition = rect.left;
    
    if (leftPosition + dropdownWidth > viewportWidth - 20) {
      leftPosition = viewportWidth - dropdownWidth - 20;
    }
    
    if (leftPosition < 20) {
      leftPosition = 20;
    }
    
    setDropdownPosition({
      left: leftPosition,
      top: rect.bottom
    });
  };

  const handleMenuLeave = () => {
    setHovered(null);
  };

  const handleItemClick = (item) => {
    setHovered(null);
    
    if (item.link) {
      if (item.link.startsWith('http')) {
        window.open(item.link, '_blank');
      } else {
        navigate(item.link);
      }
    } else {
      console.log(`"${item.name}" 링크가 아직 설정되지 않았습니다.`);
      alert(`"${item.name}" 링크가 아직 설정되지 않았습니다.`);
    }
  };

  return (
    <>
      <nav className={navbarStyles.navWrapper}>
        <div className={navbarStyles.container}>
          <div className={navbarStyles.inner}>
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="/images/logo.png" alt="LifeLine 로고" className={navbarStyles.logo} />
              </Link>
            </div>

            <div className={navbarStyles.menuWrapper}>
              <div className="flex space-x-4">
                {navMenus.map((menu) => (
                  <div
                    key={menu.name}
                    className="relative"
                    onMouseEnter={(e) => handleMenuEnter(menu.name, e)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button
                      className={`${navbarStyles.menuItemBase} ${
                        hovered === menu.name ? navbarStyles.menuItemActive : navbarStyles.menuItemInactive
                      } flex items-center`}
                    >
                      {menu.name}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={navbarStyles.authWrapper}>
              {loading ? (
                <div className={navbarStyles.loadingText}>로딩 중...</div>
              ) : isLoggedIn ? (
                <>
                  <Link to="/notifications" className="relative mr-3 group">
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {hasNewNotification && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                  <Link to="/mypage-auth" className="flex items-center space-x-1 group">
                    <span className={navbarStyles.linkBase}>
                      {user?.name ? `${user.name}님` : '마이페이지'}
                    </span>
                    <svg className={navbarStyles.iconBase} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                  <button onClick={handleLogout} className={navbarStyles.linkBase}>
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center space-x-1 group">
                    <span className={navbarStyles.linkBase}>로그인</span>
                    <svg className={navbarStyles.iconBase} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                  <Link to="/signup" className={navbarStyles.linkBase}>
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 드롭다운 메뉴 - 확장된 hover 영역 */}
      {hovered && (
        <div
          className="fixed z-[60]"
          style={{
            left: `${dropdownPosition.left - 50}px`, // 좌우 여유 공간 추가
            top: `${dropdownPosition.top - 20}px`,   // 상단 여유 공간 추가
            width: `${Math.min(900, window.innerWidth - 100)}px`, // 너비 확장
            height: 'auto',
            paddingTop: '20px', // 내부 패딩으로 실제 컨텐츠 위치 조정
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
          onMouseEnter={() => setHovered(hovered)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems[hovered].map((subMenu, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={navbarStyles.dropdownTitle}>{subMenu.category}</h4>
                  <ul className="space-y-2">
                    {subMenu.items.map((item, idx) => (
                      <li 
                        key={idx} 
                        className={navbarStyles.dropdownItem}
                        onClick={() => handleItemClick(item)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;