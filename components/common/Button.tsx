export default function Button({ label, icon: Icon, color, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1 ${color} text-white px-3 py-2 rounded-lg hover:brightness-90`}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
