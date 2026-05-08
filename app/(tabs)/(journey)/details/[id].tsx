import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JourneyDetailItem from "@/components/JourneyDetailItem";
import JourneyDetailsHeader from "@/components/JourneyDetailsHeader";

import useResourcesStore from "@/src/store/useResourcesStore";
import useJourneyStore from "@/src/store/useJourneyStore";

const backgroundImage = require("../../../../assets/images/journey-background.png");

const DEFAULT_COLOR = "#FFDADA";
const DEFAULT_ICON = "heart";

export default function JourneyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const islandId = Array.isArray(id) ? id[0] : id;

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

  // get the progress for a particualr subcategory
  const calculateSubcategoryProgress = (
    subcategory: (typeof subcategories)[number]
  ) => {
    const total = subcategory.infographics?.length || 0;
    if (!islandProgress || total === 0) return 0;

    const progressSub = islandProgress.subcategories.find(
      (s) => s.id === subcategory.id
    );

    if (!progressSub) return 0;

    const viewed = Math.min(progressSub.viewedInfographics.size, total);

    return viewed / total;
  };

  // get the overall island progress
  const totalCompletion = useMemo(() => {
    if (subcategories.length === 0) return 0;

    const totalProgress = subcategories.reduce((sum, subcategory) => {
      return sum + calculateSubcategoryProgress(subcategory);
    }, 0);

    return totalProgress / subcategories.length;
  }, [islandProgress, subcategories]);

  const totalCompletionPercent = useMemo(() => {
    return Math.round(totalCompletion * 100);
  }, [totalCompletion]);

  const handleOpenModal = (item: (typeof subcategories)[number]) => {
    if (!islandId) return;

    router.push({
      pathname: "/(tabs)/(journey)/details/[id]/resource",
      params: {
        id: islandId,
        subcategoryId: item.id,
      },
    });
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
          <JourneyDetailsHeader islandName={island?.name ?? ""} islandSecondaryName={island?.data?.secondary_name} completionPercent={totalCompletionPercent} />

          {subcategories.map((item, index) => {
            const color = item?.color ?? DEFAULT_COLOR;
            const title = item?.name ?? "";
            const progress = Math.round(calculateSubcategoryProgress(item) * 100);

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