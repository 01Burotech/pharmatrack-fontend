export default function Badge({ text, color }: { text: string; color: string }) {
  return <span className={`px-2 py-1 rounded-full text-white text-xs ${color}`}>{text}</span>;
}
