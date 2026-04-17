import ProfessionalItemCard from "@/components/ProfessionalItemCard";
import { useProfessionalsStore } from "@/src/store/useProfessionalsStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Professionals() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { selectedTopic } = useProfessionalsStore();
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#1A1A1A",
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
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
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{id}</Text>
      </View>

      {/* Topic List */}
      {selectedTopic &&
        selectedTopic.professionalItems &&
        selectedTopic.professionalItems.map((doc) => (
          <View style={{ marginBottom: 12 }} key={doc.id}>
            <ProfessionalItemCard professionalItem={doc} />
          </View>
        ))}
    </ScrollView>
  );
}
