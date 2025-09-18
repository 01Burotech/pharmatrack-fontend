export function Input({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        {...props}
        className={`block w-full rounded-xl border p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
        focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition
        ${error ? 'border-red-500 focus:ring-red-300 focus:border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

