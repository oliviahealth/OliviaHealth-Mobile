import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

export default function JourneyLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{ headerLeft: () => <BackButton />, title: "Details" }}
      />
    </Stack>
  );
}
