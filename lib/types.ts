export type BusinessType = "galeri" | "emlak";

export type PlanTier = "standart" | "premium" | "kurumsal";

export interface FinanceCompany {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  categories: ("ev" | "arac" | "isyeri")[];
}

export interface Review {
  id: string;
  businessSlug: string;
  author: string;
  rating: number; // 1-5
  date: string; // ISO
  comment: string;
  purchase: string; // ör: "Eminevim ile araç teslimatı"
  criteria: {
    guvenilirlik: number;
    fiyatSeffafligi: number;
    surecBilgisi: number; // elbirliği prosedürlerine hakimiyet
    iletisim: number;
  };
}

export interface Business {
  slug: string;
  name: string;
  type: BusinessType;
  city: string;
  district: string;
  phone: string;
  description: string;
  services: string[];
  partnerCompanies: string[]; // FinanceCompany id'leri
  plan: PlanTier;
  verified: boolean; // platform saha doğrulaması yapıldı mı
  certified: boolean; // elbirliği prosedür eğitimi sertifikası
  rating: number;
  reviewCount: number;
  completedDeliveries: number; // platform üzerinden tamamlanan teslimat
  memberSince: string;
}

export interface Campaign {
  id: string;
  companyId: string;
  title: string;
  category: "ev" | "arac" | "isyeri";
  description: string;
  validUntil: string;
  highlight?: string;
}

export interface Plan {
  tier: PlanTier;
  name: string;
  monthlyPrice: number; // TL
  yearlyPrice: number; // TL, yıllık ödemede aylık karşılığı
  features: string[];
  emphasized?: boolean;
}
