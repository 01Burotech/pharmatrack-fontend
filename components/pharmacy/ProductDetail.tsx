import { Product } from "@/types";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";


export function ProductDetail({ 
  product, 
  onBack 
}: { product: Product; 
  onBack: () => void 
}) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <button onClick={onBack} className="text-blue-600 mb-6 hover:underline flex items-center gap-1">
        ← Retour
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.stock ? (product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700") : "bg-gray-100 text-gray-700"
          }`}
        >
          {product.stock} en stock
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-600">
          <span className="font-semibold">Catégorie :</span> {product.category}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Prix :</span> ${product.price?.toFixed(2)}
        </p>
      </div>
      <p className="text-gray-500 mt-4">{product.description}</p>

      <div className="flex flex-wrap gap-3 mt-6">
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
          <Edit className="w-4 h-4" /> Modifier
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
          <Trash2 className="w-4 h-4" /> Supprimer
        </button>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition">
          <ArrowUpDown className="w-4 h-4" /> Ajuster stock
        </button>
      </div>
    </div>
  );
}