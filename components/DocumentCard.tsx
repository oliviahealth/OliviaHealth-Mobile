import {
  IDocument,
  useProfessionalsStore,
} from "@/src/store/useProfessionalsStore";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Linking from "expo-linking";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingDot from "./LoadingDot";

interface DocumentCardProps {
  document: IDocument;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const { setSelectedDocument } = useProfessionalsStore();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDocumentSelect = async () => {
    setIsLoading(true);
    setSelectedDocument(document);
    const asset = Asset.fromModule(document.uri);

    if (!asset.localUri) {
      await asset.downloadAsync();
    }

    await Linking.openURL(asset.localUri!);
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
        <Text style={styles.cardTitle}>{document.filename}</Text>
        {isLoading && <LoadingDot durationMs={500} style={{ marginLeft: 8 }} />}
      </View>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </TouchableOpacity>
  );
}
