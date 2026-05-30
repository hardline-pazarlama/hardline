/**
 * Small platform chip (YouTube / LinkedIn / Blog / PDF / X) shown on item
 * cards and detail sheets. Icon + optional label.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { PLATFORM_META } from '@/lib/share';
import type { Platform } from '@/lib/types';

export function PlatformBadge({ platform, showLabel = true }: { platform: Platform; showLabel?: boolean }) {
  const { theme } = useTheme();
  const meta = PLATFORM_META[platform];
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.sm },
      ]}
    >
      <Text style={styles.icon}>{meta.icon}</Text>
      {showLabel && (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{meta.label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4 },
  icon: { fontSize: 12 },
  label: { fontSize: 11, fontWeight: '600' },
});
