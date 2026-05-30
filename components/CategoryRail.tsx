/**
 * Horizontal, scrollable rail of CategoryCards. The first tile is an
 * "Inline Add" (+) affordance per the dashboard spec.
 */

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { CategoryCard } from './CategoryCard';
import type { Category } from '@/lib/types';

export function CategoryRail({
  categories,
  counts,
  onSelect,
  onAdd,
}: {
  categories: Category[];
  counts: Record<string, number>;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  const { theme } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.md }}
    >
      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.add,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <View style={[styles.plus, { backgroundColor: theme.colors.accentMuted }]}>
          <Text style={[styles.plusText, { color: theme.colors.accent }]}>＋</Text>
        </View>
        <Text style={[styles.addLabel, { color: theme.colors.textSecondary }]}>Yeni{'\n'}kategori</Text>
      </Pressable>

      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} count={counts[cat.id] ?? 0} onPress={() => onSelect(cat.id)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  add: {
    width: 120,
    height: 120,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    padding: 14,
    justifyContent: 'space-between',
  },
  plus: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  plusText: { fontSize: 22, fontWeight: '700', marginTop: -2 },
  addLabel: { fontSize: 13, fontWeight: '600' },
});
