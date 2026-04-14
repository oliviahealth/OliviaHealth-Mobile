import ProfessionalsIcon from "@/assets/images/professionals_icon.svg";
import TopicCard from "@/components/TopicCard";
import { useProfessionalsStore } from "@/src/store/useProfessionalsStore";
import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Professionals() {
  const { topics } = useProfessionalsStore();

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#1A1A1A",
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: 13,
      color: "#888888",
      lineHeight: 18,
      marginTop: 8,
      marginBottom: 20,
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    separator: {
      height: 10,
    },
  });
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ProfessionalsIcon width={30} height={30} color={TINT_COLOR} />
          <Text style={styles.headerTitle}>For Professionals</Text>
        </View>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={TINT_COLOR}
          />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Lessons for healthcare professionals to best support children and
        caregivers.
      </Text>

      {/* Topic List */}
      {topics.map((topic) => (
        <View key={topic.id} style={{ marginBottom: 12 }}>
          <TopicCard topic={topic} />
        </View>
      ))}
    </ScrollView>
  );
}
