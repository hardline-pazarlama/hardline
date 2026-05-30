/**
 * Dashboard / Home tab. Sections, top to bottom:
 *   Hero (workspace + accent + today's count) → Stats → Category Rail →
 *   Focus Board → Recent Captures. A floating "+" opens the Add Item sheet;
 *   tapping a card opens its detail sheet. Header carries a dark-mode toggle.
 */

import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/hooks/useStore';
import { useItems } from '@/hooks/useItems';
import { useCategories } from '@/hooks/useCategories';
import { useFocusBoard } from '@/hooks/useFocusBoard';
import { useShare } from '@/hooks/useShare';
import { CategoryRail } from '@/components/CategoryRail';
import { ItemCard } from '@/components/ItemCard';
import { FocusCard } from '@/components/FocusCard';
import { StatsWidget } from '@/components/StatsWidget';
import { AddItemSheet } from '@/components/AddItemSheet';
import { AddCategorySheet } from '@/components/AddCategorySheet';
import { ItemDetailSheet } from '@/components/ItemDetailSheet';
import { SharePreview } from '@/components/SharePreview';
import { BottomSheet } from '@/components/BottomSheet';
import type { Item } from '@/lib/types';

export default function Home() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { profile, preferences, setPreferences } = useStore();
  const { items, getRecentItems, getItem, toggleFavorite, toggleStatus } = useItems();
  const { categories, counts, getCategory } = useCategories();
  const { focusItems, isPinned, toggleFocus, removeFocus } = useFocusBoard();
  const { shareItem } = useShare();

  const [showAdd, setShowAdd] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [detailItem, setDetailItem] = useState<Item | null>(null);
  const [shareTarget, setShareTarget] = useState<Item | null>(null);

  const recent = getRecentItems(4);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return items.filter((i) => new Date(i.addedAt).toDateString() === today).length;
  }, [items]);

  const unread = items.filter((i) => i.status !== 'done').length;

  const toggleDarkMode = () => {
    const isDark = theme.scheme === 'dark';
    setPreferences({ themeMode: isDark ? 'light' : 'dark' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 120 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: theme.spacing.lg }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.kicker, { color: theme.colors.textSecondary }]}>Workspace</Text>
            <Text style={[styles.hero, { color: theme.colors.textPrimary }]}>
              {profile.workspaceName}’in Compilink’i
            </Text>
          </View>
          <Pressable
            onPress={toggleDarkMode}
            style={[styles.modeBtn, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          >
            <Text style={{ fontSize: 18 }}>{theme.scheme === 'dark' ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.md }}>
          <StatsWidget
            stats={[
              { label: 'Toplam', value: items.length },
              { label: 'Bugün', value: todayCount },
              { label: 'Okunacak', value: unread },
            ]}
          />
        </View>

        {/* Category Rail */}
        <SectionHeader title="Kategoriler" actionLabel="Tümü" onAction={() => router.push('/(tabs)/categories')} />
        <CategoryRail
          categories={categories}
          counts={counts}
          onSelect={(id) => router.push(`/category/${id}`)}
          onAdd={() => setShowAddCategory(true)}
        />

        {/* Focus Board */}
        <SectionHeader title="Focus Board" subtitle={`${focusItems.length}/3 bugünkü hedef`} />
        <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.sm }}>
          {focusItems.length === 0 ? (
            <EmptyHint text="Bir kartta “Öncelikli Oku” diyerek bugünkü okuma listeni oluştur." />
          ) : (
            focusItems.map((it) => (
              <FocusCard
                key={it.id}
                item={it}
                onToggleDone={() => toggleStatus(it.id)}
                onRemove={() => removeFocus(it.id)}
                onPress={() => setDetailItem(it)}
              />
            ))
          )}
        </View>

        {/* Recent Captures */}
        <SectionHeader title="Son eklenenler" />
        <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.md }}>
          {recent.map((it) => (
            <ItemCard
              key={it.id}
              item={it}
              category={getCategory(it.categoryId)}
              pinned={isPinned(it.id)}
              onPress={() => setDetailItem(it)}
              onToggleFavorite={() => toggleFavorite(it.id)}
              onToggleStatus={() => toggleStatus(it.id)}
              onShare={() => shareItem(it)}
              onToggleFocus={() => toggleFocus(it.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating CTA */}
      <Pressable
        onPress={() => setShowAdd(true)}
        style={[styles.fab, theme.shadows.soft, { backgroundColor: theme.colors.accent, bottom: insets.bottom + 78 }]}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>

      {/* Sheets */}
      <AddItemSheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSaved={(item, alsoShare) => {
          if (alsoShare) setShareTarget(item);
        }}
      />
      <AddCategorySheet visible={showAddCategory} onClose={() => setShowAddCategory(false)} />
      <ItemDetailSheet item={detailItem} visible={!!detailItem} onClose={() => setDetailItem(null)} />
      <BottomSheet visible={!!shareTarget} onClose={() => setShareTarget(null)} title="Paylaş" heightRatio={0.6}>
        {shareTarget && <SharePreview item={shareTarget} />}
      </BottomSheet>
    </View>
  );
}

function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <View style={[styles.sectionHeader, { paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.lg }]}>
      <View>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>{title}</Text>
        {subtitle ? <Text style={[styles.sectionSub, { color: theme.colors.textSecondary }]}>{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[styles.sectionAction, { color: theme.colors.accent }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function EmptyHint({ text }: { text: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.empty, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }]}>
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  kicker: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  hero: { fontSize: 26, fontWeight: '800', marginTop: 2 },
  modeBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  sectionSub: { fontSize: 13, fontWeight: '500', marginTop: 2 },
  sectionAction: { fontSize: 14, fontWeight: '700' },
  empty: { padding: 16, borderWidth: 1, borderStyle: 'dashed' },
  emptyText: { fontSize: 14, lineHeight: 20 },
  fab: { position: 'absolute', right: 20, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#FFFFFF', fontSize: 30, fontWeight: '700', marginTop: -2 },
});
