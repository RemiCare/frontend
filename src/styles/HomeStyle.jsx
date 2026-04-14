export const homeStyles = {
  // 메인 컨테이너
  mainContainer: "min-h-screen bg-gray-50",
  contentWrapper: "max-w-7xl mx-auto px-4 py-6",
  layoutGrid: "flex flex-col xl:flex-row gap-6",
  
  // 왼쪽 메인 콘텐츠
  leftContent: "w-full xl:w-2/3",
  rightContent: "w-full xl:w-1/3",
  
  // 배너 슬라이드
  bannerContainer: "relative rounded-lg overflow-hidden mb-6",
  bannerSlide: "h-[350px] md:h-[400px] flex items-center transition-all duration-500",
  bannerOverlay: "absolute inset-0 bg-black bg-opacity-30",
  bannerContent: "relative z-10 text-white p-8 max-w-3xl",
  bannerTitle: "text-2xl md:text-3xl font-bold mb-4",
  bannerText: "text-sm md:text-base leading-relaxed",
  
  // 슬라이드 컨트롤
  slideControls: "absolute bottom-4 left-4 flex space-x-2",
  slideButton: "bg-white bg-opacity-70 hover:bg-opacity-90 px-3 py-1 rounded transition-all",
  slideIndicators: "absolute bottom-4 right-4 flex space-x-2",
  indicatorButton: "w-3 h-3 rounded-full transition-all",
  indicatorActive: "bg-white",
  indicatorInactive: "bg-white bg-opacity-50",
  
  // 빠른 서비스
  quickServiceSection: "mb-6",
  sectionTitle: "text-lg font-semibold text-gray-800 mb-4",
  quickServiceGrid: "grid grid-cols-3 gap-4",
  serviceCard: "flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer group",
  serviceIcon: "w-12 h-12 bg-white rounded-full mb-3 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform",
  serviceIconText: "text-xl",
  serviceTitle: "text-sm font-medium text-gray-800",
  serviceSubtitle: "text-xs text-gray-600 mt-1",
  
  // 공지사항 섹션
  noticeGrid: "grid grid-cols-1 lg:grid-cols-2 gap-6",
  noticeCard: "bg-white p-6 rounded-lg shadow-sm",
  noticeHeader: "flex items-center justify-between mb-4",
  noticeTitle: "text-lg font-semibold text-gray-800",
  moreLink: "text-sm text-blue-600 cursor-pointer hover:underline",
  
  // 업무 공지사항
  workUpdatesList: "space-y-3",
  workUpdateItem: "border-b pb-3 last:border-b-0",
  workUpdateContent: "flex items-start justify-between",
  workUpdateDetails: "flex-1",
  workUpdateMeta: "flex items-center space-x-2 mb-2",
  workUpdateTag: "px-2 py-1 text-xs rounded font-medium",
  workUpdateDate: "text-xs text-gray-500",
  workUpdateTitle: "text-sm font-medium text-gray-800 mb-1 hover:text-blue-600 cursor-pointer",
  workUpdateSummary: "text-xs text-gray-600",
  
  // 시스템 안내
  systemNoticesList: "space-y-3",
  systemNoticeItem: "flex items-center justify-between py-2 border-b last:border-b-0",
  systemNoticeContent: "flex items-center space-x-2 flex-1",
  urgentBadge: "px-2 py-1 bg-red-500 text-white text-xs rounded font-medium",
  systemNoticeTitle: "text-sm text-gray-800 hover:text-blue-600 cursor-pointer truncate",
  systemNoticeDate: "text-xs text-gray-500 ml-2",
  
  // 케이스 현황
  caseSection: "bg-white p-6 rounded-lg shadow-sm mb-6",
  caseList: "space-y-3",
  caseItem: "border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer",
  caseItemContent: "flex items-start justify-between mb-2",
  caseItemDetails: "flex-1",
  caseItemMeta: "flex items-center space-x-2 mb-1",
  caseType: "px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded",
  caseStatus: "px-2 py-1 text-xs rounded font-medium",
  caseTitle: "text-sm font-medium text-gray-800 leading-tight",
  caseDate: "text-xs text-gray-500 mt-1",
  
  // 업무 도구
  toolsSection: "bg-white p-6 rounded-lg shadow-sm",
  toolsGrid: "grid grid-cols-2 gap-3",
  toolButton: "text-white p-3 rounded-lg hover:opacity-90 transition-all group",
  toolIcon: "text-lg mb-1 group-hover:scale-110 transition-transform",
  toolName: "text-xs font-medium",
  
  // 긴급 연락처
  emergencySection: "mt-4 p-3 bg-gray-50 rounded-lg",
  emergencyTitle: "text-sm font-medium text-gray-700 mb-1",
  emergencyList: "text-xs text-gray-600",
  
  // 우선순위 색상
  priorityColors: {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-700"
  },
  
  // 상태 색상
  statusColors: {
    completed: "bg-green-100 text-green-700",
    inProgress: "bg-blue-100 text-blue-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    urgent: "bg-red-100 text-red-700",
    approved: "bg-green-100 text-green-700"
  },
  
  // 서비스 카드 색상
  serviceColors: {
    chat: "bg-blue-50 border-blue-200",
    medicine: "bg-green-50 border-green-200",
    assign: "bg-purple-50 border-purple-200",
    welfare: "bg-orange-50 border-orange-200",
    search: "bg-indigo-50 border-indigo-200",
    certificate: "bg-teal-50 border-teal-200",
    calculator: "bg-pink-50 border-pink-200",
    voucher: "bg-yellow-50 border-yellow-200"
  },
  
  // 도구 색상
  toolColors: {
    schedule: "bg-blue-500",
    notes: "bg-green-500",
    emergency: "bg-red-500",
    files: "bg-purple-500",
    education: "bg-orange-500",
    statistics: "bg-teal-500"
  },
  
  // 배너 그라데이션
  bannerGradients: {
    purple: "bg-gradient-to-r from-purple-600 to-blue-600",
    green: "bg-gradient-to-r from-green-600 to-teal-600",
    orange: "bg-gradient-to-r from-orange-600 to-red-600"
  }
};