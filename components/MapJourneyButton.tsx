import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <TouchableOpacity
      style={[
        styles.container,
        {
          left: x - 55,
          top: y - 55,
        },
      ]}
      onPress={() => router.push(`details/${id}`)}
      activeOpacity={0.85}
    >
      <AnimatedCircularProgress
        size={110}
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  innerCircle: {
    width: 95,
    height: 95,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
});
