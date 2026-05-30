/**
 * Compact stat strip used in the dashboard hero: total items, today's
 * captures, and unread count.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export function StatsWidget({
  stats,
}: {
  stats: { label: string; value: number | string }[];
}) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {stats.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 && <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />}
          <View style={styles.cell}>
            <Text style={[styles.value, { color: theme.colors.accent }]}>{s.value}</Text>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{s.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', borderWidth: 1, paddingVertical: 14 },
  cell: { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, marginVertical: 4 },
  value: { fontSize: 22, fontWeight: '800' },
  label: { fontSize: 12, fontWeight: '600' },
});
