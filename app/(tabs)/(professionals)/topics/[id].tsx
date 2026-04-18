import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import ProfessionalItemCard from "@/components/ProfessionalItemCard";
import { useProfessionalsStore } from "@/src/store/useProfessionalsStore";

export default function Professionals() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { selectedTopic } = useProfessionalsStore();
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{id}</Text>
      </View>

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