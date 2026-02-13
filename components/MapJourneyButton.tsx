import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface MapJourneyButtonProps {
  x: number;
  y: number;
  progress: number; // 0-100
  borderColor: string;
  fillColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  id: string;
}

const BUTTON_SIZE = 110;

export const MapJourneyButton: React.FC<MapJourneyButtonProps> = ({
  x,
  y,
  progress,
  borderColor,
  fillColor,
  icon,
  id,
}) => {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            left: x - BUTTON_SIZE / 2,
            top: y - BUTTON_SIZE / 2,
          },
        ]}
        onPress={() => router.push(`details/${id}`)} // If this errors, ignore it, it leads to a proper route
        activeOpacity={0.85}
      >
        <AnimatedCircularProgress
          size={BUTTON_SIZE}
          width={8}
          fill={progress}
          tintColor={borderColor}
          backgroundColor={fillColor}
          lineCap="round"
          style={StyleSheet.absoluteFill}
          rotation={0}
        />
        <View style={[styles.innerCircle, { backgroundColor: fillColor }]}>
          <Ionicons name={icon} size={48} color={borderColor} />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          position: "absolute",
          left: x - BUTTON_SIZE / 2,
          top: y + 60,
          fontWeight: "bold",
          color: borderColor,
          textAlign: "center",
          width: BUTTON_SIZE,
        }}
      >
        {id}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  innerCircle: {
    width: BUTTON_SIZE * 0.8636, // 95/110
    height: BUTTON_SIZE * 0.8636,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
});
