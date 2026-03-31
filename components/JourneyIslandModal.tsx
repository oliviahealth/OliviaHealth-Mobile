import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface JourneyIslandModalProps {
  visible: boolean;
  onClose: () => void;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
  title: string;
  subtitle: string;
  description: string;
  onExplore: () => void;
}

const JourneyIslandModal: React.FC<JourneyIslandModalProps> = ({
  visible,
  onClose,
  Icon,
  title,
  subtitle,
  description,
  onExplore,
}) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: "flex-end", alignItems: "center" }}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Close modal"
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <View style={styles.icon}>
            <Icon width={56} height={56} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
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
    width: 56,
    height: 56,
    marginBottom: 12,
    marginTop: 8,
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
    color: "#6CB6FF",
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
    backgroundColor: "#6CB6FF",
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

export default JourneyIslandModal;
