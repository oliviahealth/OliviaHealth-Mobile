import BackButton from "@/components/BackButton";
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
          options={{ headerLeft: () => <BackButton />, title: "Details" }}
        />
      </Stack>
    </ImageBackground>
  );
}
