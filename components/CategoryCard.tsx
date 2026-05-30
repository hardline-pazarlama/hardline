/**
 * Category tile for the horizontal rail. 120px wide, 16px radius, gradient
 * overlay derived from the category's own color, emoji + item-count badge.
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import type { Category } from '@/lib/types';

/** Add slight transparency to a hex color for the gradient stops. */
function withAlpha(hex: string, alpha: number) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

export function CategoryCard({
  category,
  count,
  onPress,
}: {
  category: Category;
  count: number;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
    >
      <LinearGradient
        colors={[withAlpha(category.color, 0.9), withAlpha(category.color, 0.55)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, theme.shadows.subtle, { borderRadius: theme.radius.lg }]}
      >
        <View style={styles.top}>
          <Text style={styles.emoji}>{category.emoji}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {category.name}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 120, height: 120, padding: 14, justifyContent: 'space-between' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  emoji: { fontSize: 26 },
  badge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  name: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
