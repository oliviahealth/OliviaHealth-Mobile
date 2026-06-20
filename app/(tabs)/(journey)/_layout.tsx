import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="journey"
      />
      <Stack.Screen
        name="details/[id]"
      />
      <Stack.Screen
        name="details/[id]/resources"
      />
    </Stack>
  );
}
