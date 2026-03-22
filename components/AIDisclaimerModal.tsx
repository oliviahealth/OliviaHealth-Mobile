import React, { useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    visible: boolean;
    denyVisible?: boolean;
    onAccept: () => void;
    onDeny?: () => void;
}

export default function AIDisclaimerModal({ visible, denyVisible, onAccept, onDeny }: Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        if (visible) {
            opacity.setValue(0);
            scale.setValue(0.95);

            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                    damping: 15,
                }),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={{ flex: 1 }}>
                <BlurView
                    intensity={40}
                    tint="dark"
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                />

                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        opacity,
                    }}
                >
                    <Animated.View
                        style={{
                            width: "100%",
                            maxWidth: 520,
                            backgroundColor: "#F7F7F8",
                            borderRadius: 26,
                            paddingHorizontal: 22,
                            paddingTop: 28,
                            paddingBottom: 22,
                            transform: [{ scale }],
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 18,
                            }}
                        >
                            <Ionicons name="sparkles-outline" size={52} color="#B642D3" />
                        </View>

                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "800",
                                color: "#111",
                                textAlign: "center",
                                marginBottom: 14,
                            }}
                        >
                            AI Disclaimer
                        </Text>

                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 24,
                                color: "#8A8A8A",
                                textAlign: "center",
                                fontWeight: "600",
                                marginBottom: 22,
                            }}
                        >
                            Olivia HealthCare uses third-party AI services (OpenAI) and a proprietary model to generate search results and responses.
                            {"\n\n"}
                            When you use these features, your input (e.g., search queries or messages) is sent securely for processing. This data is used only to generate responses and is not linked to your identity.
                            {"\n\n"}
                            Please avoid entering sensitive personal or medical information. This app provides informational content only and does not offer medical advice.
                            {"\n\n"}
                            Please consent to this data being processed by these services.
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                marginTop: 10,
                            }}
                        >
                            {denyVisible && (
                                <TouchableOpacity
                                    onPress={onDeny}
                                    activeOpacity={0.8}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 14,
                                        borderRadius: 16,
                                        alignItems: "center",
                                        backgroundColor: "#ECECEC",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "700",
                                            color: "#555",
                                        }}
                                    >
                                        Deny
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {/* Accept */}
                            <TouchableOpacity
                                onPress={onAccept}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    paddingVertical: 14,
                                    borderRadius: 16,
                                    alignItems: "center",
                                    backgroundColor: "#B642D3",
                                    shadowColor: "#B642D3",
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 4 },
                                    elevation: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "800",
                                        color: "white",
                                    }}
                                >
                                    Consent
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </Modal >
    );
}