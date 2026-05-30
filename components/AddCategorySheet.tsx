/**
 * Create-category sheet: name, emoji picker, optional description, color
 * swatch. Returns the created category id via onCreated so callers can
 * immediately select it (used by the inline "Yeni kategori" flow in Add Item).
 */

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { useToast } from '@/hooks/useToast';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

const EMOJIS = ['🧠', '📈', '🎯', '🔧', '🤖', '✨', '📊', '📚', '💡', '🔥', '🌍', '🎨'];
const COLORS = ['#6A5ACD', '#FFB347', '#2F95DC', '#00B894', '#E5547C', '#9B5DE5', '#F25F5C', '#2EC4B6'];

export function AddCategorySheet({
  visible,
  onClose,
  onCreated,
}: {
  visible: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
}) {
  const { theme } = useTheme();
  const { addCategory } = useCategories();
  const toast = useToast();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [description, setDescription] = useState('');

  const reset = () => {
    setName('');
    setEmoji(EMOJIS[0]);
    setColor(COLORS[0]);
    setDescription('');
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const cat = addCategory({ name: name.trim(), emoji, color, description: description.trim() || undefined });
    toast.show('Kategori oluşturuldu');
    reset();
    onCreated?.(cat.id);
    onClose();
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: theme.colors.surfaceAlt, color: theme.colors.textPrimary, borderRadius: theme.radius.md },
  ];

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Yeni kategori" heightRatio={0.8}>
      <View style={{ gap: theme.spacing.md }}>
        <Field label="İsim">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Örn. Growth Benchmarks"
            placeholderTextColor={theme.colors.textSecondary}
            style={inputStyle}
          />
        </Field>

        <Field label="Emoji">
          <View style={styles.swatchWrap}>
            {EMOJIS.map((e) => (
              <Pressable
                key={e}
                onPress={() => setEmoji(e)}
                style={[
                  styles.emoji,
                  { backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.md },
                  emoji === e && { borderColor: theme.colors.accent, borderWidth: 2 },
                ]}
              >
                <Text style={{ fontSize: 22 }}>{e}</Text>
              </Pressable>
            ))}
          </View>
        </Field>

        <Field label="Renk">
          <View style={styles.swatchWrap}>
            {COLORS.map((c) => (
              <Pressable
                key={c}
                onPress={() => setColor(c)}
                style={[styles.color, { backgroundColor: c }, color === c && styles.colorActive]}
              />
            ))}
          </View>
        </Field>

        <Field label="Açıklama (opsiyonel)">
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Bu kategoride ne toplanıyor?"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            style={[inputStyle, { minHeight: 64, textAlignVertical: 'top' }]}
          />
        </Field>

        <Button label="Kategoriyi kaydet" icon="＋" fullWidth disabled={!name.trim()} onPress={handleSave} />
      </View>
    </BottomSheet>
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
  swatchWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emoji: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  color: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'transparent' },
  colorActive: { borderColor: '#FFFFFF', transform: [{ scale: 1.12 }] },
});
