/**
 * Onboarding — 4 steps in a single screen with a paged feel:
 *   1) Welcome  2) Role select  3) Workspace name + accent  4) Quick tutorial.
 * On finish we persist the profile (hasOnboarded=true) + accent preference and
 * route to the dashboard. Seed categories already exist from the store hydrate.
 */

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/Button';
import { ACCENTS } from '@/lib/theme/tokens';
import type { AccentKey, UserProfile } from '@/lib/types';

const ROLES: { key: UserProfile['role']; label: string; emoji: string }[] = [
  { key: 'marketing', label: 'Pazarlamacı', emoji: '🎯' },
  { key: 'product', label: 'Ürün', emoji: '🧩' },
  { key: 'academic', label: 'Akademisyen', emoji: '🎓' },
  { key: 'other', label: 'Diğer', emoji: '🌐' },
];

const STEPS = [
  {
    emoji: '🧲',
    title: 'Fikri yakala',
    body: 'Dağınık linkleri tek bir komuta merkezinde topla. WhatsApp, mail, Notion derdine son.',
  },
  {
    emoji: '🗂️',
    title: 'Kategorine yerleştir',
    body: 'Her linki doğru kovaya at, hangi konuda ne kadar kaynağın olduğunu anında gör.',
  },
  {
    emoji: '🚀',
    title: 'Tek dokunuşla paylaş',
    body: 'Otomatik formatlanan paylaşım metniyle ekibine saniyeler içinde aktar.',
  },
];

export default function Onboarding() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setProfile, setPreferences } = useStore();

  const [step, setStep] = useState(0);
  const [role, setRole] = useState<UserProfile['role']>('marketing');
  const [workspace, setWorkspace] = useState('');
  const [accent, setAccent] = useState<AccentKey>('iris');

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    setPreferences({ accent });
    setProfile({
      hasOnboarded: true,
      role,
      workspaceName: workspace.trim() || 'Compilink',
    });
    router.replace('/(tabs)/home');
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background, paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.progress}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i <= step ? theme.colors.accent : theme.colors.border, width: i === step ? 28 : 8 },
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        {step < 3 ? null : null}
        {step === 0 && (
          <Hero emoji={STEPS[0].emoji} title={STEPS[0].title} body={STEPS[0].body} extra="Compilink — bilgi avcıları için kişisel knowledge command center." />
        )}

        {step === 1 && (
          <View style={{ gap: theme.spacing.lg, width: '100%' }}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Kendini anlat</Text>
            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
              Deneyimi rolüne göre uyarlayalım.
            </Text>
            <View style={styles.roleGrid}>
              {ROLES.map((r) => {
                const active = r.key === role;
                return (
                  <Pressable
                    key={r.key}
                    onPress={() => setRole(r.key)}
                    style={[
                      styles.roleCard,
                      {
                        backgroundColor: active ? theme.colors.accentMuted : theme.colors.surface,
                        borderColor: active ? theme.colors.accent : theme.colors.border,
                        borderRadius: theme.radius.lg,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 30 }}>{r.emoji}</Text>
                    <Text style={[styles.roleLabel, { color: theme.colors.textPrimary }]}>{r.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: theme.spacing.lg, width: '100%' }}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>İlk workspace’ini kur</Text>
            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
              İsmini ver, highlight rengini seç. Insight Hub, Growth Benchmarks ve Campaign Ideas senin için hazır.
            </Text>
            <TextInput
              value={workspace}
              onChangeText={setWorkspace}
              placeholder="Örn. Hilmi"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.colors.textPrimary, borderRadius: theme.radius.md, borderColor: theme.colors.border }]}
            />
            <Text style={[styles.body, { color: theme.colors.textSecondary }]}>Highlight rengi</Text>
            <View style={styles.accentRow}>
              {(Object.keys(ACCENTS) as AccentKey[]).map((key) => (
                <Pressable
                  key={key}
                  onPress={() => setAccent(key)}
                  style={[
                    styles.accentSwatch,
                    { backgroundColor: ACCENTS[key][theme.scheme === 'light' ? 'light' : 'dark'] },
                    accent === key && styles.accentActive,
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={{ gap: theme.spacing.lg, width: '100%' }}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Hızlı tur</Text>
            <Tutorial emoji="➕" title="Link ekle" body="Sağ alttaki butonla 10 saniyede yeni link kaydet." />
            <Tutorial emoji="🗂️" title="Kategori gez" body="Rail’den kategoriye dokun, içindeki tüm kaynakları gör." />
            <Tutorial emoji="⭐" title="Favori & okuma listesi" body="Önemli linkleri favorile, Focus Board’a sabitle." />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        {step > 0 ? (
          <Button label="Geri" variant="ghost" onPress={back} style={{ flex: 1 }} />
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {step < 3 ? (
          <Button label="Devam" icon="→" onPress={next} style={{ flex: 2 }} />
        ) : (
          <Button label="Başla" icon="🚀" onPress={finish} style={{ flex: 2 }} />
        )}
      </View>
    </View>
  );
}

function Hero({ emoji, title, body, extra }: { emoji: string; title: string; body: string; extra?: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ alignItems: 'center', gap: theme.spacing.md }}>
      <Text style={{ fontSize: 72 }}>{emoji}</Text>
      <Text style={[styles.title, { color: theme.colors.textPrimary, textAlign: 'center' }]}>{title}</Text>
      <Text style={[styles.body, { color: theme.colors.textSecondary, textAlign: 'center' }]}>{body}</Text>
      {extra ? <Text style={[styles.caption, { color: theme.colors.textSecondary, textAlign: 'center' }]}>{extra}</Text> : null}
    </View>
  );
}

function Tutorial({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.tut, { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, borderColor: theme.colors.border }]}>
      <Text style={{ fontSize: 28 }}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.tutTitle, { color: theme.colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.caption, { color: theme.colors.textSecondary }]}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 24 },
  progress: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 8 },
  dot: { height: 8, borderRadius: 4 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800' },
  body: { fontSize: 16, fontWeight: '500', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  roleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  roleCard: { width: '47%', flexGrow: 1, alignItems: 'center', gap: 8, paddingVertical: 22, borderWidth: 1.5 },
  roleLabel: { fontSize: 15, fontWeight: '700' },
  input: { paddingHorizontal: 14, paddingVertical: 14, fontSize: 16, borderWidth: 1 },
  accentRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  accentSwatch: { width: 44, height: 44, borderRadius: 22, borderWidth: 3, borderColor: 'transparent' },
  accentActive: { borderColor: '#FFFFFF', transform: [{ scale: 1.12 }] },
  tut: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderWidth: 1 },
  tutTitle: { fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: 'row', gap: 12, alignItems: 'center' },
});
