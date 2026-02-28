import { DetailItem } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface JourneyResourceModalProps {
  selectedItem: DetailItem | null;
  isVisible: boolean;
  onClose: () => void;
}

const JourneyResourceModal: React.FC<JourneyResourceModalProps> = ({
  selectedItem,
  isVisible,
  onClose,
}) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        backdropOpacity={0}
        style={{ margin: 0, justifyContent: "flex-end", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: height - insets.top,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            paddingHorizontal: 18,
            alignItems: "stretch",
          }}
        >
          {/* Header Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {/* X Button */}
            <TouchableOpacity
              onPress={onClose}
              style={{ paddingVertical: 8, marginRight: 8 }}
              accessibilityLabel="Close"
            >
              <Ionicons name="close" size={28} color="#222" />
            </TouchableOpacity>
            {/* Progress Bar */}
            <View
              style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
            >
              <View
                style={{
                  height: 16,
                  backgroundColor: "#F0F0F0",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: `${selectedItem?.progress || 0}%`,
                    height: "100%",
                    backgroundColor: selectedItem?.borderColor || "#a259ff",
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
            {/* Progress Number */}
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                fontSize: 16,
                color: selectedItem?.borderColor || "#a259ff",
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {selectedItem?.progress}%
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 18,
            }}
          >
            {/* Title Row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}>
                {selectedItem?.title}
              </Text>
              <Text
                style={{ fontSize: 16, color: "#888", marginLeft: 8 }}
              >{`(1/3)`}</Text>
            </View>

            {/* Infographic View */}
            <View
              style={{
                backgroundColor: selectedItem?.fillColor || "#f3e6ff",
                borderRadius: 16,
                height: 600,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                alignSelf: "center",
              }}
            >
              {/* Placeholder for infographic */}
              <Ionicons
                name="image"
                size={64}
                color={selectedItem?.borderColor || "#a259ff"}
              />
              <Text
                style={{
                  color: selectedItem?.borderColor || "#a259ff",
                  marginTop: 12,
                  fontWeight: "600",
                }}
              >
                Infographic
              </Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={{
                backgroundColor: selectedItem?.borderColor || "#a259ff",
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: "center",
                width: "100%",
                alignSelf: "center",
              }}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JourneyResourceModal;
