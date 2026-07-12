import { Business, Campaign, FinanceCompany, Plan, Review } from "./types";

export const financeCompanies: FinanceCompany[] = [
  {
    id: "eminevim",
    slug: "eminevim",
    name: "Eminevim",
    shortDescription:
      "1991'den bu yana elbirliği sistemi ile faizsiz ev ve araç edindiren öncü kuruluş.",
    categories: ["ev", "arac"],
  },
  {
    id: "katilimevim",
    slug: "katilimevim",
    name: "Katılımevim",
    shortDescription:
      "Tasarrufa dayalı faizsiz finansman ile ev, araç ve işyeri sahibi yapan kuruluş.",
    categories: ["ev", "arac", "isyeri"],
  },
  {
    id: "fuzulev",
    slug: "fuzulev",
    name: "Fuzul Ev",
    shortDescription:
      "Elbirliği yöntemiyle ev, araç ve arsa edindirme alanında köklü marka.",
    categories: ["ev", "arac", "isyeri"],
  },
  {
    id: "birevim",
    slug: "birevim",
    name: "Birevim",
    shortDescription:
      "Tasarruf finansman modeliyle konut ve taşıt edindirme hizmeti sunar.",
    categories: ["ev", "arac"],
  },
];

export const businesses: Business[] = [
  {
    slug: "guven-oto-galeri-istanbul",
    name: "Güven Oto Galeri",
    type: "galeri",
    city: "İstanbul",
    district: "Kadıköy",
    phone: "0216 000 00 01",
    description:
      "20 yıllık tecrübemizle ikinci el ve sıfır araç satışında hizmet veriyoruz. Eminevim ve Katılımevim teslimat prosedürlerine hakimiz; ekspertiz raporu olmadan araç satmıyoruz.",
    services: [
      "TSE onaylı ekspertiz",
      "Noter işlem takibi",
      "Finansman evrak desteği",
      "Takas imkânı",
    ],
    partnerCompanies: ["eminevim", "katilimevim"],
    plan: "premium",
    verified: true,
    certified: true,
    rating: 4.8,
    reviewCount: 124,
    completedDeliveries: 210,
    memberSince: "2024-03",
  },
  {
    slug: "yuva-emlak-istanbul",
    name: "Yuva Gayrimenkul",
    type: "emlak",
    city: "İstanbul",
    district: "Ümraniye",
    phone: "0216 000 00 02",
    description:
      "Konut ve işyeri alım-satımında uzman ekibimizle elbirliği sistemi müşterilerine tapu ve ekspertiz sürecinde uçtan uca eşlik ediyoruz.",
    services: [
      "SPK lisanslı değerleme yönlendirmesi",
      "Tapu işlem takibi",
      "İskan ve imar kontrolü",
      "Kira getiri analizi",
    ],
    partnerCompanies: ["eminevim", "fuzulev", "birevim"],
    plan: "kurumsal",
    verified: true,
    certified: true,
    rating: 4.9,
    reviewCount: 187,
    completedDeliveries: 342,
    memberSince: "2024-01",
  },
  {
    slug: "kale-oto-ankara",
    name: "Kale Otomotiv",
    type: "galeri",
    city: "Ankara",
    district: "Çankaya",
    phone: "0312 000 00 03",
    description:
      "Ankara'nın köklü galerilerinden. Katılımevim ve Birevim müşterilerine özel araç havuzu ve hızlı teslimat süreci sunuyoruz.",
    services: [
      "Ekspertiz raporu",
      "Garantili araç sertifikası",
      "Finansman evrak desteği",
    ],
    partnerCompanies: ["katilimevim", "birevim"],
    plan: "premium",
    verified: true,
    certified: true,
    rating: 4.6,
    reviewCount: 89,
    completedDeliveries: 145,
    memberSince: "2024-06",
  },
  {
    slug: "anadolu-emlak-ankara",
    name: "Anadolu Emlak Ofisi",
    type: "emlak",
    city: "Ankara",
    district: "Keçiören",
    phone: "0312 000 00 04",
    description:
      "Keçiören ve çevresinde konut portföyümüzle elbirliği sistemi teslimat müşterilerine bütçesine uygun seçenekler sunuyoruz.",
    services: ["Tapu takibi", "Değerleme koordinasyonu", "Taşınma desteği"],
    partnerCompanies: ["eminevim", "katilimevim"],
    plan: "standart",
    verified: true,
    certified: false,
    rating: 4.3,
    reviewCount: 41,
    completedDeliveries: 58,
    memberSince: "2025-02",
  },
  {
    slug: "ege-oto-izmir",
    name: "Ege Oto Center",
    type: "galeri",
    city: "İzmir",
    district: "Bornova",
    phone: "0232 000 00 05",
    description:
      "İzmir'de sıfır ve ikinci el araç satışı. Fuzul Ev ve Eminevim teslimat süreçlerinde deneyimli satış ekibi.",
    services: ["Ekspertiz", "Noter takibi", "Araç kiralama köprü çözümü"],
    partnerCompanies: ["fuzulev", "eminevim"],
    plan: "standart",
    verified: true,
    certified: true,
    rating: 4.5,
    reviewCount: 67,
    completedDeliveries: 98,
    memberSince: "2024-09",
  },
  {
    slug: "marmara-gayrimenkul-bursa",
    name: "Marmara Gayrimenkul",
    type: "emlak",
    city: "Bursa",
    district: "Nilüfer",
    phone: "0224 000 00 06",
    description:
      "Bursa Nilüfer'de konut ve işyeri uzmanı. Katılımevim işyeri finansmanı teslimatlarında bölgenin en deneyimli ofisi.",
    services: [
      "İşyeri portföyü",
      "Değerleme koordinasyonu",
      "Kira sözleşme danışmanlığı",
    ],
    partnerCompanies: ["katilimevim", "birevim", "fuzulev"],
    plan: "premium",
    verified: true,
    certified: true,
    rating: 4.7,
    reviewCount: 73,
    completedDeliveries: 112,
    memberSince: "2024-05",
  },
  {
    slug: "akdeniz-oto-antalya",
    name: "Akdeniz Oto Galeri",
    type: "galeri",
    city: "Antalya",
    district: "Muratpaşa",
    phone: "0242 000 00 07",
    description:
      "Antalya'da geniş araç yelpazesi. Teslimat bütçenize uygun aracı birlikte buluyor, ekspertiz ve noter sürecini biz yönetiyoruz.",
    services: ["Ekspertiz", "Noter takibi", "Şehir dışı araç transferi"],
    partnerCompanies: ["eminevim", "birevim"],
    plan: "standart",
    verified: false,
    certified: false,
    rating: 4.1,
    reviewCount: 23,
    completedDeliveries: 31,
    memberSince: "2025-04",
  },
  {
    slug: "safir-emlak-konya",
    name: "Safir Emlak",
    type: "emlak",
    city: "Konya",
    district: "Selçuklu",
    phone: "0332 000 00 08",
    description:
      "Konya'da konut alım-satımında güvenilir adres. Elbirliği sistemi ödeme planına uygun portföy yönlendirmesi yapıyoruz.",
    services: ["Tapu takibi", "Portföy eşleştirme", "Değerleme koordinasyonu"],
    partnerCompanies: ["eminevim", "katilimevim", "fuzulev"],
    plan: "standart",
    verified: true,
    certified: true,
    rating: 4.4,
    reviewCount: 52,
    completedDeliveries: 76,
    memberSince: "2024-11",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    businessSlug: "guven-oto-galeri-istanbul",
    author: "Mehmet K.",
    rating: 5,
    date: "2026-06-18",
    comment:
      "Eminevim teslimatım geldiğinde hangi araca yöneleceğimi bilmiyordum. Ekspertiz raporunu önüme koydular, finansman evraklarını kendileri hazırladı. 3 günde aracımı teslim aldım.",
    purchase: "Eminevim ile araç teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 5, surecBilgisi: 5, iletisim: 5 },
  },
  {
    id: "r2",
    businessSlug: "guven-oto-galeri-istanbul",
    author: "Ayşe T.",
    rating: 4,
    date: "2026-05-02",
    comment:
      "Katılımevim prosedürlerini benden iyi biliyorlardı. Fiyat konusunda şeffaftılar, tek eksik teslimat günü küçük bir gecikme oldu.",
    purchase: "Katılımevim ile araç teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 4, surecBilgisi: 5, iletisim: 4 },
  },
  {
    id: "r3",
    businessSlug: "yuva-emlak-istanbul",
    author: "Hasan D.",
    rating: 5,
    date: "2026-06-25",
    comment:
      "Fuzul Ev teslimatımda bütçeme uygun 6 daire gezdirdiler. Değerleme ve tapu sürecinin tamamını yönettiler, hiçbir aşamada mağdur olmadım.",
    purchase: "Fuzul Ev ile konut teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 5, surecBilgisi: 5, iletisim: 5 },
  },
  {
    id: "r4",
    businessSlug: "yuva-emlak-istanbul",
    author: "Zeynep A.",
    rating: 5,
    date: "2026-04-14",
    comment:
      "Eminevim sürecinde ekspertiz değeri ile satış fiyatı arasındaki farkı nasıl yöneteceğimizi adım adım anlattılar. Gerçekten işini bilen bir ofis.",
    purchase: "Eminevim ile konut teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 5, surecBilgisi: 5, iletisim: 4 },
  },
  {
    id: "r5",
    businessSlug: "kale-oto-ankara",
    author: "Osman Y.",
    rating: 5,
    date: "2026-06-01",
    comment:
      "Birevim teslimat tutarıma uygun araçları önceden hazırlamışlardı. Ekspertizi birlikte yaptırdık, evrak sürecini onlar yürüttü.",
    purchase: "Birevim ile araç teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 4, surecBilgisi: 5, iletisim: 5 },
  },
  {
    id: "r6",
    businessSlug: "marmara-gayrimenkul-bursa",
    author: "Elif S.",
    rating: 5,
    date: "2026-05-20",
    comment:
      "Katılımevim işyeri finansmanı ile dükkan aldık. Kira getiri analizini bile hazırladılar. Teslimat sürecinde bir kez bile evrak sorunu yaşamadık.",
    purchase: "Katılımevim ile işyeri teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 5, surecBilgisi: 5, iletisim: 5 },
  },
  {
    id: "r7",
    businessSlug: "ege-oto-izmir",
    author: "Burak N.",
    rating: 4,
    date: "2026-03-30",
    comment:
      "Fuzul Ev sürecime hakimlerdi. Araç teslimine kadar geçen sürede kiralık araç köprü çözümü sunmaları büyük artı.",
    purchase: "Fuzul Ev ile araç teslimatı",
    criteria: { guvenilirlik: 4, fiyatSeffafligi: 4, surecBilgisi: 5, iletisim: 4 },
  },
  {
    id: "r8",
    businessSlug: "safir-emlak-konya",
    author: "Fatma G.",
    rating: 4,
    date: "2026-06-10",
    comment:
      "Eminevim teslimatında bütçemize uygun daireyi ikinci gezimizde bulduk. Tapu gününe kadar her aşamada yanımızdaydılar.",
    purchase: "Eminevim ile konut teslimatı",
    criteria: { guvenilirlik: 5, fiyatSeffafligi: 4, surecBilgisi: 4, iletisim: 5 },
  },
];

export const campaigns: Campaign[] = [
  {
    id: "c1",
    companyId: "eminevim",
    title: "Peşinatsız Araç Kampanyası",
    category: "arac",
    description:
      "Seçili tarifelerde peşinat olmadan, çekilişsiz sıraya girme imkânı. Organizasyon ücreti taksitlendirilebilir.",
    validUntil: "2026-08-31",
    highlight: "Peşinatsız",
  },
  {
    id: "c2",
    companyId: "eminevim",
    title: "Yaz Dönemi Konut Fırsatı",
    category: "ev",
    description:
      "1 milyon TL ve üzeri konut tarifelerinde ilk 6 ay taksit erteleme seçeneği.",
    validUntil: "2026-09-15",
  },
  {
    id: "c3",
    companyId: "katilimevim",
    title: "İşyeri Finansmanında Erken Teslimat",
    category: "isyeri",
    description:
      "İşyeri gruplarında %40 peşin ödeme ile teslimat sırası öne çekme kampanyası.",
    validUntil: "2026-08-20",
    highlight: "Erken Teslimat",
  },
  {
    id: "c4",
    companyId: "katilimevim",
    title: "Çeyiz Hesabı Entegre Konut Paketi",
    category: "ev",
    description:
      "Yeni evlenecek çiftlere özel indirimli organizasyon bedeli ve hediye çeki.",
    validUntil: "2026-10-01",
  },
  {
    id: "c5",
    companyId: "fuzulev",
    title: "Arsa + Konut Birleşik Tarife",
    category: "ev",
    description:
      "Arsa ve konut finansmanını tek sözleşmede birleştiren yeni tarife, ilk 500 üyeye özel avantajlı organizasyon bedeli.",
    validUntil: "2026-09-30",
    highlight: "Yeni Tarife",
  },
  {
    id: "c6",
    companyId: "birevim",
    title: "Taşıtta Model Yılı Kampanyası",
    category: "arac",
    description:
      "2024 ve üzeri model araç teslimatlarında ekspertiz ücreti Birevim tarafından karşılanır.",
    validUntil: "2026-08-15",
  },
];

export const plans: Plan[] = [
  {
    tier: "standart",
    name: "Standart",
    monthlyPrice: 1490,
    yearlyPrice: 1190,
    features: [
      "Platform dizininde işletme profili",
      "Müşteri puan ve yorumları",
      "Aylık 10 müşteri talebi (lead)",
      "Elbirliği prosedür rehberine erişim",
      "Temel istatistik paneli",
    ],
  },
  {
    tier: "premium",
    name: "Premium",
    monthlyPrice: 3490,
    yearlyPrice: 2790,
    emphasized: true,
    features: [
      "Standart'taki her şey",
      "Aramalarda öne çıkan rozetli sıralama",
      "Sınırsız müşteri talebi (lead)",
      "Prosedür sertifika eğitimi (2 personel)",
      "Kampanya duyurularında logo görünürlüğü",
      "Detaylı dönüşüm ve rakip analizi",
    ],
  },
  {
    tier: "kurumsal",
    name: "Kurumsal",
    monthlyPrice: 7990,
    yearlyPrice: 6390,
    features: [
      "Premium'daki her şey",
      "Çoklu şube yönetimi (5 şubeye kadar)",
      "Özel hesap yöneticisi",
      "Finansman firmalarıyla ortak etkinlik daveti",
      "Sınırsız personel sertifika eğitimi",
      "API ile portföy entegrasyonu",
    ],
  },
];

export function getBusiness(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getBusinessReviews(slug: string): Review[] {
  return reviews.filter((r) => r.businessSlug === slug);
}

export function getCompany(id: string): FinanceCompany | undefined {
  return financeCompanies.find((c) => c.id === id);
}

const planWeight: Record<string, number> = { kurumsal: 3, premium: 2, standart: 1 };

/** Öne çıkan (ücretli plan) işletmeler önce, ardından puana göre sıralar. */
export function sortBusinesses(list: Business[]): Business[] {
  return [...list].sort(
    (a, b) => planWeight[b.plan] - planWeight[a.plan] || b.rating - a.rating
  );
}
