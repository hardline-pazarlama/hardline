/**
 * Item card — full width, 12px radius, left accent border keyed to the parent
 * category color. Shows platform badge, title, category tag, note snippet, and
 * the Oku / Favori / Paylaş quick actions plus an optional "Öncelikli Oku"
 * focus toggle.
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { PlatformBadge } from './PlatformBadge';
import type { Category, Item } from '@/lib/types';

const STATUS_LABEL: Record<Item['status'], string> = {
  new: 'Okunmadı',
  'in-progress': 'Okunuyor',
  done: 'Okundu',
};

export function ItemCard({
  item,
  category,
  pinned,
  onPress,
  onToggleFavorite,
  onToggleStatus,
  onShare,
  onToggleFocus,
}: {
  item: Item;
  category?: Category;
  pinned?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  onToggleStatus?: () => void;
  onShare?: () => void;
  onToggleFocus?: () => void;
}) {
  const { theme } = useTheme();
  const accent = category?.color ?? theme.colors.accent;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        theme.shadows.subtle,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          borderLeftColor: accent,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <PlatformBadge platform={item.platform} />
        <View style={styles.statusWrap}>
          <View style={[styles.statusDot, { backgroundColor: item.status === 'done' ? theme.colors.success : item.status === 'in-progress' ? accent : theme.colors.border }]} />
          <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>{STATUS_LABEL[item.status]}</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: theme.colors.textPrimary }]} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.metaRow}>
        {category && (
          <View style={[styles.tag, { backgroundColor: theme.colors.accentMuted }]}>
            <Text style={[styles.tagText, { color: theme.colors.accent }]}>
              {category.emoji} {category.name}
            </Text>
          </View>
        )}
      </View>

      {item.note ? (
        <Text style={[styles.note, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {item.note}
        </Text>
      ) : null}

      <View style={[styles.actions, { borderTopColor: theme.colors.border }]}>
        <Action label={item.status === 'done' ? '✓ Okundu' : 'Oku'} active={item.status === 'done'} onPress={onToggleStatus} />
        <Action label={item.isFavorite ? '★ Favori' : '☆ Favori'} active={item.isFavorite} onPress={onToggleFavorite} />
        <Action label="Paylaş" onPress={onShare} />
      </View>

      {onToggleFocus && (
        <Pressable onPress={onToggleFocus} style={styles.focusRow} hitSlop={6}>
          <View
            style={[
              styles.checkbox,
              { borderColor: accent, backgroundColor: pinned ? accent : 'transparent' },
            ]}
          >
            {pinned && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={[styles.focusText, { color: theme.colors.textSecondary }]}>Öncelikli Oku</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

function Action({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.action, { opacity: pressed ? 0.6 : 1 }]} hitSlop={6}>
      <Text style={[styles.actionText, { color: active ? theme.colors.accent : theme.colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, borderLeftWidth: 4, gap: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '700', lineHeight: 21 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  note: { fontSize: 13, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: 18, borderTopWidth: 1, paddingTop: 10, marginTop: 2 },
  action: {},
  actionText: { fontSize: 13, fontWeight: '600' },
  focusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  checkbox: { width: 18, height: 18, borderRadius: 5, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  focusText: { fontSize: 12, fontWeight: '600' },
});
