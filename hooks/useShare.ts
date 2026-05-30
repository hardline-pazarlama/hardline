/**
 * Sharing helpers: builds the formatted snippet and drives both the native
 * Share dialog and clipboard copy (with haptic + console feedback).
 */

import { useCallback } from 'react';
import { Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { generateShareCopy } from '@/lib/share';
import { useStore } from './useStore';
import { useCategories } from './useCategories';
import type { Item } from '@/lib/types';

export function useShare() {
  const { profile } = useStore();
  const { getCategory } = useCategories();

  const buildCopy = useCallback(
    (item: Item) => generateShareCopy(item, getCategory(item.categoryId), profile.workspaceName),
    [getCategory, profile.workspaceName],
  );

  const shareItem = useCallback(
    async (item: Item) => {
      const message = buildCopy(item);
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await Share.share({ message, url: item.url, title: item.title });
      } catch (err) {
        if (__DEV__) console.warn('[share] failed', err);
      }
    },
    [buildCopy],
  );

  return { buildCopy, shareItem };
}
