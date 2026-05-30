/**
 * Item detail bottom sheet. Title + meta, note + manual summary bullets, and
 * actions: open URL, favorite, status, and the embedded SharePreview.
 */

import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useItems } from '@/hooks/useItems';
import { useCategories } from '@/hooks/useCategories';
import { useFocusBoard } from '@/hooks/useFocusBoard';
import { BottomSheet } from './BottomSheet';
import { PlatformBadge } from './PlatformBadge';
import { Button } from './Button';
import { SharePreview } from './SharePreview';
import type { Item } from '@/lib/types';

export function ItemDetailSheet({
  item,
  visible,
  onClose,
}: {
  item: Item | null;
  visible: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const { getCategory } = useCategories();
  const { toggleFavorite, toggleStatus } = useItems();
  const { isPinned, toggleFocus, atCapacity } = useFocusBoard();

  if (!item) return null;
  const category = getCategory(item.categoryId);
  const pinned = isPinned(item.id);
  const date = new Date(item.addedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <BottomSheet visible={visible} onClose={onClose} heightRatio={0.9}>
      <View style={{ gap: theme.spacing.md }}>
        <View style={styles.metaRow}>
          <PlatformBadge platform={item.platform} />
          {category && (
            <View style={[styles.tag, { backgroundColor: theme.colors.accentMuted }]}>
              <Text style={[styles.tagText, { color: theme.colors.accent }]}>
                {category.emoji} {category.name}
              </Text>
            </View>
          )}
          <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{date}</Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>

        <Pressable onPress={() => Linking.openURL(item.url)}>
          <Text style={[styles.url, { color: theme.colors.accent }]} numberOfLines={1}>
            🔗 {item.url}
          </Text>
        </Pressable>

        {item.note ? (
          <Section title="Not">
            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{item.note}</Text>
          </Section>
        ) : null}

        {item.summary && item.summary.length > 0 ? (
          <Section title="Özet">
            {item.summary.map((s, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, { color: theme.colors.accent }]}>•</Text>
                <Text style={[styles.body, { color: theme.colors.textSecondary, flex: 1 }]}>{s}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        <View style={styles.actionRow}>
          <Button label="Linki aç" icon="↗" onPress={() => Linking.openURL(item.url)} style={{ flex: 1 }} />
          <Button
            label={item.isFavorite ? '★' : '☆'}
            variant="secondary"
            onPress={() => toggleFavorite(item.id)}
            style={{ width: 56 }}
          />
        </View>

        <View style={styles.actionRow}>
          <Button
            label={item.status === 'done' ? 'Okundu ✓' : item.status === 'in-progress' ? 'Okunuyor' : 'Okunmadı'}
            variant="secondary"
            onPress={() => toggleStatus(item.id)}
            style={{ flex: 1 }}
          />
          <Button
            label={pinned ? 'Focus’tan çıkar' : 'Focus’a ekle'}
            variant={pinned ? 'ghost' : 'secondary'}
            disabled={!pinned && atCapacity}
            onPress={() => toggleFocus(item.id)}
            style={{ flex: 1 }}
          />
        </View>

        <Section title="Paylaş">
          <SharePreview item={item} />
        </Section>
      </View>
    </BottomSheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 12, fontWeight: '500', marginLeft: 'auto' },
  title: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  url: { fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bulletDot: { fontSize: 16, lineHeight: 22 },
  actionRow: { flexDirection: 'row', gap: 12 },
});
