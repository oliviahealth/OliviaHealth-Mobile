import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function JourneyDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Journey Details Screen - ID: {id}</Text>
    </View>
  );
}
