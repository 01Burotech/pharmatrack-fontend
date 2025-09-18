export default function MedicationItem({ name, dosage, quantity }: { name: string; dosage: string; quantity: number }) {
  return (
    <div className="flex justify-between bg-gray-50 p-2 rounded-lg mb-1 shadow-sm">
      <div>{name} ({dosage})</div>
      <div className="font-semibold">{quantity}</div>
    </div>
  );
}
