/**
 * Share-copy generation. Pure functions so they're trivially testable and can
 * be reused by both the in-app SharePreview and the native Share sheet.
 */

import type { Category, Item, Platform } from './types';

export const PLATFORM_META: Record<Platform, { label: string; icon: string }> = {
  web: { label: 'Blog', icon: '🌐' },
  youtube: { label: 'YouTube', icon: '▶️' },
  linkedin: { label: 'LinkedIn', icon: '💼' },
  x: { label: 'X', icon: '𝕏' },
  pdf: { label: 'PDF', icon: '📄' },
};

/**
 * Builds the formatted snippet shown in the Share sheet preview and copied to
 * the clipboard / passed to the OS share dialog.
 *
 * [Kategori Emojisi] Title
 * 🔗 URL
 * ✍️ Note / Summary
 * CTA: "Bunu {workspace}'in Compilink'inden ekledim."
 */
export function generateShareCopy(
  item: Item,
  category?: Category,
  workspaceName = 'Compilink',
): string {
  const emoji = category?.emoji ?? '🔗';
  const lines: string[] = [];

  lines.push(`${emoji} ${item.title}`);
  lines.push(`🔗 ${item.url}`);

  const noteOrSummary =
    item.summary && item.summary.length > 0
      ? item.summary.map((s) => `• ${s}`).join('\n')
      : item.note;

  if (noteOrSummary) {
    lines.push(`✍️ ${noteOrSummary}`);
  }

  lines.push('');
  lines.push(`Bunu ${workspaceName}'in Compilink'inden ekledim.`);

  return lines.join('\n');
}
