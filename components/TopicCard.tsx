import { Topic } from "@/app/(tabs)/(professionals)/index";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: "#CCCCCC",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#E8E8EE",
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: "#1A1A1A",
    },
    cardSubtitle: {
      fontSize: 12,
      color: "#999999",
    },
  });

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.avatar} />
        <Text style={styles.cardTitle}>{topic.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </TouchableOpacity>
  );
}
