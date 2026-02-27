import { MapJourneyButton } from "@/components/MapJourneyButton";
import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function JourneyScreen() {
  const { width } = useWindowDimensions();

  interface Point {
    x: number;
    y: number;
    color: string;
    border: string;
    icon: keyof typeof Ionicons.glyphMap;
    id: string;
  }

  // Used to easily adjust the entire path's position
  const HORIZONTAL_CHANGE = -30;
  const VERTICAL_CHANGE = 0;

  const points: Point[] = [
    {
      x: width * 0.28 + HORIZONTAL_CHANGE,
      y: 0 + VERTICAL_CHANGE,
      color: "#f3e6ff",
      border: "#a259ff",
      icon: "medkit",
      id: "Preconception",
    },
    {
      x: width * 0.6 + HORIZONTAL_CHANGE,
      y: 90 + VERTICAL_CHANGE,
      color: "#ffe6f0",
      border: "#ff6f91",
      icon: "nutrition",
      id: "Conception",
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 260 + VERTICAL_CHANGE,
      color: "#e6f7ff",
      border: "#43b0f1",
      icon: "git-branch",
      id: "1st Trimester",
    },
    {
      x: width * 0.4 + HORIZONTAL_CHANGE,
      y: 460 + VERTICAL_CHANGE,
      color: "#fffbe6",
      border: "#ffd700",
      icon: "flask",
      id: "2nd Trimester",
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 610 + VERTICAL_CHANGE,
      color: "#e6fff7",
      border: "#00b894",
      icon: "arrow-down",
      id: "3rd Trimester",
    },
  ];

  const controlPoints = [
    { x: width * 0.45 + HORIZONTAL_CHANGE, y: 30 + VERTICAL_CHANGE }, // Connects 1st and 2nd
    { x: width * 1 + HORIZONTAL_CHANGE, y: 120 + VERTICAL_CHANGE }, // Connects 2nd and 3rd
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 260 + VERTICAL_CHANGE }, // Connects 3rd and 4th
    { x: width * 0.8 + HORIZONTAL_CHANGE, y: 480 + VERTICAL_CHANGE }, // Connects 4th and 5th
  ];

  function getPathString(pts: Point[], ctrls: { x: number; y: number }[]) {
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < ctrls.length; i++) {
      path += ` Q ${ctrls[i].x} ${ctrls[i].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }
    return path;
  }

  const pathString = getPathString(points, controlPoints);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
          gap: 18,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: useSafeAreaInsets().top,
          }}
        >
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Explore Your Journey
            </Text>
            <Text style={{ fontSize: 14, color: "#555", fontWeight: "500" }}>
              What are your learning needs?
            </Text>
          </View>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={75}
            tintColor={TINT_COLOR}
            backgroundColor="#fff"
            lineCap="round"
            rotation={0}
          >
            {(fill: number) => (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >{`${Math.round(fill)}%`}</Text>
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Journey Path and Buttons */}
        <View
          style={{
            position: "relative",
            width: width,
            height: points[points.length - 1].y + 100,
            marginTop: 40,
          }}
        >
          <Svg
            height={points[points.length - 1].y + 100}
            width={width}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <Path
              d={pathString}
              stroke="#a259ff"
              strokeWidth={12}
              fill="none"
              opacity={0.09}
              strokeLinecap="round"
            />
            {/* For debugging: Control Points */}
            {/* {controlPoints.map((ctrl, idx) => (
              <Circle key={idx} cx={ctrl.x} cy={ctrl.y} r={5} fill="red" />
            ))} */}
          </Svg>
          {points.map((pt, idx) => (
            <MapJourneyButton
              key={idx}
              x={pt.x}
              y={pt.y}
              progress={Math.random() * 100} // Random progress for demo
              borderColor={pt.border}
              fillColor={pt.color}
              icon={pt.icon}
              id={pt.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
