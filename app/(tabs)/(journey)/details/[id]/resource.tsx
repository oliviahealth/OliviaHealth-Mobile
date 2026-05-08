import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import JourneyResourceModal from "@/components/JourneyResourcePreviewModal";

import { saturateAndDarken } from "@/app/utils/utils";
import useJourneyStore, { saveProgress } from "@/src/store/useJourneyStore";
import useResourcesStore, { IIslandSubcategories } from "@/src/store/useResourcesStore";

const EXPO_PUBLIC_S3_URL = process.env.EXPO_PUBLIC_S3_URL!;

type RouteParams = {
  id?: string | string[];
  subcategoryId?: string | string[];
};

export default function JourneyResourceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<RouteParams>();
  const islandId = Array.isArray(params.id) ? params.id[0] : params.id;
  const subcategoryId = Array.isArray(params.subcategoryId)
    ? params.subcategoryId[0]
    : params.subcategoryId;

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const resources = useResourcesStore((state) => state.resources);
  const progress = useJourneyStore((state) => state.progress);

  const island = useMemo(
    () => resources?.islands.find((item) => item.id === islandId),
    [resources, islandId]
  );

  const selectedItem = useMemo<IIslandSubcategories | null>(() => {
    const subcategory = island?.data?.subcategories?.find(
      (subcategory) => subcategory.id === subcategoryId
    );
    if (!subcategory) return null;

    return {
      id: subcategory.id,
      name: subcategory.name ?? "",
      color: subcategory.color ?? "#FFDADA",
      icon: subcategory.icon ?? "heart",
      infographics: subcategory.infographics ?? [],
    };
  }, [island, subcategoryId]);

  const allInfographics = resources?.infographics;
  const resolvedInfographics = useMemo(
    () =>
      allInfographics?.filter((item) =>
        selectedItem?.infographics?.includes(item.id)
      ) ?? [],
    [allInfographics, selectedItem?.infographics]
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [islandId, subcategoryId]);

  const currentInfographic = resolvedInfographics[currentIndex];
  const modalTitle = currentInfographic?.title || selectedItem?.name || "Resource";

  const hasInfographics = resolvedInfographics.length > 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === resolvedInfographics.length - 1;

  const progressValue = useMemo(() => {
    if (!selectedItem || !selectedItem.infographics?.length || !islandId)
      return 0;

    const islandProgress = progress.islands.find((item) => item.id === islandId);
    const subProgress = islandProgress?.subcategories.find(
      (subcategory) => subcategory.id === selectedItem.id
    );
    const viewed = Math.min(
      subProgress?.viewedInfographics.size ?? 0,
      selectedItem.infographics.length
    );

    return Math.round((viewed / selectedItem.infographics.length) * 100);
  }, [progress.islands, selectedItem, islandId]);

  const darkenedColor = saturateAndDarken(selectedItem?.color || "#f3e6ff");

  const handleBack = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
      return;
    }

    router.back();
  };

  const handleContinue = () => {
    if (!hasInfographics || isLast) {
      router.back();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const getResourceObject = (path: string) => `${EXPO_PUBLIC_S3_URL}/${path}`;

  useEffect(() => {
    setIsImageLoading(!!currentInfographic);
  }, [currentInfographic?.id]);

  useEffect(() => {
    if (!currentInfographic || !islandId || !selectedItem?.id) return;

    saveProgress(islandId, selectedItem.id, currentInfographic.id);
  }, [currentInfographic, islandId, selectedItem?.id]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View
        style={{ backgroundColor: "white", width: "100%", flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 18 }}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${progressValue}%`, backgroundColor: darkenedColor }]}
              />
            </View>

            <Text style={[styles.progressText, { color: darkenedColor }]} numberOfLines={1}>
              {`${progressValue}%`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.spacerButton}
            onPress={() => setIsPreviewOpen(true)}
          >
            <MaterialIcons name="window" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={2}>
            {modalTitle}
          </Text>

          <Text style={styles.counterText}>
            {`(${hasInfographics ? currentIndex + 1 : 0}/${resolvedInfographics.length})`}
          </Text>
        </View>

        <View style={styles.contentArea}>
          {currentInfographic ? (
            <View style={styles.webviewContainer}>
              {isImageLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={darkenedColor} />
                  <Text style={styles.loadingText}>Loading resource...</Text>
                </View>
              )}

              <WebView
                key={currentInfographic.id}
                source={{ uri: getResourceObject(currentInfographic.path) }}
                style={styles.webview}
                onLoadStart={() => setIsImageLoading(true)}
                onLoadEnd={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                originWhitelist={["*"]}
                scalesPageToFit
                startInLoadingState={false}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="image" size={64} color={darkenedColor} />
              <Text style={[styles.emptyStateText, { color: darkenedColor }]}>No infographic available</Text>
            </View>
          )}
        </View>

        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.navButton]}
            onPress={handleBack}
            activeOpacity={0.85}
            disabled={isFirst}
          >
            <Text style={[styles.navButtonText, styles.navButtonTextDisabled]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: darkenedColor }]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>{isLast || !hasInfographics ? "Done" : "Continue"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <JourneyResourceModal
        selectedItem={selectedItem}
        isVisible={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  closeButton: {
    width: 40,
    alignItems: "flex-start",
  },
  progressWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 8,
  },
  progressText: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
    width: 55,
    textAlign: "right",
  },
  spacerButton: {
    width: 32,
    alignItems: "flex-end",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    paddingRight: 12,
  },
  counterText: {
    fontSize: 16,
    color: "#888",
    marginTop: 2,
  },
  contentArea: {
    flex: 1,
    marginVertical: 12,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    marginTop: 12,
    fontWeight: "600",
  },
  footerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  navButtonTextDisabled: {
    color: "#999",
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
