import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, View, Text } from "react-native";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.5;

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onReset: () => void;
}

export default function SideDrawer({ isOpen, onClose, onReset }: SideDrawerProps) {
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

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
                    <View style={{ gap: 2 }}>
                        <Text style={{ fontWeight: "500", fontSize: 28, color: TINT_COLOR }}>OllieChat</Text>
                        <Text style={{ paddingHorizontal: 2, fontSize: 12 }} >Powered by <Text style={{ color: TINT_COLOR }} >OliviaHealth</Text></Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            {
                                marginTop: 14,
                                height: 36,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: TINT_COLOR,
                                backgroundColor: "rgba(255,255,255,0.9)",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                            pressed && { opacity: 0.85 },
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
            </Animated.View>
        </View>
    );
}
