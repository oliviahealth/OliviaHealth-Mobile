import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";

interface JourneyDetailsHeaderProps {
  islandName: string;
}

const JourneyDetailsHeader: React.FC<JourneyDetailsHeaderProps> = ({
  islandName,
}) => {
  const insets = useSafeAreaInsets();
  const exampleProgress = Math.floor(Math.random() * 100); // Example progress value

  return (
    <View
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: 20,
        alignItems: "center",
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <BackButton />
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{islandName}</Text>
          <Text style={{ fontSize: 14, color: "#A27CAC" }}>Your Progress</Text>
        </View>
      </View>
      <AnimatedCircularProgress
        size={85}
        width={10}
        fill={exampleProgress}
        tintColor={"#D674EE"}
        backgroundColor="#fff"
        lineCap="round"
        rotation={0}
      >
        {(fill: number) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >{`${Math.round(fill)}%`}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default JourneyDetailsHeader;
