/**
 * Renders the formatted share snippet inside a "card" preview plus Copy and
 * Share actions. Copy uses expo-clipboard + a toast; Share uses the native
 * dialog via useShare.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { useShare } from '@/hooks/useShare';
import { useToast } from '@/hooks/useToast';
import { Button } from './Button';
import type { Item } from '@/lib/types';

export function SharePreview({ item }: { item: Item }) {
  const { theme } = useTheme();
  const { buildCopy, shareItem } = useShare();
  const toast = useToast();
  const copy = buildCopy(item);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(copy);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toast.show('Paylaşım metni kopyalandı');
  };

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View
        style={[
          styles.preview,
          {
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radius.lg,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.previewText, { color: theme.colors.textPrimary }]}>{copy}</Text>
      </View>

      <View style={styles.actions}>
        <Button label="Kopyala" variant="secondary" icon="⧉" onPress={handleCopy} style={{ flex: 1 }} />
        <Button label="Paylaş" icon="↗" onPress={() => shareItem(item)} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: { padding: 16, borderWidth: 1 },
  previewText: { fontSize: 14, lineHeight: 21, fontFamily: undefined },
  actions: { flexDirection: 'row', gap: 12 },
});
