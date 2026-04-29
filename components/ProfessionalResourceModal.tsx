import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import useResourcesStore, {
    IProfessionalResourceItem,
} from "@/src/store/useResourcesStore";

import { TINT_COLOR } from "@/theme";

const EXPO_PUBLIC_S3_URL = process.env.EXPO_PUBLIC_S3_URL!;

interface ProfessionalResourceModalProps {
    selectedItem: IProfessionalResourceItem | null;
    isVisible: boolean;
    onClose: () => void;
}

const ProfessionalResourceModal: React.FC<ProfessionalResourceModalProps> = ({
    selectedItem,
    isVisible,
    onClose,
}) => {
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const modalHeightOffset = Platform.OS === "android" ? 30 : 0;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const allInfographics = useResourcesStore(
        state => state.resources?.infographics
    );

    const resolvedInfographics = useMemo(() => {
        if (!allInfographics || !selectedItem?.infographics) return [];

        const map = new Map(allInfographics.map(item => [item.id, item]));

        return selectedItem.infographics
            .map(id => map.get(id))
            .filter(Boolean);
    }, [allInfographics, selectedItem?.infographics]);

    const currentInfographic = resolvedInfographics[currentIndex];

    const hasInfographics = resolvedInfographics.length > 0;
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === resolvedInfographics.length - 1;

    useEffect(() => {
        setCurrentIndex(0);
    }, [isVisible, selectedItem?.name]);

    useEffect(() => {
        setIsImageLoading(!!currentInfographic);
    }, [currentInfographic?.id]);

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

    const getResourceUrl = (path: string) => `${EXPO_PUBLIC_S3_URL}/${path}`;

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            backdropOpacity={0}
            style={{
                margin: 0,
                justifyContent: "flex-end",
            }}
        >
            <View
                style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: height - insets.top - modalHeightOffset,
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                }}
            >
                {/* Header */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            paddingRight: 12,
                            paddingVertical: 6,
                        }}
                        accessibilityLabel="Close"
                    >
                        <Ionicons name="close" size={28} color="#222" />
                    </TouchableOpacity>

                    <Text
                        style={{
                            flex: 1,
                            fontSize: 22,
                            fontWeight: "800",
                            color: "#222",
                        }}
                        numberOfLines={1}
                    >
                        {selectedItem?.name || "Resource"}
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#999",
                            marginLeft: 6,
                        }}
                    >
                        {`(${hasInfographics ? currentIndex + 1 : 0}/${resolvedInfographics.length})`}
                    </Text>
                </View>

                {/* Description */}
                {selectedItem?.description ? (
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#666",
                            lineHeight: 22,
                            marginBottom: 16,
                        }}
                    >
                        {selectedItem.description}
                    </Text>
                ) : null}

                {/* Content */}
                <View
                    style={{
                        flex: 1,
                        marginBottom: 16,
                        borderRadius: 12,
                        overflow: "hidden",
                        backgroundColor: "#F5F5F5",
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
                                        backgroundColor: "rgba(255,255,255,0.95)",
                                    }}
                                >
                                    <ActivityIndicator size="large" color={TINT_COLOR} />

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
                                source={{ uri: getResourceUrl(currentInfographic.path) }}
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
                                paddingHorizontal: 24,
                            }}
                        >
                            <Ionicons name="image" size={64} color="#CCCCCC" />

                            <Text
                                style={{
                                    marginTop: 12,
                                    color: "#777",
                                    fontWeight: "600",
                                    fontSize: 16,
                                    textAlign: "center",
                                }}
                            >
                                No infographic available
                            </Text>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: 12,
                        paddingTop: 8,
                        paddingBottom: 16,
                    }}
                >
                    <TouchableOpacity
                        disabled={isFirst}
                        onPress={handleBack}
                        activeOpacity={0.85}
                        style={{
                            flex: 1,
                            backgroundColor: "#F2F2F2",
                            borderRadius: 12,
                            paddingVertical: 18,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: isFirst ? "#999" : "#444",
                                fontWeight: "800",
                                fontSize: 18,
                            }}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleContinue}
                        activeOpacity={0.85}
                        style={{
                            flex: 1,
                            backgroundColor: "#FF4B4B",
                            borderRadius: 12,
                            paddingVertical: 18,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "800",
                                fontSize: 18,
                            }}
                        >
                            {isLast || !hasInfographics ? "Done" : "Continue"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ProfessionalResourceModal;