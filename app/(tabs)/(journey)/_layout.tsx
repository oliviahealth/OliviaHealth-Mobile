import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="details/[id]"
      />
    </Stack>
  );
}
