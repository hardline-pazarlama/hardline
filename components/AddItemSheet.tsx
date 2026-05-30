/**
 * Add-item flow. URL → "Başlığı yakala" (simulated metadata fetch) → editable
 * title, note/summary, category chips (with inline "Yeni kategori"), platform
 * override, and a "Kaydet ve paylaş" path that opens the share sheet on save.
 */

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { useItems } from '@/hooks/useItems';
import { useCategories } from '@/hooks/useCategories';
import { useToast } from '@/hooks/useToast';
import { fetchMetadata, inferPlatform } from '@/lib/mockData';
import { PLATFORM_META } from '@/lib/share';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { AddCategorySheet } from './AddCategorySheet';
import type { Item, Platform } from '@/lib/types';

const PLATFORMS: Platform[] = ['web', 'youtube', 'linkedin', 'x', 'pdf'];

export function AddItemSheet({
  visible,
  onClose,
  defaultCategoryId,
  onSaved,
}: {
  visible: boolean;
  onClose: () => void;
  defaultCategoryId?: string;
  /** Called after save; receives the new item so the caller can open Share. */
  onSaved?: (item: Item, alsoShare: boolean) => void;
}) {
  const { theme } = useTheme();
  const { addItem } = useItems();
  const { categories } = useCategories();
  const toast = useToast();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [platform, setPlatform] = useState<Platform>('web');
  const [categoryId, setCategoryId] = useState(defaultCategoryId ?? categories[0]?.id ?? '');
  const [fetching, setFetching] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Keep the default selection in sync when opened from a category screen.
  React.useEffect(() => {
    if (visible) setCategoryId(defaultCategoryId ?? categories[0]?.id ?? '');
  }, [visible, defaultCategoryId, categories]);

  const reset = () => {
    setUrl('');
    setTitle('');
    setNote('');
    setPlatform('web');
  };

  const handleCapture = async () => {
    if (!url.trim()) return;
    setFetching(true);
    setPlatform(inferPlatform(url));
    const meta = await fetchMetadata(url.trim());
    setTitle((prev) => prev || meta.title);
    setPlatform(meta.platform);
    setFetching(false);
    await Haptics.selectionAsync();
  };

  const save = (alsoShare: boolean) => {
    if (!url.trim() || !categoryId) return;
    const item = addItem({
      title: title.trim() || url.trim(),
      url: url.trim(),
      categoryId,
      platform,
      note: note.trim() || undefined,
    });
    toast.show('Link eklendi');
    reset();
    onSaved?.(item, alsoShare);
    onClose();
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.textPrimary, borderRadius: theme.radius.md },
  ];

  const canSave = Boolean(url.trim() && categoryId);

  return (
    <>
      <BottomSheet visible={visible} onClose={onClose} title="Yeni link ekle" heightRatio={0.92}>
        <View style={{ gap: theme.spacing.md }}>
          <Field label="URL">
            <View style={styles.urlRow}>
              <TextInput
                value={url}
                onChangeText={setUrl}
                placeholder="https://..."
                placeholderTextColor={theme.colors.textSecondary}
                autoCapitalize="none"
                keyboardType="url"
                style={[inputStyle, { flex: 1 }]}
              />
              <Button label="Yakala" variant="secondary" loading={fetching} onPress={handleCapture} />
            </View>
          </Field>

          <Field label="Başlık">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Başlığı düzenle"
              placeholderTextColor={theme.colors.textSecondary}
              style={inputStyle}
            />
          </Field>

          <Field label="Not / Özet">
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Kısa not veya özet ekle"
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              style={[inputStyle, { minHeight: 72, textAlignVertical: 'top' }]}
            />
          </Field>

          <Field label="Kategori">
            <View style={styles.chips}>
              {categories.map((c) => {
                const active = c.id === categoryId;
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => setCategoryId(c.id)}
                    style={[
                      styles.chip,
                      { backgroundColor: active ? theme.colors.accent : theme.colors.surfaceAlt, borderRadius: theme.radius.pill },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: active ? '#FFFFFF' : theme.colors.textSecondary }]}>
                      {c.emoji} {c.name}
                    </Text>
                  </Pressable>
                );
              })}
              <Pressable
                onPress={() => setShowAddCategory(true)}
                style={[styles.chip, { borderRadius: theme.radius.pill, borderWidth: 1.5, borderStyle: 'dashed', borderColor: theme.colors.border }]}
              >
                <Text style={[styles.chipText, { color: theme.colors.accent }]}>＋ Yeni kategori</Text>
              </Pressable>
            </View>
          </Field>

          <Field label="Platform">
            <View style={styles.chips}>
              {PLATFORMS.map((p) => {
                const active = p === platform;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPlatform(p)}
                    style={[
                      styles.chip,
                      { backgroundColor: active ? theme.colors.accentMuted : theme.colors.surfaceAlt, borderRadius: theme.radius.pill },
                      active && { borderWidth: 1, borderColor: theme.colors.accent },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: active ? theme.colors.accent : theme.colors.textSecondary }]}>
                      {PLATFORM_META[p].icon} {PLATFORM_META[p].label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Field>

          <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
            <Button label="Kaydet" icon="✓" fullWidth disabled={!canSave} onPress={() => save(false)} />
            <Button label="Kaydet ve paylaş" variant="secondary" icon="↗" fullWidth disabled={!canSave} onPress={() => save(true)} />
          </View>
        </View>
      </BottomSheet>

      <AddCategorySheet
        visible={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onCreated={(id) => setCategoryId(id)}
      />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  label: { fontSize: 13, fontWeight: '600' },
  urlRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { fontSize: 13, fontWeight: '600' },
});
