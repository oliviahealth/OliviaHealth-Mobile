import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <View></View>;
}