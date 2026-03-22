import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function AboutLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>

  );
}
