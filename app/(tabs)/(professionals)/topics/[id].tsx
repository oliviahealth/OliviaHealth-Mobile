import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import useResourcesStore, {
  IProfessionalResourceItem,
} from "@/src/store/useResourcesStore";
import ProfessionalResourceModal from "@/components/ProfessionalResourceModal"

export default function Professionals() {
  const router = useRouter();
  const { id: professional_resource_id } = useLocalSearchParams();

  const [selectedItem, setSelectedItem] = useState<IProfessionalResourceItem | null>(null);

  const allProfessionalResources = useResourcesStore(
    state => state.resources?.professional_resources
  );

  const selectedProfesssionalResource = allProfessionalResources?.find(
    elm => elm.id === professional_resource_id
  );

  return (
    <>
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

          <Text style={styles.headerTitle}>
            {selectedProfesssionalResource?.name}
          </Text>
        </View>

        {selectedProfesssionalResource?.data?.resources?.map((resource, index) =>
          resource ? (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => setSelectedItem(resource)}
              activeOpacity={0.85}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {resource.name || "Untitled Resource"}
                </Text>

                {resource.description && (
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {resource.description}
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={20} color="#222" />
            </TouchableOpacity>
          ) : null
        )}
      </ScrollView>

      <ProfessionalResourceModal
        selectedItem={selectedItem}
        isVisible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  cardDescription: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 4,
    lineHeight: 20,
  },
});