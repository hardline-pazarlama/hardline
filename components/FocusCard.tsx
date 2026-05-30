/**
 * Focus Board row — a checkbox list entry for "read this today". Checking it
 * marks the item done (and animates), unchecking reverts to in-progress.
 */

import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { PlatformBadge } from './PlatformBadge';
import type { Item } from '@/lib/types';

export function FocusCard({
  item,
  onToggleDone,
  onRemove,
  onPress,
}: {
  item: Item;
  onToggleDone?: () => void;
  onRemove?: () => void;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  const done = item.status === 'done';
  const scale = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.18, useNativeDriver: true, speed: 40 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30 }),
    ]).start();
    onToggleDone?.();
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, borderColor: theme.colors.border }]}
    >
      <Pressable onPress={handleToggle} hitSlop={8}>
        <Animated.View
          style={[
            styles.checkbox,
            {
              borderColor: theme.colors.accent,
              backgroundColor: done ? theme.colors.accent : 'transparent',
              transform: [{ scale }],
            },
          ]}
        >
          {done && <Text style={styles.check}>✓</Text>}
        </Animated.View>
      </Pressable>

      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, textDecorationLine: done ? 'line-through' : 'none', opacity: done ? 0.6 : 1 },
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View style={styles.meta}>
          <PlatformBadge platform={item.platform} showLabel={false} />
          <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
            {done ? 'Tamamlandı' : 'Bugün oku'}
          </Text>
        </View>
      </View>

      {onRemove && (
        <Pressable onPress={onRemove} hitSlop={8}>
          <Text style={[styles.remove, { color: theme.colors.textSecondary }]}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  check: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  body: { flex: 1, gap: 4 },
  title: { fontSize: 15, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, fontWeight: '500' },
  remove: { fontSize: 14, fontWeight: '700', paddingHorizontal: 4 },
});
