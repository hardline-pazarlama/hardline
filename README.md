# TeslimGüven

**Elbirliği (tasarruf finansman) sistemiyle ev, araç veya işyeri alanlar için güvenilir galeri ve emlakçı platformu.**

Eminevim, Katılımevim, Fuzul Ev, Birevim gibi tasarruf finansman firmalarının müşterileri, teslimat sırası geldiğinde iki büyük sorunla karşılaşır:

1. **Nereden alacağını bilmiyor** — bütçesine uygun, süreci bilen satıcı bulmak zor.
2. **Kime güveneceğini bilmiyor** — ekspertiz farkı, evrak gecikmesi ve prosedür bilmeyen satıcılar mağduriyet yaratıyor.

TeslimGüven bu iki sorunu çözer: finansman prosedürlerine hakim, platform tarafından doğrulanmış ve gerçek müşterilerce puanlanmış galeri/emlak ofislerini tek dizinde toplar.

## Özellikler (MVP)

- **İşletme dizini** (`/isletmeler`) — şehir, işletme tipi (galeri/emlak) ve anlaşmalı finansman firmasına göre filtreleme; ücretli plan üyeleri "Öne Çıkan" rozetiyle üstte listelenir.
- **İşletme profili** (`/isletme/[slug]`) — 4 kriterli puan detayı (güvenilirlik, fiyat şeffaflığı, prosedür bilgisi, iletişim), doğrulanmış müşteri yorumları, hizmetler, anlaşmalı firmalar, teklif alma.
- **Güncel kampanyalar** (`/kampanyalar`) — finansman firmalarının ev/araç/işyeri kampanyaları firma bazında tek sayfada.
- **Üyelik planları** (`/uyelik`) — Standart / Premium / Kurumsal abonelik katmanları + üyelik ötesi gelir kanalları.
- **Teklif alma (lead)** (`/teklif-al`) — müşteri talebi formu; işletme başvurusu modu (`?tip=isletme`).
- **Nasıl çalışır** (`/nasil-calisir`) — müşteri ve işletme akışları.

## Teknoloji

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- MVP aşamasında veriler `lib/data.ts` içinde mock olarak tutulur; üretimde veritabanı + CMS'e taşınacaktır.

## Geliştirme

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # üretim derlemesi
```

## İş Modeli

Gelir modeli, büyüme stratejisi ve yol haritası için [docs/is-modeli.md](docs/is-modeli.md) dosyasına bakın.

## Yasal Not

TeslimGüven bağımsız bir platformdur; adı geçen tasarruf finansman şirketlerinin resmî temsilcisi veya iştiraki değildir. Kampanya bilgileri ilgili firmaların kamuya açık duyurularından derlenir.
