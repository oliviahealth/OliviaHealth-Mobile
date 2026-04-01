import { Point } from "@/app/(tabs)/(journey)";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface JourneyIslandModalProps {
  pt: Point;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
  onExplore: () => void;
}

const JourneyIslandModal: React.FC<JourneyIslandModalProps> = ({
  pt,
  Icon,
  onExplore,
}) => {
  const styles = StyleSheet.create({
    overlay: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    container: {
      backgroundColor: "#fff",
      width: "100%",
      paddingVertical: 24,
      paddingHorizontal: 35,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      zIndex: 1,
      padding: 4,
    },
    closeText: {
      fontSize: 24,
      color: "#888",
      fontWeight: "bold",
    },
    icon: {
      width: 56 + 24,
      height: 56 + 24,
      borderRadius: 1000,
      backgroundColor: pt.color,
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
      marginBottom: 12,
      marginTop: 8,
      // Add a subtle glow to the icon container
      shadowColor: pt.border,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: "#222",
      marginBottom: 2,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: pt.border,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      fontSize: 14,
      color: "#888",
      textAlign: "center",
      marginBottom: 20,
    },
    exploreButton: {
      backgroundColor: pt.border,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 40,
      marginTop: 8,
      width: "100%",
      alignItems: "center",
    },
    exploreText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <Modal
      isVisible={pt.modalVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => pt.setModalState(false)}
      style={{ margin: 0, justifyContent: "flex-end", alignItems: "center" }}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => pt.setModalState(false)}
            accessibilityLabel="Close modal"
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <View style={styles.icon}>
            <Icon width={56} height={56} />
          </View>
          <Text style={styles.title}>{pt.id}</Text>
          <Text style={styles.subtitle}>{`"${pt.subtitle}"`}</Text>
          <Text style={styles.description}>{pt.description}</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={onExplore}
            accessibilityLabel="Explore"
          >
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default JourneyIslandModal;
