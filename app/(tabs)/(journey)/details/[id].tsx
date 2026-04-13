import { useMemo, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import JourneyDetailItem from "@/components/JourneyDetailItem";
import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";
import JourneyResourceModal from "@/components/JourneyResourceModal";

import { IJourneyDetail } from "@/src/store/useJourneyStore";
import useResourcesStore from "@/src/store/useResourcesStore";

const backgroundImage = require("../../../../assets/images/journey-background.png");

const DEFAULT_COLOR = "#FFDADA";
const DEFAULT_ICON = "heart";

export default function JourneyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const islandId = Array.isArray(id) ? id[0] : id;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IJourneyDetail | null>(null);

  const resources = useResourcesStore((state) => state.resources);

  const island = useMemo(
    () => resources?.islands.find((item) => item.id === islandId),
    [resources, islandId],
  );

  const subcategories = island?.data?.subcategories ?? [];

  const handleOpenModal = (item: (typeof subcategories)[number]) => {
    const color = item?.color ?? DEFAULT_COLOR;
    const title = item?.name ?? "";
    const progress = Math.floor(Math.random() * 100);

    setSelectedItem({
      title,
      progress,
      borderColor: color,
      fillColor: color,
      icon: item?.icon ?? DEFAULT_ICON,
    });

    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={StyleSheet.absoluteFill}
      imageStyle={styles.backgroundImage}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <JourneyDetailsHeader islandName={island?.name ?? ""} />

          {subcategories.map((item, index) => {
            const color = item?.color ?? DEFAULT_COLOR;
            const title = item?.name ?? "";
            const progress = Math.floor(Math.random() * 100);

            return (
              <JourneyDetailItem
                key={item?.id ?? `${title}-${index}`}
                {...item}
                title={title}
                progress={progress}
                color={color}
                // @ts-expect-error
                icon={item?.icon ?? DEFAULT_ICON}
                renderSVGLine={index < subcategories.length - 1}
                onPress={() => handleOpenModal(item)}
              />
            );
          })}
        </ScrollView>

        <JourneyResourceModal
          selectedItem={selectedItem}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});