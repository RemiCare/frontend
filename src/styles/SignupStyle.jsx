export const signupStyles = {
  container: "min-h-screen bg-gray-50 py-12",
  wrapper: "max-w-3xl mx-auto px-4",
  header: "text-center mb-10",
  title: "text-3xl font-bold text-purple-700",
  subtitle: "text-gray-500 mt-2",

  box: "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100",
  section: "p-8",

  agreementBox: "mb-6",
  agreementLabel: "font-medium text-gray-800 mb-2",
  agreementContent: "h-32 bg-gray-50 p-4 overflow-y-auto text-sm border border-gray-200 rounded-lg mb-3",
  checkboxRow: "flex items-center",
  checkbox: "h-5 w-5 text-purple-600 border-gray-300 rounded",
  checkboxLabel: "ml-2 text-gray-700",

  nextButton: (enabled) => `px-8 py-2 ${enabled ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-300 cursor-not-allowed'} text-white font-medium rounded-lg transition duration-200`,

  formHeading: "text-xl font-semibold mb-6 text-gray-800",
  field: "mb-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  input: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500",

  rrnWrapper: "flex items-center",
  rrnInput: "w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
  rrnDash: "mx-2 text-gray-500",

  genderWrapper: "mb-6",
  genderOptions: "flex gap-4",
  genderLabel: "inline-flex items-center",
  genderRadio: "text-purple-600 focus:ring-purple-500",
  genderText: "ml-2 text-gray-700",

  phoneBox: "mb-4",
  phoneRow: "flex gap-2",
  phoneInput: "flex-1 border border-gray-300 rounded-lg px-4 py-2",
  verifyButton: "px-4 bg-purple-700 text-white rounded-lg",
  sendButton: "mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg",

  navigationButtons: "flex justify-between mt-6",
  backButton: "px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg",
  submitButton: "px-8 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg",

  successSection: "text-center py-10 px-8",
  successIcon: "w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center",
  successSvg: "h-10 w-10 text-purple-700",
  successTitle: "text-2xl font-bold text-gray-800 mb-3",
  successDesc: "text-gray-600 mb-8",
  successButton: "px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg",
};
