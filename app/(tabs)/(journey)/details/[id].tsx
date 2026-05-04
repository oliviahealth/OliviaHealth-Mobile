import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JourneyDetailItem from "@/components/JourneyDetailItem";
import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";
import JourneyResourceModal from "@/components/JourneyResourceModal";

import useResourcesStore, { IJourneyDetail } from "@/src/store/useResourcesStore";
import useJourneyStore, { saveProgress } from "@/src/store/useJourneyStore";

const backgroundImage = require("../../../../assets/images/journey-background.png");

const DEFAULT_COLOR = "#FFDADA";
const DEFAULT_ICON = "heart";

export default function JourneyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const islandId = Array.isArray(id) ? id[0] : id;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IJourneyDetail | null>(null);

  const resources = useResourcesStore((state) => state.resources);
  const progress = useJourneyStore(state => state.progress);

  const island = useMemo(
    () => resources?.islands.find((item) => item.id === islandId),
    [resources, islandId]
  );

  const subcategories = useMemo(
    () => island?.data?.subcategories ?? [],
    [island]
  );

  const islandProgress = useMemo(
    () => progress.islands.find((island) => island.id === islandId),
    [progress, islandId]
  );

  const completion = useMemo(() => {
    if (!islandProgress || subcategories.length === 0) return 0;

    let total = 0;
    let viewed = 0;

    subcategories.forEach((subcategory) => {
      const progressSub = islandProgress.subcategories.find(
        (s) => s.id === subcategory.id
      );

      const totalForSub = subcategory.infographics?.length || 0;
      total += totalForSub;

      if (progressSub) {
        viewed += Math.min(progressSub.viewedInfographics.size, totalForSub);
      }
    });

    return total === 0 ? 0 : viewed / total;
  }, [islandProgress, subcategories]);

  const completionPercent = useMemo(() => {
    return Math.round(completion * 100);
  }, [completion]);

  const handleOpenModal = (item: (typeof subcategories)[number]) => {
    const color = item?.color ?? DEFAULT_COLOR;
    const name = item?.name ?? "";
    const progress = Math.floor(Math.random() * 100);
    const icon = item.icon ?? DEFAULT_ICON;
    const infographics = item.infographics ?? [];

    setSelectedItem({
      id: item.id,
      name,
      progress,
      color,
      icon,
      infographics
    });

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const markViewedInfographic = (infographicId: string) => {
    if (!islandId || !selectedItem?.id) return;
    saveProgress(islandId, selectedItem?.id, infographicId);
  }

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
          <JourneyDetailsHeader islandName={island?.name ?? ""} islandSecondaryName={island?.data?.secondary_name} completionPercent={completionPercent} />

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
          markViewedInfographic={markViewedInfographic}
          onClose={handleCloseModal}
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