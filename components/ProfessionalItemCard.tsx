import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { useProfessionalsStore } from "@/src/store/useProfessionalsStore";
import { IProfessionalItem } from "@/src/store/useResourcesStore";

import LoadingDot from "./LoadingDot";

interface ProfessionalItemCardProps {
  professionalItem: IProfessionalItem;
}

export default function ProfessionalItemCard({ professionalItem }: ProfessionalItemCardProps) {
  const { setSelectedProfessionalItem } = useProfessionalsStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDocumentSelect = async () => {
    setIsLoading(true);
    setSelectedProfessionalItem(professionalItem);
    await Linking.openURL(professionalItem.url);
    setIsLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={handleDocumentSelect}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.avatar} />
        <Text style={styles.cardTitle}>
          {
            professionalItem.key.split("/")[
            professionalItem.key.split("/").length - 1
            ]
          }
        </Text>
        {isLoading && <LoadingDot durationMs={500} style={{ marginLeft: 8 }} />}
      </View>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </TouchableOpacity>
  );
}


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