# Compilink

> Bilgi avcıları için kişisel knowledge command center.
> **Fikri yakala → kategorisine yerleştir → tek dokunuşla tekrar eriş veya paylaş.**

Compilink, strateji / pazarlama / akademi / kurumsal inovasyon ekiplerinin gün
içinde topladıkları onlarca linki tek bir yerde toplayıp kategorize etmesini,
özetlemesini ve formatlı şekilde paylaşmasını sağlayan bir Expo (React Native +
expo-router) uygulamasıdır.

---

## Hızlı başlangıç

```bash
npm install
npm start          # Expo dev server (i / a / w ile platform seç)
npm run web        # doğrudan web
npm run typecheck  # tsc --noEmit
```

> Placeholder ikon/splash görselleri `node assets/gen-assets.js` ile üretilir
> (gerçek görsellerle değiştirilmeli).

---

## Mimari

Tek bir merkezi store (`hooks/useStore.tsx`) AsyncStorage'tan veriyi hidrate
eder; özellik hook'ları (`useCategories`, `useItems`, `useFocusBoard`) bu store
üzerine ince birer seçici katmandır. Bu sayede **tek doğruluk kaynağı** korunur
ve iki ayrı hook'un aynı anahtarı bağımsız okuyup senkronizasyonu bozması
engellenir.

```
app/
  _layout.tsx           SafeArea → Store → Theme → Toast → Stack
  index.tsx             onboarding / dashboard yönlendirmesi
  onboarding.tsx        4 adımlı kurulum (welcome / rol / workspace / tutorial)
  (tabs)/
    _layout.tsx         alt tab bar (Akış / Kategoriler / Ayarlar)
    home.tsx            Dashboard: hero, stats, rail, focus board, recent
    categories.tsx      kategori listesi + progress + ekle
    settings.tsx        tema, accent, sıralama, veri export/import
  category/[id].tsx     kategori detay: hero, filtre bar, kart listesi, empty
  item/[id].tsx         item detay (modal route, sheet'i yeniden kullanır)
components/
  Button, PlatformBadge, BottomSheet
  CategoryCard, CategoryRail
  ItemCard, ItemDetailSheet
  AddItemSheet, AddCategorySheet
  StatsWidget, FocusCard, SharePreview
hooks/
  useStore, useTheme, useToast
  useCategories, useItems, useFocusBoard, useShare
lib/
  types.ts              domain tipleri
  storage.ts            AsyncStorage sarmalayıcı (@compilink/*)
  mockData.ts           8 kategori × 3 item seed + metadata simülasyonu
  share.ts              generateShareCopy
  theme/tokens.ts       renk / tipografi / spacing / radius / shadow + buildTheme
```

---

## Tasarım kararları

- **Design token'ları tek kaynak.** Tüm renk/tipografi/spacing değerleri
  `lib/theme/tokens.ts` içinde; ekranlar ham değer kullanmaz, `useTheme()` ile
  çözümlenmiş temayı okur. Accent renkleri light/dark için ayrı varyant taşır ki
  highlight her iki zeminde de okunaklı kalsın.
- **Emoji ikonografi.** Vektör ikon bağımlılığı yerine emoji glyph'ler
  kullanıldı; proje bağımlılığı hafif kalsın diye. İleride bir ikon setiyle
  değiştirilebilir.
- **Bağımsız bottom sheet.** `BottomSheet` salt RN `Modal` üzerine kuruldu;
  drag-to-close yerine backdrop tap ile kapanır, böylece web'de de birebir
  çalışır.
- **Filtre uyarlaması.** Brief'teki "Paylaşılan" filtresi veri modelinde
  karşılığı olmadığından izlenen gerçek durumlarla değiştirildi:
  Hepsi / Favori / Okunmamış / Okundu.
- **Metadata fetch simülasyonu.** `fetchMetadata` URL'den platform tahmini yapıp
  `setTimeout` ile ağ gecikmesini taklit eder — gerçek bir unfurl/oEmbed
  endpoint'iyle değiştirilebilir.

---

## Gelecek adımlar

1. **API entegrasyonu** — `storage.ts` arkasına gerçek bir backend (REST/GraphQL)
   koyup hook imzalarını koruyarak çevrimiçi senkronizasyon; `fetchMetadata`
   yerine gerçek link unfurl servisi.
2. **İşbirlikçi workspace** — paylaşılan kategoriler, üyelik/rol yönetimi,
   gerçek "Paylaşılan" filtresi için bir paylaşım kaydı.
3. **Web build** — `expo export --platform web` ile statik çıktı hazır;
   responsive layout iyileştirmeleri ve PWA manifesti eklenebilir.
4. **Zenginleştirmeler** — otomatik AI özet, etiketleme, tam metin arama,
   gerçek dosya tabanlı JSON import/export, push hatırlatmaları.
