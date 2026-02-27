import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import SVG, { Line } from "react-native-svg";

interface JourneyDetailItemProps {
  title: string;
  progress: number; // 0-100
  borderColor: string;
  fillColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  renderSVGLine: boolean;
  onPress?: () => void;
}

const JourneyDetailItem: React.FC<JourneyDetailItemProps> = ({
  title,
  progress,
  borderColor,
  fillColor,
  icon,
  renderSVGLine,
  onPress,
}) => {
  const PROGRESS_SIZE = 50;
  const LINE_HEIGHT = 15;

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#CCCCCC",
        }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <AnimatedCircularProgress
            size={PROGRESS_SIZE}
            width={6}
            fill={progress}
            tintColor={borderColor}
            backgroundColor={fillColor}
            lineCap="round"
            rotation={0}
            style={{ zIndex: 1 }}
          />
          {/* Inner circle */}
          <View
            style={{
              position: "absolute",
              left: PROGRESS_SIZE * 0.12, // estimates offset by progress size
              width: PROGRESS_SIZE - 12,
              height: PROGRESS_SIZE - 12,
              borderRadius: 1000,
              backgroundColor: fillColor,
              alignItems: "center",
              justifyContent: "center",
              shadowOpacity: 0.15,
              shadowRadius: 16,
              zIndex: 2,
            }}
          >
            <Ionicons name={icon} size={24} color={borderColor} />
          </View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#565656" }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text
            style={{ fontSize: 16, color: borderColor, fontWeight: "bold" }}
          >{`${progress}%`}</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </View>
      </TouchableOpacity>
      {renderSVGLine ? (
        <SVG
          height={LINE_HEIGHT}
          width={20}
          style={{
            marginLeft: 20 + PROGRESS_SIZE / 2 - 10, // paddingHorizontal + half of progress size - half of line width
          }}
        >
          <Line
            x1="10"
            y1="0"
            x2="10"
            y2={LINE_HEIGHT}
            stroke="#a259ff"
            strokeWidth={8}
            opacity={0.3}
          />
        </SVG>
      ) : (
        <View style={{ height: LINE_HEIGHT }} />
      )}
    </>
  );
};

export default JourneyDetailItem;
