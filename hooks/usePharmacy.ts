"use client";

import { useMemo, useState } from "react";
import { pharmacyStats, pharmacyGraphData, phOrders, mockPrescriptions, mockProducts, ordersSummary, topProducts } from "@/constants/mockData";
import { format } from "date-fns";

export function usePharmacyDashboard() {
  const [stats] = useState(pharmacyStats);
  const [graphData] = useState(pharmacyGraphData);

  return { stats, graphData };
}

export function useOrders() {
  const [orders, setOrders] = useState(phOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Si un jour tu remplaces mockOrders par un fetch GraphQL :
  // useEffect(() => { fetchOrders().then(setOrders); }, []);

  const filteredOrders = orders.filter(
    (o) =>
      (o.patient?.toLowerCase().includes(search.toLowerCase()) ||
        o.id?.includes(search)) &&
      (statusFilter === "" || o.status === statusFilter)
  );

  return {
    orders,
    filteredOrders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    setOrders, // pour pouvoir rafraîchir plus tard
  };
}

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = prescriptions.filter(
    (p) =>
      (p.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        p.medications.some((m) => m.name.toLowerCase().includes(search.toLowerCase()))) &&
      (!statusFilter || p.status === statusFilter)
  );

  return {
    prescriptions,
    setPrescriptions,
    filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  };
}

export function useProducts(initialProducts = mockProducts) {
  const [products] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase())) &&
          (categoryFilter === "" || p.category === categoryFilter)
      ),
    [products, search, categoryFilter]
  );

  return {
    products,
    categories,
    filtered,
    selectedProduct,
    setSelectedProduct,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  };
}

export function usePharmacyReports(
  initialOrders = ordersSummary,
  initialProducts = topProducts
) {
  const [fromDate, setFromDate] = useState<string | undefined>("2025-09-01");
  const [toDate, setToDate] = useState<string | undefined>("2025-09-30");

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((o) => {
      const orderDate = new Date(o?.date ?? "").getTime();
      const from = fromDate ? new Date(fromDate).getTime() : -Infinity;
      const to = toDate ? new Date(toDate).getTime() : Infinity;

      return orderDate >= from && orderDate <= to;
    });
  }, [initialOrders, fromDate, toDate]);

  const csvFileName = `orders_report_${format(new Date(), "yyyyMMdd")}.csv`;

  return {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    filteredOrders,
    topProducts: initialProducts,
    csvFileName,
  };
}


