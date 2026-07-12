# TeslimGüven — İş Modeli ve Büyüme Stratejisi

## 1. Sorun ve Fırsat

Türkiye'de tasarruf finansman (elbirliği) sektörü BDDK denetiminde hızla büyüyor;
Eminevim, Katılımevim, Fuzul Ev, Birevim gibi firmaların **2 milyonu aşkın müşterisi**
var ve her ay on binlerce müşteri ev/araç/işyeri teslimatı almaya hak kazanıyor.

Teslimat anındaki sorunlar:

- Müşteri satıcı bulmakta zorlanıyor; **kime güveneceğini bilmiyor**.
- Galerilerin/emlakçıların çoğu finansman firmalarının **ekspertiz, evrak ve ödeme
  prosedürlerini bilmiyor**; süreç uzuyor, mağduriyet doğuyor.
- Finansman firmaları müşterisine satıcı öneremiyor (yönlendirme riski), müşteri
  deneyimi kötü olursa marka da zarar görüyor.

TeslimGüven bu üç tarafın da kazandığı bir pazar yeri kurar:
**müşteri güven kazanır, işletme hazır müşteri kazanır, finansman firması
memnun müşteri ve temiz teslimat verisi kazanır.**

## 2. Temel Gelir Modeli: Abonelik (SaaS-benzeri)

| Plan | Aylık | Yıllıkta aylık | Hedef kitle |
|---|---|---|---|
| Standart | 1.490 ₺ | 1.190 ₺ | Tek şubeli küçük işletme |
| Premium | 3.490 ₺ | 2.790 ₺ | Talep hacmi arayan işletme |
| Kurumsal | 7.990 ₺ | 6.390 ₺ | Zincir / çok şubeli işletme |

Örnek ölçek: 81 ilde ortalama 25 üye işletme × ~2.500 ₺ ortalama abonelik ≈
**5 milyon ₺/ay** tekrarlayan gelir potansiyeli (orta vade hedefi).

## 3. Kârlılığı Artıran Ek Gelir Kanalları (yol haritasına alınmıştır)

1. **Talep (lead) paketleri** — Plan limitini aşan işletmelere talep başına ücret.
   Araçta talep başına 150–400 ₺, konutta 400–900 ₺ pazar normali.
2. **Sertifika Akademisi** — "Elbirliği Prosedür Sertifikası" eğitimi ve yıllık
   yenileme ücreti. Sertifika hem kalite güvencesi hem gelir kalemidir; zamanla
   sektör standardı hâline getirilmesi hedeflenir.
3. **Sponsorlu görünürlük** — Şehir/kategori sayfalarında sponsorlu sıralama,
   ana sayfa vitrini, kampanya e-bülteninde banner.
4. **B2B veri ve raporlama aboneliği** — Finansman firmalarına anonimleştirilmiş
   teslimat deneyim skorları, bölgesel arz-talep raporları ve tavsiye ağı API'si.
5. **Tamamlayıcı hizmet komisyonları** — Ekspertiz firmaları, nakliyat, sigorta
   (kasko/DASK/konut), tapu danışmanlığı gibi teslimat anında ihtiyaç duyulan
   hizmetlerin yönlendirme komisyonu.
6. **TeslimGüven Güvence Paketi (ileri faz)** — Teslimat işlemine platform
   güvencesi (süreç takibi + anlaşmazlık hakemliği) satan işlem başına ücretli
   opsiyonel paket; pazaryerinin "escrow benzeri" güven katmanı.

## 4. Ağ Etkisi ve Savunulabilirlik

- **Yorumlar sadece doğrulanmış teslimat müşterilerinden** alınır → sahte yorum
  riski düşük, veri kalitesi yüksek → rakiplerin kopyalayamayacağı varlık.
- Puan dört kritere ayrılır (güvenilirlik, fiyat şeffaflığı, prosedür bilgisi,
  iletişim) → işletme sıralaması gerçek hizmet kalitesini yansıtır.
- Sertifika programı işletme tarafında geçiş maliyeti yaratır.
- Finansman firmalarıyla resmî tavsiye protokolleri imzalandıkça platform
  müşteri edinme maliyeti sıfıra yaklaşır (firmalar müşterisini platforma
  kendisi yönlendirir).

## 5. Yol Haritası

**Faz 1 — MVP (bu depo):** Dizin, profil + puanlama görünümü, kampanya sayfası,
abonelik planları, lead formu. Tek şehirde (pilot: İstanbul) 30–50 işletmeyle
manuel doğrulama.

**Faz 2 — İşlem altyapısı:** Üye girişi, işletme paneli (talep yönetimi,
istatistik), doğrulanmış yorum akışı (teslimat kanıtı yükleme), online ödeme
ile abonelik tahsilatı, kampanyaların CMS'den yönetimi.

**Faz 3 — Ölçek:** Finansman firmalarıyla resmî entegrasyon (teslimat hakkı
doğrulama API'si), Sertifika Akademisi, lead paketleri, mobil uygulama.

**Faz 4 — Kârlılık derinleşmesi:** B2B veri ürünleri, tamamlayıcı hizmet
pazaryeri (ekspertiz/sigorta/nakliyat), Güvence Paketi.

## 6. Riskler ve Önlemler

- **Marka/hukuk:** Finansman firmalarının adının kullanımı için "bağımsız
  platform" beyanı her sayfada; orta vadede resmî iş birliği protokolleri.
- **KVKK:** Lead formunda açık rıza; veriler yalnızca eşleşen işletmeyle
  paylaşılır.
- **Sahte yorum:** Yorum hakkı yalnızca teslimat kanıtı doğrulanan müşteriye
  açılır (Faz 2).
- **Soğuk başlangıç:** Pilot şehirde ilk 6 ay Standart plan ücretsiz/indirimli
  kampanyasıyla arz tarafı doldurulur; talep tarafı finansman firmalarının
  şube ağı ve sosyal medya ile beslenir.
