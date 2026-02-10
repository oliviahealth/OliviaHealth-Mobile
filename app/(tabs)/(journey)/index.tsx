import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function JourneyScreen() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/details/123")}>
      <Text>Journey Screen</Text>
    </TouchableOpacity>
  );
}
