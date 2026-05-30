/**
 * Seed data used on first launch (and by the metadata-fetch simulator).
 * 8 categories, 3 items each. Dates are spread across the last ~3 weeks so the
 * "Recent Captures" and sort-by-recent views look realistic.
 */

import type { Category, Item, Platform } from './types';

const ACCENT_POOL = [
  '#6A5ACD',
  '#FFB347',
  '#2F95DC',
  '#00B894',
  '#E5547C',
  '#9B5DE5',
  '#F25F5C',
  '#2EC4B6',
];

/** Helper: ISO string `daysAgo` days before now. */
const ago = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-insight',
    name: 'Insight Hub',
    emoji: '🧠',
    description: 'Pazar ve davranış içgörüleri, raporlar.',
    color: ACCENT_POOL[0],
    createdAt: ago(21),
  },
  {
    id: 'cat-growth',
    name: 'Growth Benchmarks',
    emoji: '📈',
    description: 'Funnel, retention ve acquisition kıyaslamaları.',
    color: ACCENT_POOL[1],
    createdAt: ago(20),
  },
  {
    id: 'cat-campaign',
    name: 'Campaign Ideas',
    emoji: '🎯',
    description: 'Kampanya ve creative ilham kaynakları.',
    color: ACCENT_POOL[2],
    createdAt: ago(19),
  },
  {
    id: 'cat-product',
    name: 'Product Teardowns',
    emoji: '🔧',
    description: 'Ürün analizleri ve UX teardown yazıları.',
    color: ACCENT_POOL[3],
    createdAt: ago(16),
  },
  {
    id: 'cat-ai',
    name: 'AI & Tooling',
    emoji: '🤖',
    description: 'Yapay zeka araçları, prompt ve otomasyon.',
    color: ACCENT_POOL[4],
    createdAt: ago(12),
  },
  {
    id: 'cat-brand',
    name: 'Brand & Story',
    emoji: '✨',
    description: 'Marka konumlandırma ve hikaye anlatımı.',
    color: ACCENT_POOL[5],
    createdAt: ago(9),
  },
  {
    id: 'cat-data',
    name: 'Data & Research',
    emoji: '📊',
    description: 'Veri kaynakları, akademik makaleler.',
    color: ACCENT_POOL[6],
    createdAt: ago(6),
  },
  {
    id: 'cat-reads',
    name: 'Weekend Reads',
    emoji: '📚',
    description: 'Uzun soluklu, derinlemesine okumalar.',
    color: ACCENT_POOL[7],
    createdAt: ago(3),
  },
];

interface SeedItemSpec {
  title: string;
  url: string;
  platform: Platform;
  note?: string;
  summary?: string[];
  isFavorite?: boolean;
  status?: Item['status'];
  daysAgo: number;
}

const SPECS: Record<string, SeedItemSpec[]> = {
  'cat-insight': [
    {
      title: '2026 Tüketici Davranış Raporu',
      url: 'https://example.com/consumer-2026',
      platform: 'pdf',
      note: 'Z kuşağı satın alma tetikleyicileri bölümü kritik.',
      summary: ['Mikro-anlar kararı belirliyor', 'Topluluk > reklam', 'Sürdürülebilirlik premium'],
      status: 'in-progress',
      daysAgo: 2,
    },
    {
      title: 'Neden insanlar paylaşır? — Jonah Berger',
      url: 'https://youtube.com/watch?v=share-psychology',
      platform: 'youtube',
      note: 'STEPPS çerçevesi notları.',
      isFavorite: true,
      daysAgo: 8,
    },
    {
      title: 'B2B alıcı yolculuğu değişiyor',
      url: 'https://linkedin.com/posts/b2b-journey',
      platform: 'linkedin',
      status: 'done',
      daysAgo: 15,
    },
  ],
  'cat-growth': [
    {
      title: 'SaaS Retention Benchmark 2026',
      url: 'https://example.com/retention',
      platform: 'web',
      note: 'D30 medyanı %38; bizimkini kıyasla.',
      summary: ['D1 onboarding kritik', 'D30 medyan %38', 'Aha-moment < 5 dk'],
      isFavorite: true,
      status: 'in-progress',
      daysAgo: 1,
    },
    {
      title: 'PLG funnel teardown',
      url: 'https://youtube.com/watch?v=plg-funnel',
      platform: 'youtube',
      daysAgo: 10,
    },
    {
      title: 'Activation metrics thread',
      url: 'https://x.com/growth/activation',
      platform: 'x',
      status: 'done',
      daysAgo: 18,
    },
  ],
  'cat-campaign': [
    {
      title: 'Yılın en iyi 20 kampanyası',
      url: 'https://example.com/best-campaigns',
      platform: 'web',
      note: 'Spotify Wrapped mekaniği uyarlanabilir.',
      isFavorite: true,
      daysAgo: 3,
    },
    {
      title: 'UGC kampanya stratejisi',
      url: 'https://linkedin.com/posts/ugc-strategy',
      platform: 'linkedin',
      status: 'new',
      daysAgo: 11,
    },
    {
      title: 'Creative testing 101',
      url: 'https://youtube.com/watch?v=creative-test',
      platform: 'youtube',
      status: 'in-progress',
      daysAgo: 17,
    },
  ],
  'cat-product': [
    {
      title: 'Linear nasıl bu kadar hızlı hissettiriyor',
      url: 'https://example.com/linear-ux',
      platform: 'web',
      note: 'Optimistic UI + keyboard-first.',
      summary: ['Optimistic updates', 'Klavye öncelikli', 'Az ama net animasyon'],
      isFavorite: true,
      daysAgo: 4,
    },
    {
      title: 'Onboarding teardown: Duolingo',
      url: 'https://youtube.com/watch?v=duo-onboarding',
      platform: 'youtube',
      daysAgo: 9,
    },
    {
      title: 'Empty state tasarım kalıpları',
      url: 'https://example.com/empty-states',
      platform: 'web',
      status: 'done',
      daysAgo: 14,
    },
  ],
  'cat-ai': [
    {
      title: 'Prompt engineering for marketers',
      url: 'https://example.com/prompt-marketing',
      platform: 'web',
      note: 'Brief → prompt şablonları bölümü.',
      isFavorite: true,
      status: 'in-progress',
      daysAgo: 1,
    },
    {
      title: 'AI workflow otomasyonu',
      url: 'https://youtube.com/watch?v=ai-workflow',
      platform: 'youtube',
      daysAgo: 7,
    },
    {
      title: 'LLM eval thread',
      url: 'https://x.com/ai/evals',
      platform: 'x',
      status: 'new',
      daysAgo: 13,
    },
  ],
  'cat-brand': [
    {
      title: 'Marka arketipleri rehberi',
      url: 'https://example.com/archetypes',
      platform: 'pdf',
      summary: ['12 arketip', 'Ses tonu eşlemesi', 'Çakışmadan kaçın'],
      daysAgo: 5,
    },
    {
      title: 'Storytelling for founders',
      url: 'https://youtube.com/watch?v=founder-story',
      platform: 'youtube',
      isFavorite: true,
      daysAgo: 12,
    },
    {
      title: 'Pozisyonlama: Obviously Awesome',
      url: 'https://example.com/positioning',
      platform: 'web',
      status: 'done',
      daysAgo: 19,
    },
  ],
  'cat-data': [
    {
      title: 'Açık veri kaynakları listesi',
      url: 'https://example.com/open-data',
      platform: 'web',
      note: 'Türkiye pazarı için TÜİK + Statista.',
      daysAgo: 2,
    },
    {
      title: 'Anket tasarımında yanlılık',
      url: 'https://example.com/survey-bias',
      platform: 'pdf',
      status: 'in-progress',
      daysAgo: 8,
    },
    {
      title: 'Causal inference giriş',
      url: 'https://youtube.com/watch?v=causal-intro',
      platform: 'youtube',
      isFavorite: true,
      daysAgo: 16,
    },
  ],
  'cat-reads': [
    {
      title: 'The Tyranny of Metrics',
      url: 'https://example.com/tyranny-metrics',
      platform: 'web',
      note: 'Hafta sonu için ayrıldı.',
      daysAgo: 1,
    },
    {
      title: 'Slow productivity özeti',
      url: 'https://linkedin.com/posts/slow-productivity',
      platform: 'linkedin',
      status: 'new',
      daysAgo: 6,
    },
    {
      title: 'Attention ekonomisi denemesi',
      url: 'https://example.com/attention-economy',
      platform: 'web',
      isFavorite: true,
      status: 'done',
      daysAgo: 20,
    },
  ],
};

export const SEED_ITEMS: Item[] = SEED_CATEGORIES.flatMap((cat) =>
  (SPECS[cat.id] ?? []).map((spec, idx) => ({
    id: `${cat.id}-item-${idx + 1}`,
    title: spec.title,
    url: spec.url,
    categoryId: cat.id,
    platform: spec.platform,
    note: spec.note,
    summary: spec.summary,
    addedAt: ago(spec.daysAgo),
    isFavorite: spec.isFavorite ?? false,
    status: spec.status ?? 'new',
  })),
);

/**
 * Metadata-fetch simulator used by the Add Item flow's "Başlığı yakala" button.
 * Pretends to hit a network, infers a platform from the URL, and returns a
 * plausible title. Replace with a real unfurl/oEmbed endpoint later.
 */
export function inferPlatform(url: string): Platform {
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('linkedin.com')) return 'linkedin';
  if (u.includes('x.com') || u.includes('twitter.com')) return 'x';
  if (u.endsWith('.pdf') || u.includes('/pdf')) return 'pdf';
  return 'web';
}

export function fetchMetadata(url: string): Promise<{ title: string; platform: Platform }> {
  const platform = inferPlatform(url);
  // Derive a readable title from the path as a stand-in for real metadata.
  let host = 'Yeni bağlantı';
  try {
    const parsed = new URL(url);
    const slug = parsed.pathname.split('/').filter(Boolean).pop() ?? parsed.hostname;
    host = decodeURIComponent(slug)
      .replace(/[-_]+/g, ' ')
      .replace(/\.(html?|pdf)$/i, '')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
    if (!host) host = parsed.hostname;
  } catch {
    host = 'Yeni bağlantı';
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve({ title: host, platform }), 700);
  });
}
