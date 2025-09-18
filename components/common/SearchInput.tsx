export default function SearchInput({ value, onChange, placeholder }: any) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
