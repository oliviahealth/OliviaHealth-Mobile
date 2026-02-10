import { TINT_COLOR } from "@/theme";
import { ScrollView, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function JourneyScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20, gap: 18 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "600", color: "#000" }}>
          Your Journey
        </Text>
        <AnimatedCircularProgress
          size={100}
          width={10}
          fill={75}
          tintColor={TINT_COLOR}
          backgroundColor="#fff"
          lineCap="round"
        >
          {(fill: number) => (
            <Text
              style={{ fontSize: 20, fontWeight: "500" }}
            >{`${Math.round(fill)}%`}</Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </ScrollView>
  );
}
