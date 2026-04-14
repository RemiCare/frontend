export const loginStyles = {
  container: "min-h-screen bg-gray-50",
  wrapper: "max-w-4xl mx-auto pt-10 pb-20 px-4",
  header: "text-center mb-10",
  title: "text-3xl font-bold text-purple-700",
  subtitle: "text-gray-600 mt-2",
  box: "bg-white rounded-lg shadow-lg overflow-hidden",
  formWrapper: "p-8",
  formInner: "max-w-md mx-auto",
  fieldWrapper: "mb-6",
  label: "block text-gray-700 font-medium mb-2",
  input: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500",
  options: "flex items-center justify-between mb-6",
  checkboxWrapper: "flex items-center",
  checkbox: "h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500",
  checkboxLabel: "ml-2 text-gray-700",
  findLinks: "flex flex-col sm:flex-row gap-2 text-sm",
  divider: "hidden sm:inline text-gray-400",
  link: "text-purple-600 hover:text-purple-800",
  loginButton: (loading) =>
    `w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 rounded-lg transition duration-200 ${
      loading ? 'opacity-70 cursor-not-allowed' : ''
    }`,
  footer: "text-center mt-8 pt-6 border-t border-gray-200",
  footerText: "text-gray-600",
  footerLink: "inline-block mt-2 text-purple-700 hover:text-purple-900 font-medium",
};