/**
 * Item detail as a full route (modal presentation). This is the fallback path
 * for deep links / when the in-place bottom sheet isn't available — it reuses
 * the exact same ItemDetailSheet component so behavior stays consistent.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useItems } from '@/hooks/useItems';
import { ItemDetailSheet } from '@/components/ItemDetailSheet';

export default function ItemRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const router = useRouter();
  const { getItem } = useItems();
  const item = getItem(id) ?? null;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.overlay }]}>
      {item ? (
        <ItemDetailSheet item={item} visible onClose={() => router.back()} />
      ) : (
        <View style={styles.center}>
          <Text style={{ color: '#FFFFFF' }}>İçerik bulunamadı.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
