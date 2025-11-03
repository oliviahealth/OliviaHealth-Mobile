import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.setOptions({
  duration: 3000,
  fade: false
})

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
