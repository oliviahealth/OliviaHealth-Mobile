import { loadAiConsent } from "@/src/store/useAppStore";
import { loadSavedConversations } from "@/src/store/useConversationsStores";
import useResourcesStore, {
  fetchResources
} from "@/src/store/useResourcesStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ErrorPopup from "@/components/ErrorPopup";

SplashScreen.preventAutoHideAsync();

const MIN_SPLASH_TIME = 1000;

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  const resources = useResourcesStore((state) => state.resources);
  const setResources = useResourcesStore((state) => state.setResources);

  useEffect(() => {
    if (resources) {
      setIsReady(true);
      SplashScreen.hideAsync();
    }

    async function prepare() {
      const startTime = Date.now();
      try {
        // Fetch resources
        await fetchResources()

      } catch (e) {
        console.error("Failed to fetch resources", e);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
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
    loadAiConsent();
    loadSavedConversations();
  }, [setResources]); // do not include resources in the dependency array. this will cause this to fetch infinitly

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    // keep showing splash screen
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <View
            style={{ flex: 1, backgroundColor: "transparent" }}
            onLayout={onLayoutRootView}
          >
            <StatusBar barStyle="dark-content" />
            <ErrorPopup
              message="Something went wrong. Please try again later"
              visible={isError}
            />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </View>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
