// src/styles/ChatRoomStyle.jsx

export const chatRoomStyles = {
  // 기본 래퍼 - 카카오톡 스타일의 연한 보라색 배경
  wrapper: "flex flex-col h-screen max-w-lg mx-auto bg-purple-50 shadow-lg relative",
  
  // 헤더 - 카카오톡 스타일 헤더 (높이 줄임)
  header: "bg-purple-700 text-white px-3 py-2 flex justify-between items-center sticky top-0 z-10 shadow-sm",
  headerButton: "text-white hover:bg-purple-600 p-1 rounded-full transition-colors",
  headerTitle: "text-base font-bold flex items-center truncate max-w-[200px]",
  
  // 상태 표시 개선 (높이 줄임)
  statusConnecting: "bg-yellow-50 text-yellow-700 py-1 px-3 text-center text-xs border-b border-yellow-100",
  statusError: "bg-red-50 text-red-700 py-1 px-3 text-center text-xs border-b border-red-100",
  
  // 메시지 컨테이너 - 입력란 공간 확보하고 초기 스크롤 위치를 맨 위로 설정
  messageContainer: "flex-1 py-2 px-2 pb-20 overflow-y-auto bg-purple-50 scroll-smooth",
  loadingWrapper: "flex flex-col items-center justify-center h-full py-6",
  spinner: "animate-spin w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full mx-auto mb-2",
  loadingText: "text-gray-500 text-xs",
  errorBox: "mx-3 my-1 bg-red-50 text-red-700 p-2 rounded-lg text-center border border-red-100 text-xs",
  emptyBox: "flex flex-col items-center justify-center h-48 my-4",
  emptyText: "text-gray-500 text-xs mt-2",
  
  // 메시지 스타일 - 카카오톡 스타일 (내 메시지는 노란색, 상대방 메시지는 흰색)
  messageList: "space-y-1.5",
  messageLine: (isMe) => `flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`,
  messageBox: (isMe) => 
    `max-w-[70%] p-2 rounded-md ${
      isMe 
        ? 'bg-yellow-300 text-gray-800' 
        : 'bg-white text-gray-800 border border-gray-100'
    }`,
  messageSender: "text-xs font-medium text-gray-500 mb-0.5 ml-0.5",
  messageText: "break-words text-sm",
  messageTime: "text-xs text-gray-400 mt-0.5 text-right",
  
  // 날짜 구분선 - 카카오톡 스타일 (높이 줄임)
  dateGroup: "flex items-center justify-center my-2",
  dateText: "text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full",
  
  // 입력 영역 - 절대 위치로 고정하여 화면 하단에 항상 표시
  inputWrapper: "absolute bottom-0 left-0 right-0 px-2 py-2 bg-gray-100 border-t border-gray-200 z-20",
  inputRow: "flex items-center gap-1.5",
  inputField: "flex-1 border border-gray-300 bg-white rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500",
  sendButton: (isConnected) => 
    `${isConnected ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400'} 
     text-gray-700 p-2 rounded-full flex items-center justify-center transition-all duration-200
     ${isConnected ? 'hover:scale-105' : 'cursor-not-allowed'}`,
  sendIcon: "w-4 h-4",
  
  // 읽음 표시
  readStatus: "text-xs text-gray-400 mt-0.5 text-right",
};