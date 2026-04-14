export const myPageStyles = {
  loadingContainer: "min-h-screen bg-slate-50 flex items-center justify-center",
  spinner: "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto",
  loadingText: "mt-4 text-gray-600",
  
  authRequiredBox: "bg-white p-8 rounded-lg shadow-md max-w-md w-full",
  authRequiredTitle: "text-2xl font-bold text-center text-indigo-700 mb-4",
  authRequiredDesc: "text-gray-600 mb-6 text-center",
  authRequiredButton: "bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors",
  
  wrapper: "min-h-screen bg-slate-50 py-10",
  inner: "max-w-4xl mx-auto px-4",
  box: "bg-white rounded-lg shadow-lg overflow-hidden",
  content: "p-6 sm:p-8",
  titleRow: "flex justify-between items-center mb-6",
  pageTitle: "text-2xl font-bold text-indigo-700",
  editButton: "bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors",
  
  roleBox: "mb-6 p-4 bg-indigo-50 rounded-lg",
  roleText: "text-indigo-700 font-medium",
  
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  label: "block text-gray-700 font-medium mb-2",
  input: "w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  inputValid: "border-gray-300",
  inputInvalid: "border-red-500",
  errorText: "text-red-500 text-sm mt-1",
  
  buttonGroup: "mt-8 flex justify-end space-x-4",
  cancelButton: "px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors",
  submitButton: (loading) => `bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`,
  
  viewLabel: "text-gray-500 text-sm",
  viewValue: "text-gray-800 font-medium",
  pwChangeButton: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors",
  sectionGap: "mt-8 flex justify-end",
};