import JourneyDetailItem from "@/components/JourneyDetailItem";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export default function JourneyDetailsScreen() {
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
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {detailItems.map((item, index) => (
        <JourneyDetailItem
          key={index}
          {...item}
          renderSVGLine={index < detailItems.length - 1}
        />
      ))}
    </ScrollView>
  );
}
