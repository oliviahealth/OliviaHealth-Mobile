import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { WebView } from "react-native-webview";

import { saturateAndDarken } from "@/app/utils/utils";
import useResourcesStore, { IIslandSubcategories } from "@/src/store/useResourcesStore";

const EXPO_PUBLIC_S3_URL = process.env.EXPO_PUBLIC_S3_URL!;

interface JourneyResourceModalProps {
    selectedItem: IIslandSubcategories | null;
    viewedInfographics: Set<string>;
    isVisible: boolean;
    onClose: () => void;
}

const JourneyResourceModal: React.FC<JourneyResourceModalProps> = ({
    selectedItem,
    viewedInfographics,
    isVisible,
    onClose,
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["75%"], []);

    const allInfographics =
        useResourcesStore((state) => state.resources)?.infographics;

    const resolvedInfographics = useMemo(
        () =>
            allInfographics?.filter((item) =>
                selectedItem?.infographics?.includes(item.id)
            ) ?? [],
        [allInfographics, selectedItem?.infographics]
    );

    const darkenedColor = saturateAndDarken(selectedItem?.color || "#f3e6ff");

    const getResourceObject = (path: string) => {
        return `${EXPO_PUBLIC_S3_URL}/${path}`;
    };

    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isVisible]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={onClose}
            style={{ zIndex: 999, elevation: 999 }}
            enableDynamicSizing={false}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.15}
                />
            )}
            handleIndicatorStyle={{
                backgroundColor: "#D0D0D0",
                width: 48,
            }}
            backgroundStyle={{
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                backgroundColor: "white",
            }}
        >
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
                {resolvedInfographics.length > 0 ? (
                    <BottomSheetScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingTop: 16,
                            paddingBottom: 36,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            {resolvedInfographics.map((item) => {
                                const isViewed = viewedInfographics?.has(item.id);

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={0.85}
                                        style={{
                                            width: "47%",
                                            marginBottom: 28,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "700",
                                                color: "#999",
                                                marginBottom: 12,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {item.title || "Infographic"}
                                        </Text>

                                        <View
                                            style={{
                                                width: "100%",
                                                height: 220,
                                                borderRadius: 16,
                                                overflow: "hidden",
                                                backgroundColor: "#F3F3F3",
                                                position: "relative",
                                            }}
                                        >
                                            <WebView
                                                source={{ uri: getResourceObject(item.path) }}
                                                style={{ flex: 1 }}
                                                scrollEnabled={false}
                                            />

                                            {isViewed && (
                                                <>
                                                    <View
                                                        style={{
                                                            ...StyleSheet.absoluteFillObject,
                                                            backgroundColor: "rgba(0,0,0,0.45)",
                                                        }}
                                                    />

                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            top: 12,
                                                            right: 12,
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 23,
                                                            backgroundColor: "white",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            shadowColor: "#000",
                                                            shadowOpacity: 0.18,
                                                            shadowRadius: 8,
                                                            shadowOffset: { width: 0, height: 3 },
                                                            elevation: 5,
                                                        }}
                                                    >
                                                        <Ionicons name="checkmark" size={24} color={darkenedColor} />
                                                    </View>
                                                </>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </BottomSheetScrollView>
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
                            No infographic previews available
                        </Text>
                    </View>
                )}
            </View>
        </BottomSheet>
    );
};

export default JourneyResourceModal;