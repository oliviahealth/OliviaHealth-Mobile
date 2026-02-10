import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Journey" }} />
      <Stack.Screen
        name="details/[id]"
        options={{ headerTitle: "Resource Details" }}
      />
    </Stack>
  );
}
