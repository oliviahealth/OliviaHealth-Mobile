import { Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import SVG, { Line } from "react-native-svg";

import { saturateAndDarken } from "@/app/utils/utils";

interface JourneyDetailItemProps {
  title: string;
  progress: number; // 0-100
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  renderSVGLine: boolean;
  onPress?: () => void;
}

const JourneyDetailItem: React.FC<JourneyDetailItemProps> = ({
  title,
  progress,
  color,
  icon,
  renderSVGLine,
  onPress,
}) => {
  const PROGRESS_SIZE = 50;
  const LINE_HEIGHT = 15;

  const darkenedColor = saturateAndDarken(color);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: "white",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#CCCCCC",
          width: "100%",
        }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {/* LEFT SIDE */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            minWidth: 0,
            gap: 15,
            marginRight: 8,
          }}
        >
          <AnimatedCircularProgress
            size={PROGRESS_SIZE}
            width={6}
            fill={progress}
            tintColor={darkenedColor}
            backgroundColor={color}
            lineCap="round"
            rotation={0}
            style={{ zIndex: 1 }}
          />

          <View
            style={{
              position: "absolute",
              left: PROGRESS_SIZE * 0.12,
              width: PROGRESS_SIZE - 12,
              height: PROGRESS_SIZE - 12,
              borderRadius: 1000,
              backgroundColor: color,
              alignItems: "center",
              justifyContent: "center",
              shadowOpacity: 0.15,
              shadowRadius: 16,
              zIndex: 2,
            }}
          >
            <Ionicons name={icon} size={22} color={darkenedColor} />
          </View>

          <Text
            style={{
              flex: 1,
              flexShrink: 1,
              fontSize: 16,
              fontWeight: "bold",
              color: "#565656",
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>

        {/* RIGHT SIDE */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: 60,
            gap: 4,
            flexShrink: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: darkenedColor,
              fontWeight: "bold",
            }}
          >
            {`${progress}%`}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </View>
      </TouchableOpacity>

      {renderSVGLine ? (
        <SVG
          height={LINE_HEIGHT}
          width={20}
          style={{
            marginLeft: 16 + PROGRESS_SIZE / 2 - 10,
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