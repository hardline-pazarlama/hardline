/**
 * Entry redirect: send first-time users to onboarding, returning users
 * straight to the dashboard. Store is already hydrated by the root layout.
 */

import { Redirect } from 'expo-router';
import { useStore } from '@/hooks/useStore';

export default function Index() {
  const { profile } = useStore();
  return <Redirect href={profile.hasOnboarded ? '/(tabs)/home' : '/onboarding'} />;
}
