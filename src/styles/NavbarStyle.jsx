export const navbarStyles = {
  navWrapper: "bg-white border-b border-gray-200 sticky top-0 z-50",
  container: "max-w-7xl mx-auto px-4",
  inner: "flex items-center h-16",
  logo: "h-10 w-auto",
  
  menuWrapper: "ml-6 lg:ml-10 flex-1",
  menuItemBase: "px-2 lg:px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-indigo-600 border-b-2 transition",
  menuItemActive: "border-indigo-600 text-indigo-600",
  menuItemInactive: "border-transparent",
  
  // 새로운 드롭다운 스타일 (fixed 포지셔닝용)
  dropdownWrapper: "bg-white shadow-xl rounded-lg border border-gray-200 p-6 min-w-[800px] max-w-[1200px]",
  dropdownTitle: "text-sm font-bold mb-3 text-indigo-700 border-b border-gray-100 pb-2",
  dropdownItem: "cursor-pointer hover:text-indigo-500 hover:bg-gray-50 text-gray-600 text-sm transition py-2 px-2 rounded",
  invisibleSpacer: "absolute h-2 w-full top-0 -translate-y-full",
  
  authWrapper: "flex items-center space-x-2 lg:space-x-6",
  linkBase: "text-sm lg:text-base text-gray-700 hover:text-indigo-600 whitespace-nowrap",
  iconBase: "w-4 h-4 lg:w-5 lg:h-5 text-gray-500 group-hover:text-indigo-500",
  loadingText: "text-gray-400 text-xs lg:text-sm",
};