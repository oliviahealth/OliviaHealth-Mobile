import JourneyDetailItem from "@/components/JourneyDetailItem";
import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";
import JourneyResourceModal from "@/components/JourneyResourceModal";
import { DetailItem } from "@/src/store/useResourcesStore";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JourneyDetailsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const { id } = useLocalSearchParams();

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
      <JourneyResourceModal
        selectedItem={selectedItem}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
