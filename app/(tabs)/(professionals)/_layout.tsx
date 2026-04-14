import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LibraryLayout() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="topics/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
