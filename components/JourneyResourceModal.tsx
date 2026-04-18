import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { saturateAndDarken } from "@/app/utils/utils";
import useResourcesStore, { IJourneyDetail } from "@/src/store/useResourcesStore";

const EXPO_PUBLIC_S3_URL = process.env.EXPO_PUBLIC_S3_URL!;

interface JourneyResourceModalProps {
  selectedItem: IJourneyDetail | null;
  isVisible: boolean;
  onClose: () => void;
}

const JourneyResourceModal: React.FC<JourneyResourceModalProps> = ({
  selectedItem,
  isVisible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const modalHeightOffset = Platform.OS === "android" ? 30 : 0;

  const [isImageLoading, setIsImageLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const allInfographics = useResourcesStore(state => state.resources)?.infographics;

  const resolvedInfographics = useMemo(
    () =>
      allInfographics?.filter(item =>
        selectedItem?.infographics?.includes(item.id)
      ) ?? [],
    [allInfographics, selectedItem?.infographics]
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [isVisible, selectedItem?.id]);

  const currentInfographic = resolvedInfographics[currentIndex];
  const modalTitle = currentInfographic?.title || selectedItem?.name || "Resource";

  const hasInfographics = resolvedInfographics.length > 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === resolvedInfographics.length - 1;

  const darkenedColor = saturateAndDarken(selectedItem?.color || "#f3e6ff");

  const handleBack = () => {
    if (!isFirst) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    if (!hasInfographics || isLast) {
      onClose();
      return;
    }

    setCurrentIndex(prev => prev + 1);
  };

  const getResourceObject = (path: string) => {
    const object_url = EXPO_PUBLIC_S3_URL + "/" + path;
    return object_url;
  }

  useEffect(() => {
    setIsImageLoading(!!currentInfographic);
  }, [currentInfographic?.id]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0}
      style={{ margin: 0, justifyContent: "flex-end", alignItems: "center" }}
    >
      <View
        style={{ backgroundColor: "white", width: "100%", height: height - insets.top - modalHeightOffset, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 18, }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{ paddingVertical: 8, marginRight: 8 }}
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>

          <View style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}>
            <View style={{ height: 16, backgroundColor: "#F0F0F0", borderRadius: 8, overflow: "hidden", }} >
              <View style={{ width: `${selectedItem?.progress || 0}%`, height: "100%", backgroundColor: darkenedColor, borderRadius: 8, }} />
            </View>
          </View>

          <Text
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              fontSize: 16,
              color: darkenedColor,
              minWidth: 40,
              textAlign: "right",
            }}
          >
            {selectedItem?.progress ?? 0}%
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "bold",
              color: "#222",
              paddingRight: 12,
            }}
            numberOfLines={2}
          >
            {modalTitle}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#888",
              marginTop: 2,
            }}
          >
            {`(${hasInfographics ? currentIndex + 1 : 0}/${resolvedInfographics.length})`}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginVertical: 12,
          }}
        >
          {currentInfographic ? (
            <View style={{ flex: 1 }}>
              {isImageLoading && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                    backgroundColor: "white",
                  }}
                >
                  <ActivityIndicator size="large" color={darkenedColor} />
                  <Text
                    style={{
                      marginTop: 12,
                      color: "#666",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Loading resource...
                  </Text>
                </View>
              )}

              <WebView
                key={currentInfographic.id}
                source={{ uri: getResourceObject(currentInfographic.path) }}
                style={{ flex: 1 }}
                onLoadStart={() => setIsImageLoading(true)}
                onLoadEnd={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                originWhitelist={["*"]}
                scalesPageToFit
                startInLoadingState={false}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="image" size={64} color={darkenedColor} />
              <Text
                style={{
                  color: darkenedColor,
                  marginTop: 12,
                  fontWeight: "600",
                }}
              >
                No infographic available
              </Text>
            </View>
          )}
        </View>

        {/* Footer Buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: isFirst ? "#F0F0F0" : "#FFFFFF",
              borderRadius: 12,
              paddingVertical: 18,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: isFirst ? "#E5E5E5" : darkenedColor,
            }}
            onPress={handleBack}
            activeOpacity={0.85}
            disabled={isFirst}
          >
            <Text
              style={{
                color: isFirst ? "#999" : darkenedColor,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: darkenedColor,
              borderRadius: 12,
              paddingVertical: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              {isLast || !hasInfographics ? "Done" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default JourneyResourceModal;