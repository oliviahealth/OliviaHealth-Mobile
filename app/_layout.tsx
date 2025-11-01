import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 2000,
  fade: false
})

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
