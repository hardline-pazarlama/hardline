/**
 * Reusable bottom sheet built on RN `Modal`. Slides up to ~90% height, dims +
 * (lightly) blurs the background, exposes a drag indicator and taps-to-dismiss
 * on the backdrop. Content scrolls within.
 *
 * We deliberately avoid a gesture library dependency for the drag-to-close so
 * the sheet works identically on web; the indicator is a visual affordance and
 * the backdrop handles dismissal.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  heightRatio = 0.9,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  heightRatio?: number;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const translate = useRef(new Animated.Value(40)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(translate, { toValue: 0, useNativeDriver: true, bounciness: 4 }),
      ]).start();
    } else {
      fade.setValue(0);
      translate.setValue(40);
    }
  }, [visible, fade, translate]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fade }]}>
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.overlay }]}
            onPress={onClose}
          />
        </Animated.View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.kav}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.sheet,
              theme.shadows.soft,
              {
                backgroundColor: theme.colors.surface,
                borderTopLeftRadius: theme.radius.xl,
                borderTopRightRadius: theme.radius.xl,
                maxHeight: `${heightRatio * 100}%`,
                paddingBottom: insets.bottom + theme.spacing.lg,
                transform: [{ translateY: translate }],
              },
            ]}
          >
            <View style={[styles.handle, { backgroundColor: theme.colors.border }]} />
            {title ? (
              <Text style={[styles.title, theme.typography.headline, { color: theme.colors.textPrimary }]}>
                {title}
              </Text>
            ) : null}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.sm }}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  kav: { justifyContent: 'flex-end' },
  sheet: { width: '100%', paddingTop: 10 },
  handle: { width: 44, height: 5, borderRadius: 999, alignSelf: 'center', marginBottom: 12 },
  title: { paddingHorizontal: 24, marginBottom: 4 },
});
