import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface MapJourneyButtonProps {
  x: number;
  y: number;
  progress: number;
  borderColor: string;
  fillColor: string;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
  id: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const BUTTON_SIZE = 110;
const INNER_CIRCLE_SIZE = BUTTON_SIZE * 0.82;
const PROGRESS_RING_WIDTH = 8;

export const MapJourneyButton: React.FC<MapJourneyButtonProps> = ({
  x,
  y,
  progress,
  borderColor,
  fillColor,
  Icon,
  id,
  setModalState,
}) => {
  const trackColor = borderColor + "33"; // 20% opacity of border color

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
        onPress={() => setModalState(true)}
        activeOpacity={0.85}
      >
        <AnimatedCircularProgress
          size={BUTTON_SIZE}
          width={PROGRESS_RING_WIDTH}
          fill={progress}
          tintColor={borderColor}
          backgroundColor={trackColor}
          lineCap="round"
          rotation={-120}         // start from upper-left like the design
          arcSweepAngle={360}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Inner fill circle sits on top of the ring */}
        <View
          style={[
            styles.innerCircle,
            {
              width: INNER_CIRCLE_SIZE,
              height: INNER_CIRCLE_SIZE,
              borderRadius: INNER_CIRCLE_SIZE / 2,
              backgroundColor: fillColor,
            },
          ]}
        >
          <Icon width={48} height={48} />
        </View>
      </TouchableOpacity>

      <Text
        style={[
          styles.label,
          {
            left: x - BUTTON_SIZE / 2,
            top: y + 60,
            color: borderColor,
            width: BUTTON_SIZE,
          },
        ]}
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
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    position: "absolute",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
});