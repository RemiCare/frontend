import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeStyles } from '../styles/HomeStyle';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const bannerSlides = [
    {
      bg: "bg-cover bg-center",
      backgroundImage: "/images/slide1.jpg", // 이미지 파일 추가 필요
      text: "사회복지사 여러분의 전문적인 업무를 지원하고, 효율적인 케이스 관리를 통해 더 나은 복지 서비스를 제공할 수 있도록 돕겠습니다.",
      title: "사회복지사를 위한 통합 업무 플랫폼"
    },
    {
      bg: "bg-cover bg-center",
      backgroundImage: "/images/slide2.jpg", // 이미지 파일 추가 필요
      text: "실시간 채팅 상담, 약물 관리, 케이스 추적 등 복지 현장에서 필요한 모든 도구를 한곳에서 관리하세요.",
      title: "올인원 복지 업무 솔루션"
    },
    {
      bg: "bg-cover bg-center",
      backgroundImage: "/images/slide3.jpg", // 이미지 파일 추가 필요
      text: "데이터 기반의 정확한 업무 처리와 체계적인 클라이언트 관리로 업무 효율성을 극대화하세요.",
      title: "스마트한 복지 업무 관리"
    }
  ];

  const quickServices = [
    {
      icon: "💬",
      title: "채팅상담",
      subtitle: "실시간 상담",
      color: homeStyles.serviceColors.chat,
      link: "/chat"
    },
    {
      icon: "💊",
      title: "약 알람 관리",
      subtitle: "복용 관리",
      color: homeStyles.serviceColors.medicine,
      link: "/alarm-groups"
    },
    {
      icon: "👥",
      title: "노인 할당",
      subtitle: "케이스 배정",
      color: homeStyles.serviceColors.assign,
      link: "/assign-elderly"
    },
    {
      icon: "📋",
      title: "복지급여 신청",
      subtitle: "신청 지원",
      color: homeStyles.serviceColors.welfare,
      link: "https://www.bokjiro.go.kr",
      external: true
    },
    {
      icon: "🔍",
      title: "서비스 찾기",
      subtitle: "복지서비스",
      color: homeStyles.serviceColors.search,
      link: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do",
      external: true
    },
    {
      icon: "📄",
      title: "증명서 발급",
      subtitle: "서류 관리",
      color: homeStyles.serviceColors.certificate,
      link: "https://www.gov.kr",
      external: true
    }
  ];

  const workUpdates = [
    {
      title: "2024년 기초생활보장 급여기준 변경사항",
      date: "2024.03.15",
      summary: "생계급여 4인 가구 기준 162만원으로 인상",
      tag: "급여기준",
      priority: "high"
    },
    {
      title: "장애인 활동지원 서비스 신규 지침",
      date: "2024.03.12",
      summary: "중증장애인 대상 월 최대 480시간 지원",
      tag: "장애인복지",
      priority: "medium"
    },
    {
      title: "노인장기요양보험 등급 판정 기준 개정",
      date: "2024.03.10",
      summary: "인지지원등급 신설, 등급별 서비스 내용 변경",
      tag: "노인복지",
      priority: "high"
    },
    {
      title: "아동수당 지급 대상 확대 안내",
      date: "2024.03.08",
      summary: "소득·재산 수준과 관계없이 월 10만원 지급",
      tag: "아동복지",
      priority: "low"
    }
  ];

  const systemNotices = [
    {
      title: "시스템 정기 점검 안내 (3/20 02:00-04:00)",
      date: "2024.03.18",
      isUrgent: true
    },
    {
      title: "채팅상담 시스템 업데이트 완료",
      date: "2024.03.16",
      isUrgent: false
    },
    {
      title: "복지급여 신청 서식 일부 변경",
      date: "2024.03.14",
      isUrgent: false
    },
    {
      title: "약 알람 관리 기능 개선 사항",
      date: "2024.03.12",
      isUrgent: false
    }
  ];

  const recentCases = [
    {
      caseType: "긴급지원",
      title: "독거노인 응급상황 대응",
      date: "2024.03.15",
      status: "처리완료",
      statusColor: homeStyles.statusColors.completed
    },
    {
      caseType: "기초생활",
      title: "한부모가정 생계급여 신청",
      date: "2024.03.14",
      status: "진행중",
      statusColor: homeStyles.statusColors.inProgress
    },
    {
      caseType: "장애인복지",
      title: "활동지원서비스 재신청",
      date: "2024.03.13",
      status: "검토중",
      statusColor: homeStyles.statusColors.reviewing
    },
    {
      caseType: "아동복지",
      title: "아동학대 신고 접수",
      date: "2024.03.12",
      status: "긴급처리",
      statusColor: homeStyles.statusColors.urgent
    },
    {
      caseType: "노인복지",
      title: "장기요양 등급 재신청",
      date: "2024.03.11",
      status: "승인완료",
      statusColor: homeStyles.statusColors.approved
    }
  ];

  const workTools = [
    {
      name: "업무 일정",
      icon: "📅",
      color: homeStyles.toolColors.schedule
    },
    {
      name: "케이스 노트",
      icon: "📝",
      color: homeStyles.toolColors.notes
    },
    {
      name: "긴급 연락망",
      icon: "📞",
      color: homeStyles.toolColors.emergency
    },
    {
      name: "자료실",
      icon: "📁",
      color: homeStyles.toolColors.files
    },
    {
      name: "교육자료",
      icon: "🎓",
      color: homeStyles.toolColors.education
    },
    {
      name: "통계",
      icon: "📊",
      color: homeStyles.toolColors.statistics
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getPriorityColor = (priority) => {
    return homeStyles.priorityColors[priority] || homeStyles.priorityColors.default;
  };

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  return (
    <div className={homeStyles.mainContainer}>
      <div className={homeStyles.contentWrapper}>
        <div className={homeStyles.layoutGrid}>
          {/* 왼쪽 메인 콘텐츠 */}
          <div className={homeStyles.leftContent}>
            {/* 배너 슬라이드 */}
            <div className={homeStyles.bannerContainer}>
              <div 
                className={`${bannerSlides[currentSlide].bg} ${homeStyles.bannerSlide}`}
                style={{
                  backgroundImage: `url('${bannerSlides[currentSlide].backgroundImage}')`
                }}
              >
                <div className={homeStyles.bannerOverlay}></div>
                <div className={homeStyles.bannerContent}>
                  <h2 className={homeStyles.bannerTitle}>
                    {bannerSlides[currentSlide].title}
                  </h2>
                  <p className={homeStyles.bannerText}>
                    {bannerSlides[currentSlide].text}
                  </p>
                </div>
              </div>

              {/* 슬라이드 컨트롤 */}
              <div className={homeStyles.slideControls}>
                <button onClick={prevSlide} className={homeStyles.slideButton}>
                  &#8249;
                </button>
                <button onClick={nextSlide} className={homeStyles.slideButton}>
                  &#8250;
                </button>
              </div>

              {/* 슬라이드 인디케이터 */}
              <div className={homeStyles.slideIndicators}>
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`${homeStyles.indicatorButton} ${
                      index === currentSlide ? homeStyles.indicatorActive : homeStyles.indicatorInactive
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 빠른 서비스 메뉴 */}
            <div className={homeStyles.quickServiceSection}>
              <h3 className={homeStyles.sectionTitle}>빠른 서비스</h3>
              <div className={homeStyles.quickServiceGrid}>
                {quickServices.map((service, idx) => (
                  <div 
                    key={idx} 
                    className={`${homeStyles.serviceCard} ${service.color}`}
                    onClick={() => {
                      if (service.external) {
                        window.open(service.link, '_blank');
                      } else {
                        navigate(service.link);
                      }
                    }}
                  >
                    <div className={homeStyles.serviceIcon}>
                      <span className={homeStyles.serviceIconText}>{service.icon}</span>
                    </div>
                    <div className="text-center">
                      <div className={homeStyles.serviceTitle}>{service.title}</div>
                      <div className={homeStyles.serviceSubtitle}>{service.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 업무 공지사항과 시스템 안내 */}
            <div className={homeStyles.noticeGrid}>
              <div className={homeStyles.noticeCard}>
                <div className={homeStyles.noticeHeader}>
                  <h3 className={homeStyles.noticeTitle}>📋 업무 공지사항</h3>
                  <span className={homeStyles.moreLink}>더보기</span>
                </div>
                <div className={homeStyles.workUpdatesList}>
                  {workUpdates.map((update, index) => (
                    <div key={index} className={homeStyles.workUpdateItem}>
                      <div className={homeStyles.workUpdateContent}>
                        <div className={homeStyles.workUpdateDetails}>
                          <div className={homeStyles.workUpdateMeta}>
                            <span className={`${homeStyles.workUpdateTag} ${getPriorityColor(update.priority)}`}>
                              {update.tag}
                            </span>
                            <span className={homeStyles.workUpdateDate}>{update.date}</span>
                          </div>
                          <h4 className={homeStyles.workUpdateTitle}>
                            {update.title}
                          </h4>
                          <p className={homeStyles.workUpdateSummary}>{update.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={homeStyles.noticeCard}>
                <div className={homeStyles.noticeHeader}>
                  <h3 className={homeStyles.noticeTitle}>🔔 시스템 안내</h3>
                  <span className={homeStyles.moreLink}>더보기</span>
                </div>
                <div className={homeStyles.systemNoticesList}>
                  {systemNotices.map((notice, index) => (
                    <div key={index} className={homeStyles.systemNoticeItem}>
                      <div className={homeStyles.systemNoticeContent}>
                        {notice.isUrgent && (
                          <span className={homeStyles.urgentBadge}>긴급</span>
                        )}
                        <span className={homeStyles.systemNoticeTitle}>
                          {notice.title}
                        </span>
                      </div>
                      <span className={homeStyles.systemNoticeDate}>{notice.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className={homeStyles.rightContent}>
            {/* 최근 케이스 현황 */}
            <div className={homeStyles.caseSection}>
              <div className={homeStyles.noticeHeader}>
                <h3 className={homeStyles.noticeTitle}>📊 최근 케이스 현황</h3>
                <span className={homeStyles.moreLink}>전체보기</span>
              </div>
              
              <div className={homeStyles.caseList}>
                {recentCases.map((caseItem, index) => (
                  <div key={index} className={homeStyles.caseItem}>
                    <div className={homeStyles.caseItemContent}>
                      <div className={homeStyles.caseItemDetails}>
                        <div className={homeStyles.caseItemMeta}>
                          <span className={homeStyles.caseType}>
                            {caseItem.caseType}
                          </span>
                          <span className={`${homeStyles.caseStatus} ${caseItem.statusColor}`}>
                            {caseItem.status}
                          </span>
                        </div>
                        <h4 className={homeStyles.caseTitle}>
                          {caseItem.title}
                        </h4>
                        <div className={homeStyles.caseDate}>{caseItem.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 업무 도구 */}
            <div className={homeStyles.toolsSection}>
              <h3 className={homeStyles.sectionTitle}>🛠️ 업무 도구</h3>
              <div className={homeStyles.toolsGrid}>
                {workTools.map((tool, index) => (
                  <button key={index} className={`${homeStyles.toolButton} ${tool.color}`}>
                    <div className={homeStyles.toolIcon}>{tool.icon}</div>
                    <div className={homeStyles.toolName}>{tool.name}</div>
                  </button>
                ))}
              </div>
              
              <div className={homeStyles.emergencySection}>
                <div className={homeStyles.emergencyTitle}>📞 긴급 연락처</div>
                <div className={homeStyles.emergencyList}>
                  • 응급상황: 119<br/>
                  • 아동학대: 112<br/>
                  • 생명의전화: 1393
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;