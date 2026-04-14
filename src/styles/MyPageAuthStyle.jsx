export const myPageAuthStyles = {

  container: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4",

  wrapper: "w-full max-w-md",

  header: {
    container: "text-center mb-8",
    iconWrapper: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg",
    icon: "w-8 h-8 text-white",
    title: "text-3xl font-bold text-gray-900 mb-2",
    subtitle: "text-gray-600"
  },

  card: {
    container: "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden",
    content: "px-8 py-8"
  },

  form: {
    container: "space-y-6",
    fieldContainer: "space-y-2",
    label: "block text-sm font-semibold text-gray-700",
    inputWrapper: "relative"
  },

  input: {
    base: "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none",
    valid: "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100",
    invalid: "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100",
    disabled: "cursor-not-allowed opacity-50"
  },
 
  inputIcon: {
    wrapper: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
    icon: "w-5 h-5 text-gray-400"
  },

  error: {
    field: "text-red-500 text-sm flex items-center mt-1",
    fieldIcon: "w-4 h-4 mr-1",
    general: "bg-red-50 border border-red-200 rounded-xl p-4",
    generalContent: "flex items-center",
    generalIcon: "w-5 h-5 text-red-500 mr-2 flex-shrink-0",
    generalText: "text-red-700 text-sm font-medium"
  },

  button: {
    base: "w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100",
    normal: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-lg",
    loading: "bg-gray-400 cursor-not-allowed",
    content: "flex items-center justify-center",
    icon: "w-5 h-5 mr-2",
    spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
  },

  help: {
    container: "px-8 py-6 bg-gray-50 border-t border-gray-100",
    content: "flex items-start space-x-3",
    icon: "w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5",
    textContainer: "text-sm text-gray-600",
    title: "font-medium mb-1",
    description: ""
  },

  icons: {
    shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    exclamation: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    spinnerCircle: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }
};


export const getInputClassName = (hasError, isLoading) => {
  const baseClass = myPageAuthStyles.input.base;
  const validClass = myPageAuthStyles.input.valid;
  const invalidClass = myPageAuthStyles.input.invalid;
  const disabledClass = isLoading ? myPageAuthStyles.input.disabled : '';
  
  return `${baseClass} ${hasError ? invalidClass : validClass} ${disabledClass}`;
};

export const getButtonClassName = (isLoading) => {
  const baseClass = myPageAuthStyles.button.base;
  const stateClass = isLoading ? myPageAuthStyles.button.loading : myPageAuthStyles.button.normal;
  
  return `${baseClass} ${stateClass}`;
};