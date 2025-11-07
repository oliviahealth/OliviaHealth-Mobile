import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
      <Ionicons
        name="chevron-back"
        size={24}
        color="#000"
      />
    </TouchableOpacity>
  );
};

export default BackButton;