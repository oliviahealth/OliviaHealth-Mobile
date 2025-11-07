import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="quick-tips" options={{ title: 'Quick Tips' }} />
    </Stack>
  );
}
