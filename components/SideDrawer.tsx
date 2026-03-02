import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.6;

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onReset: () => void;
}

export default function SideDrawer({ isOpen, onClose, onReset }: SideDrawerProps) {
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const insets = useSafeAreaInsets();

    const recentChats = [
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?',
        'Where can i find prenatal vitamins?'
    ]

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: isOpen ? 0 : -DRAWER_WIDTH,
                useNativeDriver: true,
                damping: 20,
                stiffness: 180,
            }),
            Animated.timing(overlayOpacity, {
                toValue: isOpen ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isOpen]);

    return (
        <View style={{ position: "absolute", inset: 0, zIndex: 20 }} pointerEvents={isOpen ? "auto" : "none"}>
            {/* Dim overlay */}
            <Animated.View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", opacity: overlayOpacity }}>
                <Pressable style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* Drawer */}
            <Animated.View style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0,
                width: DRAWER_WIDTH,
                backgroundColor: "rgba(255,255,255)",
                shadowColor: "#7C3AED",
                shadowOpacity: 0.12,
                shadowRadius: 16,
                shadowOffset: { width: 6, height: 0 },
                elevation: 10,
                transform: [{ translateX }],
            }}>
                <View style={{ paddingHorizontal: 12, paddingVertical: 24, gap: 20 }}>
                    <View style={{ gap: 2, paddingHorizontal: 8 }}>
                        <Text style={{ fontWeight: "500", fontSize: 28, color: TINT_COLOR }}>OllieChat</Text>
                        <Text style={{ paddingHorizontal: 2, fontSize: 12 }} >Powered by <Text style={{ color: TINT_COLOR }} >OliviaHealth</Text></Text>
                    </View>

                    <View style={{ paddingHorizontal: 8 }}>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    marginTop: 14,
                                    height: 36,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: TINT_COLOR,
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    // iOS shadow (soft glow)
                                    shadowColor: TINT_COLOR,
                                    shadowOpacity: 0.05,
                                    shadowRadius: 14,

                                    // Android shadow
                                    elevation: 6,
                                },
                                pressed && {
                                    opacity: 0.85,
                                    transform: [{ scale: 0.98 }],
                                },
                            ]}
                            onPress={onReset}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="add-outline" size={14} color={TINT_COLOR} />
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "600",
                                        marginLeft: 6,
                                        color: TINT_COLOR,
                                    }}
                                >
                                    New Chat
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        paddingVertical: 10,
                        paddingBottom: insets.bottom + 100,
                        gap: 8,
                    }}>
                        {recentChats.map((recentChat, index) => (
                            <Pressable
                                key={`recentchat-${index}`}
                                style={({ pressed }) => ({
                                    paddingVertical: 8,
                                    paddingHorizontal: 14,
                                    borderRadius: 14,

                                    // Light gray on press
                                    backgroundColor: pressed ? "#F2F2F2" : "transparent",

                                    // Keep subtle depth
                                    shadowColor: "#000",
                                    opacity: pressed ? 0.9 : 1,
                                })}
                            >
                                <Text
                                    style={{
                                        color: "#222222",
                                        lineHeight: 18,
                                    }}
                                >
                                    Where can I find prenatal vitamins?
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Animated.View>
        </View>
    );
}
