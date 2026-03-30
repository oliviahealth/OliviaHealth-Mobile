import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface JourneyIslandModalProps {
  visible: boolean;
  onClose: () => void;
  iconUrl: string;
  title: string;
  subtitle: string;
  description: string;
  onExplore: () => void;
}

const JourneyIslandModal: React.FC<JourneyIslandModalProps> = ({
  visible,
  onClose,
  iconUrl,
  title,
  subtitle,
  description,
  onExplore,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
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
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
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
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: 300,
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
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6CB6FF",
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 8,
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
