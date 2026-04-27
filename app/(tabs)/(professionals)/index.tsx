import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

import { useProfessionalsStore } from "@/src/store/useProfessionalsStore";

import TopicCard from "@/components/TopicCard";
import ProfessionalsIcon from "@/assets/images/professionals_icon.svg";
import { fetchResources } from "@/src/store/useResourcesStore";

export default function Professionals() {
  const { topics } = useProfessionalsStore();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      await fetchResources();
    } finally {
      setRefreshing(false);
    }
  }, [fetchResources, refreshing]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#FFFFFF",
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
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

      <Text style={styles.subtitle}>
        Lessons for healthcare professionals to best support children and
        caregivers.
      </Text>

      {topics.map((topic) => (
        <View key={topic.id} style={{ marginBottom: 12 }}>
          <TopicCard topic={topic} />
        </View>
      ))}
    </ScrollView>
  );
}

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