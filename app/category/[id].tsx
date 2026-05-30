/**
 * Category detail. Hero (emoji, name, description, count + read progress),
 * a tag-based filter bar, and a single-column card list. Empty state nudges
 * the user to add their first link in the category's accent color.
 *
 * Filter note: the brief lists "Paylaşılan" as a tag, but the data model has no
 * shared flag, so we surface the meaningful states we *do* track —
 * Hepsi / Favori / Okunmamış / Okundu. Swap in a real "shared" filter once the
 * share log exists.
 */

import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { useItems } from '@/hooks/useItems';
import { useFocusBoard } from '@/hooks/useFocusBoard';
import { useShare } from '@/hooks/useShare';
import { ItemCard } from '@/components/ItemCard';
import { AddItemSheet } from '@/components/AddItemSheet';
import { ItemDetailSheet } from '@/components/ItemDetailSheet';
import type { Item } from '@/lib/types';

type Filter = 'all' | 'favorite' | 'unread' | 'done';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Hepsi' },
  { key: 'favorite', label: 'Favori' },
  { key: 'unread', label: 'Okunmamış' },
  { key: 'done', label: 'Okundu' },
];

export default function CategoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { getCategory } = useCategories();
  const { getItemsByCategory, toggleFavorite, toggleStatus } = useItems();
  const { isPinned, toggleFocus } = useFocusBoard();
  const { shareItem } = useShare();

  const [filter, setFilter] = useState<Filter>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [detailItem, setDetailItem] = useState<Item | null>(null);

  const category = getCategory(id);
  const all = getItemsByCategory(id);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'favorite':
        return all.filter((i) => i.isFavorite);
      case 'unread':
        return all.filter((i) => i.status !== 'done');
      case 'done':
        return all.filter((i) => i.status === 'done');
      default:
        return all;
    }
  }, [all, filter]);

  if (!category) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.textSecondary }}>Kategori bulunamadı.</Text>
      </View>
    );
  }

  const readCount = all.filter((i) => i.status === 'done').length;
  const progress = all.length > 0 ? readCount / all.length : 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 110 }}
      >
        {/* Back */}
        <Pressable onPress={() => router.back()} style={[styles.back, { paddingHorizontal: theme.spacing.lg }]} hitSlop={8}>
          <Text style={[styles.backText, { color: theme.colors.accent }]}>‹ Geri</Text>
        </Pressable>

        {/* Hero */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.sm }}>
          <View style={[styles.heroIcon, { backgroundColor: category.color + '22' }]}>
            <Text style={{ fontSize: 34 }}>{category.emoji}</Text>
          </View>
          <Text style={[styles.heroTitle, { color: theme.colors.textPrimary }]}>{category.name}</Text>
          {category.description ? (
            <Text style={[styles.heroDesc, { color: theme.colors.textSecondary }]}>{category.description}</Text>
          ) : null}

          <View style={[styles.progressTrack, { backgroundColor: theme.colors.surfaceAlt }]}>
            <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: category.color }]} />
          </View>
          <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
            {readCount}/{all.length} okunmuş • {all.length} içerik
          </Text>
        </View>

        {/* Filter bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, gap: 8, marginTop: theme.spacing.lg }}
        >
          {FILTERS.map((f) => {
            const active = f.key === filter;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: active ? theme.colors.accent : theme.colors.surface,
                    borderColor: active ? theme.colors.accent : theme.colors.border,
                    borderRadius: theme.radius.pill,
                  },
                ]}
              >
                <Text style={[styles.filterText, { color: active ? '#FFFFFF' : theme.colors.textSecondary }]}>{f.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* List */}
        <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
          {filtered.length === 0 ? (
            <View style={[styles.empty, { borderColor: category.color, borderRadius: theme.radius.lg }]}>
              <Text style={{ fontSize: 44 }}>{category.emoji}</Text>
              <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
                {filter === 'all' ? 'Bu kategoriye henüz içerik eklenmedi' : 'Bu filtrede içerik yok'}
              </Text>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                {filter === 'all' ? 'İlk linkini kaydet ve buradan eriş.' : 'Başka bir filtre dene.'}
              </Text>
            </View>
          ) : (
            filtered.map((it) => (
              <ItemCard
                key={it.id}
                item={it}
                category={category}
                pinned={isPinned(it.id)}
                onPress={() => setDetailItem(it)}
                onToggleFavorite={() => toggleFavorite(it.id)}
                onToggleStatus={() => toggleStatus(it.id)}
                onShare={() => shareItem(it)}
                onToggleFocus={() => toggleFocus(it.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => setShowAdd(true)}
        style={[styles.fab, theme.shadows.soft, { backgroundColor: category.color, bottom: insets.bottom + 24 }]}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>

      <AddItemSheet visible={showAdd} onClose={() => setShowAdd(false)} defaultCategoryId={category.id} />
      <ItemDetailSheet item={detailItem} visible={!!detailItem} onClose={() => setDetailItem(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { paddingVertical: 6 },
  backText: { fontSize: 16, fontWeight: '700' },
  heroIcon: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  heroTitle: { fontSize: 28, fontWeight: '800' },
  heroDesc: { fontSize: 15, lineHeight: 21, marginTop: 6 },
  progressTrack: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 16 },
  progressFill: { height: 8, borderRadius: 4 },
  progressLabel: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 9, borderWidth: 1 },
  filterText: { fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', gap: 8, padding: 32, borderWidth: 1.5, borderStyle: 'dashed' },
  emptyTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  fab: { position: 'absolute', right: 20, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#FFFFFF', fontSize: 30, fontWeight: '700', marginTop: -2 },
});
