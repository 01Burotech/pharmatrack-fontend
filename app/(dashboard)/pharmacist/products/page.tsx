"use client";

import PageContainer from "@/components/layout/PageContainer";
import { pharmacySidebarLinks } from "@/constants/mockData";
import { ProductList } from "@/components/pharmacy/ProductList";

// Page principale
export default function PharmacyProductsPage() {
  return (
    <PageContainer
      sidebarLinks={pharmacySidebarLinks}
      logoSrc="/logo.png"
      brandName="Pharmatrack"
      pageTitle="Produits"
      avatarUrl="/avatar.png"
      notificationCount={1}
    >
      <ProductList />
    </PageContainer>
  );
}
