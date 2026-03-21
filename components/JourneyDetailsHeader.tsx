import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BackButton from "./BackButton";

interface JourneyDetailsHeaderProps {
  islandName: string;
}

const JourneyDetailsHeader: React.FC<JourneyDetailsHeaderProps> = ({
  islandName,
}) => {
  const exampleProgress = Math.floor(Math.random() * 100); // Example progress value

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "transparent",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 20,
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
