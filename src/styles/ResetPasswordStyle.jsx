export const resetPasswordStyles = {
  container: "max-w-md mx-auto py-12 px-4",
  title: "text-2xl font-bold text-center mb-2",
  subtitle: "text-center text-sm text-gray-600 mb-6",
  highlight: "font-semibold text-purple-700",

  inputGroup: "mb-4",
  label: "block text-sm font-medium mb-1",
  input: "w-full border px-4 py-2 rounded",
  helperText: "text-xs text-gray-500 mt-1",

  button: (isSubmitting) => `w-full ${isSubmitting ? 'bg-gray-400' : 'bg-purple-700 hover:bg-purple-800'} text-white py-2 rounded`,

  successBox: "mt-4 bg-green-100 text-green-700 p-3 rounded text-center",
  errorBox: "mt-4 bg-red-100 text-red-700 p-3 rounded text-center",

  debugBox: "mt-6 bg-gray-100 text-gray-800 p-4 rounded text-sm",
  debugTitle: "font-semibold mb-2",

  invalidAccess: "text-center text-red-600 py-10 font-semibold",
};