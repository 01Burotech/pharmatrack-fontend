import { Order } from "@/hooks/useDoctor";
import { Check, X, Repeat } from "lucide-react";

interface Props {
  order: Order;
  onBack: () => void;
}

export default function OrderDetail({ order, onBack }: Props) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-orange-600 mb-4 flex items-center gap-1">
        ← Retour aux commandes
      </button>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <div className="bg-orange-50 p-4">
          <h2 className="text-lg font-semibold text-orange-700">Commande #{order.id}</h2>
          <p className="text-sm text-orange-500">Patient : {order.patient}</p>
          <p className="text-sm text-orange-500">Pharmacie : {order.pharmacy}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
            Statut : {order.status}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2">Médicaments :</h3>
          <ul className="mb-4 space-y-1">
            {order.items.map((item, idx) => (
              <li key={idx} className="text-gray-700">• {item.name} x {item.quantity}</li>
            ))}
          </ul>

          <div className="text-right font-bold text-orange-700 text-lg mb-4">
            Total : ${order.total.toFixed(2)}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
              <Check className="w-4 h-4" /> Valider
            </button>
            <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
              <X className="w-4 h-4" /> Annuler
            </button>
            <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
              <Repeat className="w-4 h-4" /> Renvoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
