import { useProducts } from "@/hooks/usePharmacy";
import { HomeIcon, PlusCircle } from "lucide-react";
import { ProductDetail } from "./ProductDetail";
import Link from "next/link";

export function ProductList() {
  const {
    filtered,
    selectedProduct,
    setSelectedProduct,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories,
  } = useProducts();

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/pharmacist"
          className="inline-flex items-center gap-2 px-5 py-2 bg-amber-100 text-green-600 rounded-full shadow hover:bg-amber-200 transition"
        >
          <HomeIcon className="w-5 h-5" /> Tableau de bord
        </Link>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Rechercher par nom ou catégorie..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <PlusCircle className="w-4 h-4" /> Ajouter produit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-semibold mb-1">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{p.category}</p>
            <p className="text-sm text-gray-500 mb-1">Stock : {p.stock}</p>
            <p className="text-sm text-gray-500">Prix : ${p.price?.toFixed(2)}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500 text-center mt-4">Aucun produit trouvé.</p>}
      </div>
    </div>
  );
}