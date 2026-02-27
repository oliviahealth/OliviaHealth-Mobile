import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";
import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

const backgroundImage = require("../../../assets/images/journey-background.png"); // Adjust path if needed

export default function JourneyLayout() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={StyleSheet.absoluteFill}
      imageStyle={{ resizeMode: "cover" }}
    >
      <Stack
        screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="details/[id]"
          options={{
            header: ({ route }) => {
              const id = (route.params as { id?: string })?.id ?? "Details";
              return <JourneyDetailsHeader islandName={id} />;
            },
          }}
        />
      </Stack>
    </ImageBackground>
  );
}
