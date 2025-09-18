export function Button({ children, variant='primary', ...props }) {
  const base =
    'w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.02] focus:outline-none';
  const styles = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600',
    secondary: 'border border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-md'
  };
  return (
    <button {...props} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
