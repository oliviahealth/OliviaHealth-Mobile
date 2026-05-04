import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BackButton from "./BackButton";

interface JourneyDetailsHeaderProps {
  islandName: string;
  islandSecondaryName?: string;
  completionPercent: number;
}

const JourneyDetailsHeader: React.FC<JourneyDetailsHeaderProps> = ({
  islandName,
  islandSecondaryName,
  completionPercent
}) => {
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
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{islandName}</Text>
          {islandSecondaryName && (<Text style={{ fontSize: 14, color: "#A27CAC" }}>{islandSecondaryName}</Text>)}
        </View>
      </View>
      <AnimatedCircularProgress
        size={85}
        width={10}
        fill={completionPercent}
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
