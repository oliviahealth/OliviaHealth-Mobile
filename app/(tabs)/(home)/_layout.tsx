import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

export default function HomeLayout() {

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="video-spotlights" 
        options={{ title: 'Video Spotlights', headerLeft: () => <BackButton /> }}
      />
      <Stack.Screen 
        name="local-resources" 
        options={{ title: 'Local Resources', headerLeft: () => <BackButton /> }}
      />
      <Stack.Screen 
        name="quick-tips" 
        options={{ title: 'Quick Tips', headerLeft: () => <BackButton /> }}
      />
      <Stack.Screen 
        name="infographics" 
        options={{ title: 'Infographics', headerLeft: () => <BackButton /> }}
      />
    </Stack>
  );
}
