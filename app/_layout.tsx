/**
 * Root layout. Composition order matters:
 *   SafeAreaProvider → StoreProvider (hydrates persisted state)
 *     → ThemeProvider (reads prefs from the store)
 *       → ToastProvider (needs theme) → navigation Stack.
 *
 * We hold the splash until the store has hydrated so the first paint already
 * has the correct theme + onboarding decision (no flash of wrong screen).
 */

import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider, useStore } from '@/hooks/useStore';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { ToastProvider } from '@/hooks/useToast';

function Navigator() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="category/[id]" />
        <Stack.Screen name="item/[id]" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}

function ThemedApp() {
  const { preferences, hydrated } = useStore();

  return (
    <ThemeProvider mode={preferences.themeMode} accent={preferences.accent}>
      <ToastProvider>{hydrated ? <Navigator /> : <Splash />}</ToastProvider>
    </ThemeProvider>
  );
}

function Splash() {
  const { theme } = useTheme();
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
          <ThemedApp />
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
