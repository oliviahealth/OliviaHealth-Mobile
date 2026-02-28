import JourneyDetailItem from "@/components/JourneyDetailItem";
import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JourneyDetailsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const { id } = useLocalSearchParams();

  interface DetailItem {
    title: string;
    progress: number;
    borderColor: string;
    fillColor: string;
    icon: keyof typeof Ionicons.glyphMap;
  }

  // Sample data
  const detailItems: DetailItem[] = [
    {
      title: "Nutrition",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#FF6F91",
      fillColor: "#FFE6F0",
      icon: "nutrition",
    },
    {
      title: "Family History",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#43B0F1",
      fillColor: "#E6F7FF",
      icon: "walk",
    },
    {
      title: "Vaccinations",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#00B894",
      fillColor: "#E6FFF7",
      icon: "moon",
    },
    {
      title: "Lifestyle",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#a259ff",
      fillColor: "#f3e6ff",
      icon: "bicycle",
    },
    {
      title: "Lifestyle",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#FFD700",
      fillColor: "#FFFBE6",
      icon: "bicycle",
    },
    {
      title: "Lifestyle",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#FF6F91",
      fillColor: "#FFE6F0",
      icon: "bicycle",
    },
    {
      title: "Lifestyle",
      progress: Math.floor(Math.random() * 100),
      borderColor: "#00B894",
      fillColor: "#E6FFF7",
      icon: "bicycle",
    },
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <JourneyDetailsHeader islandName={id as string} />
        {detailItems.map((item, index) => (
          <JourneyDetailItem
            key={index}
            {...item}
            renderSVGLine={index < detailItems.length - 1}
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          />
        ))}
      </ScrollView>
      {/* Modal Implementation */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 24,
            paddingHorizontal: 20,
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
              onPress={() => setModalVisible(false)}
              style={{ padding: 8, marginRight: 8 }}
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

          {/* Title Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 18,
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
              marginBottom: 24,
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
            onPress={() => setModalVisible(false)}
            activeOpacity={0.85}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
