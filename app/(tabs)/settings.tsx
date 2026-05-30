/**
 * Settings tab — theme mode, accent color, default sort order, data
 * export/import (JSON to console / clipboard as a placeholder), and a
 * placeholder account row. Mutations write straight through the store, so theme
 * changes apply instantly.
 */

import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/hooks/useStore';
import { useToast } from '@/hooks/useToast';
import { storage } from '@/lib/storage';
import { ACCENTS } from '@/lib/theme/tokens';
import type { AccentKey, SortOrder, ThemeMode } from '@/lib/types';

const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: 'light', label: 'Açık' },
  { key: 'dark', label: 'Koyu' },
  { key: 'system', label: 'Sistem' },
];

const SORT_OPTIONS: { key: SortOrder; label: string }[] = [
  { key: 'recent', label: 'Son eklenen' },
  { key: 'most-read', label: 'En çok okunan' },
];

export default function Settings() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { preferences, setPreferences, profile } = useStore();
  const toast = useToast();

  const handleExport = async () => {
    const data = await storage.exportAll();
    const json = JSON.stringify(data, null, 2);
    await Clipboard.setStringAsync(json);
    toast.show('Veriler JSON olarak kopyalandı');
    if (__DEV__) console.log('[export]', json);
  };

  const handleImport = () => {
    Alert.alert(
      'Veri içe aktar',
      'Bu sürümde içe aktarma JSON yapıştırma akışı için bir yer tutucudur. Gerçek build’de dosya seçici / yapıştırma alanı bağlanacak.',
      [{ text: 'Tamam' }],
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 40, paddingHorizontal: theme.spacing.lg }}
    >
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Ayarlar</Text>

      <Section title="Tema">
        <Segmented
          options={THEME_OPTIONS.map((o) => ({ key: o.key, label: o.label }))}
          value={preferences.themeMode}
          onChange={(k) => setPreferences({ themeMode: k as ThemeMode })}
        />
      </Section>

      <Section title="Accent rengi">
        <View style={styles.accentRow}>
          {(Object.keys(ACCENTS) as AccentKey[]).map((key) => {
            const active = preferences.accent === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPreferences({ accent: key })}
                style={[
                  styles.accentSwatch,
                  { backgroundColor: ACCENTS[key][theme.scheme === 'light' ? 'light' : 'dark'] },
                  active && styles.accentActive,
                ]}
              >
                {active && <Text style={styles.accentCheck}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      </Section>

      <Section title="Varsayılan sıralama">
        <Segmented
          options={SORT_OPTIONS.map((o) => ({ key: o.key, label: o.label }))}
          value={preferences.sortOrder}
          onChange={(k) => setPreferences({ sortOrder: k as SortOrder })}
        />
      </Section>

      <Section title="Veri">
        <Row label="Dışa aktar (JSON)" sub="Tüm kategori ve linkleri panoya kopyala" onPress={handleExport} icon="⬆️" />
        <Row label="İçe aktar" sub="JSON’dan geri yükle (yer tutucu)" onPress={handleImport} icon="⬇️" />
      </Section>

      <Section title="Hesap">
        <Row label={profile.workspaceName} sub={`Rol: ${profile.role}`} icon="👤" />
        <Row
          label="Compilink hakkında"
          sub="v1.0.0 — knowledge command center"
          icon="ℹ️"
        />
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginTop: theme.spacing.lg, gap: theme.spacing.sm }}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>{title.toUpperCase()}</Text>
      <View style={{ gap: theme.spacing.sm }}>{children}</View>
    </View>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  const { theme } = useTheme();
  return (
    <View style={[styles.segment, { backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.md }]}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[
              styles.segmentItem,
              { borderRadius: theme.radius.sm },
              active && { backgroundColor: theme.colors.surface, ...theme.shadows.subtle },
            ]}
          >
            <Text style={[styles.segmentText, { color: active ? theme.colors.accent : theme.colors.textSecondary }]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Row({ label, sub, icon, onPress }: { label: string; sub?: string; icon?: string; onPress?: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, borderColor: theme.colors.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      {icon ? <Text style={{ fontSize: 20 }}>{icon}</Text> : null}
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, { color: theme.colors.textPrimary }]}>{label}</Text>
        {sub ? <Text style={[styles.rowSub, { color: theme.colors.textSecondary }]}>{sub}</Text> : null}
      </View>
      {onPress ? <Text style={{ color: theme.colors.textSecondary, fontSize: 18 }}>›</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800' },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.6 },
  segment: { flexDirection: 'row', padding: 4, gap: 4 },
  segmentItem: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  segmentText: { fontSize: 14, fontWeight: '700' },
  accentRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  accentSwatch: { width: 44, height: 44, borderRadius: 22, borderWidth: 3, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  accentActive: { borderColor: '#FFFFFF', transform: [{ scale: 1.1 }] },
  accentCheck: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderWidth: 1 },
  rowLabel: { fontSize: 15, fontWeight: '700' },
  rowSub: { fontSize: 13, marginTop: 2 },
});
