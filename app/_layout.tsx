import useResourcesStore, { AsyncStorageKeys, IResources, loadSavedResources } from "@/src/store/useResourcesStore";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./Welcome";

SplashScreen.preventAutoHideAsync();

const resources_url = "https://oliviahealth.org/wp-content/uploads/resources.json";
const MIN_SPLASH_TIME = 1000;

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  const [isReady, setIsReady] = useState(false);
  const resources = useResourcesStore(state => state.resources);
  const setResources = useResourcesStore(state => state.setResources);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageKeys.FIRST_LAUNCH);
        if (value === null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };
    checkFirstLaunch();
  }, []);


  useEffect(() => {
    if (resources) {
      setIsReady(true);
      SplashScreen.hideAsync();
    };

    async function prepare() {
      const startTime = Date.now();
      try {
        // Fetch resources
        const res = await fetch(resources_url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const resources: IResources = await res.json();

        setResources(resources);

        // Load saved resources from AsyncStorage
        await loadSavedResources();

      } catch (e) {
        console.error("Failed to fetch resources", e);
      } finally {
        // show the splash screen for a minimum of MIN_SPLASH_TIME even if the fetch completes faster
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(MIN_SPLASH_TIME - elapsed, 0);
        setTimeout(async () => {
          setIsReady(true);
          await SplashScreen.hideAsync();
        }, remaining);
      }
    }
    prepare();
  }, [setResources]); // do not include resources in the dependency array. this will cause this to fetch infinitly

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    // keep showing splash screen
    return null;
  }

  if (isFirstLaunch) {
    return <WelcomeScreen />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']} onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}