/**
 * Categories tab — a vertical list of every category with emoji, name,
 * description, item count and a read-progress bar. "+" in the header creates a
 * new category.
 */

import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { useItems } from '@/hooks/useItems';
import { AddCategorySheet } from '@/components/AddCategorySheet';

export default function Categories() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { categories, counts } = useCategories();
  const { items } = useItems();
  const [showAdd, setShowAdd] = useState(false);

  const readCount = (categoryId: string) =>
    items.filter((i) => i.categoryId === categoryId && i.status === 'done').length;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 40, paddingHorizontal: theme.spacing.lg }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Kategoriler</Text>
          <Pressable
            onPress={() => setShowAdd(true)}
            style={[styles.addBtn, { backgroundColor: theme.colors.accent }]}
          >
            <Text style={styles.addText}>＋</Text>
          </Pressable>
        </View>

        <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.md }}>
          {categories.map((cat) => {
            const total = counts[cat.id] ?? 0;
            const read = readCount(cat.id);
            const progress = total > 0 ? read / total : 0;
            return (
              <Pressable
                key={cat.id}
                onPress={() => router.push(`/category/${cat.id}`)}
                style={({ pressed }) => [
                  styles.card,
                  theme.shadows.subtle,
                  {
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius.lg,
                    borderLeftColor: cat.color,
                    opacity: pressed ? 0.95 : 1,
                  },
                ]}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.iconWrap, { backgroundColor: cat.color + '22' }]}>
                    <Text style={{ fontSize: 26 }}>{cat.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>{cat.name}</Text>
                    {cat.description ? (
                      <Text style={[styles.cardDesc, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                        {cat.description}
                      </Text>
                    ) : null}
                  </View>
                  <View style={[styles.countBadge, { backgroundColor: theme.colors.surfaceAlt }]}>
                    <Text style={[styles.countText, { color: theme.colors.textPrimary }]}>{total}</Text>
                  </View>
                </View>

                <View style={[styles.progressTrack, { backgroundColor: theme.colors.surfaceAlt }]}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: cat.color }]} />
                </View>
                <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                  {read}/{total} okundu
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <AddCategorySheet visible={showAdd} onClose={() => setShowAdd(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 28, fontWeight: '800' },
  addBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: -2 },
  card: { padding: 16, borderLeftWidth: 4, gap: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  cardDesc: { fontSize: 13, marginTop: 2 },
  countBadge: { minWidth: 32, height: 28, paddingHorizontal: 8, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  countText: { fontSize: 14, fontWeight: '700' },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  progressLabel: { fontSize: 12, fontWeight: '600' },
});
