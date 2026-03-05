import { TINT_COLOR } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useConversationsStore, { IConversation } from "@/src/store/useConversationsStores";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.6;

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onReset: () => void;
    restoreConversation: (conversation: IConversation) => void
    deleteConversation: (conversationId: string) => void
    currentConversationId?: string
}

export default function SideDrawer({ isOpen, onClose, onReset, restoreConversation, deleteConversation, currentConversationId }: SideDrawerProps) {
    const conversations = useConversationsStore(state => state.conversations);

    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const [menuPosition, setMenuPosition] = useState({ top: 0 });
    const itemRefs = useRef<Record<string, View | null>>({});

    const insets = useSafeAreaInsets();

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
                <Pressable style={{ flex: 1 }} onPress={() => {
                    onClose(); // dismiss drawer

                    // wait for animation to complete before dismissing options menu (if open)
                    setTimeout(() => {
                        setOptionsMenuOpen(false);
                        setSelectedConversationId(null);
                    }, 250)
                }} />
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
                <View style={{ paddingHorizontal: 12, paddingVertical: 24, gap: 20, height: '100%' }} >
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
                        {Object.values(conversations).map((conversation, index) => (
                            <View key={conversation.id ?? `recentchat-${index}`} style={{ position: "relative" }} ref={(el) => { itemRefs.current[conversation.id] = el; }} >
                                <Pressable
                                    onPress={() => restoreConversation(conversation)}
                                    onLongPress={() => {
                                        const ref = itemRefs.current[conversation.id];
                                        if (ref) {
                                            ref.measureInWindow((x, y, width, height) => {
                                                setMenuPosition({ top: y + height / 2 - 32 }); // center menu on item
                                            });
                                        }
                                        setSelectedConversationId(conversation.id);
                                        setOptionsMenuOpen(true);
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                    }}
                                    delayLongPress={300}
                                    style={({ pressed }) => ({
                                        paddingVertical: 8,
                                        paddingHorizontal: 14,
                                        borderRadius: 14,
                                        backgroundColor:
                                            pressed || currentConversationId === conversation.id ? "#F2F2F2" : "transparent",
                                        opacity: pressed ? 0.9 : 1,
                                        transform: [{ scale: (optionsMenuOpen && selectedConversationId === conversation.id) ? 0.96 : 1 }],
                                    })}
                                >
                                    <Text style={{ color: "#222222", lineHeight: 18 }}>
                                        {conversation.title}
                                    </Text>
                                </Pressable>


                            </View>
                        ))}
                    </ScrollView>

                    {optionsMenuOpen && (
                        <View
                            style={[StyleSheet.absoluteFillObject, { zIndex: 50 }]}
                            pointerEvents="box-none"
                        >
                            {/* tap-anywhere-to-close overlay (BEHIND menu) */}
                            <Pressable
                                style={[StyleSheet.absoluteFillObject, { zIndex: 50 }]}
                                onPress={() => {
                                    setOptionsMenuOpen(false);
                                    setSelectedConversationId(null);
                                }}
                            />

                            {/* menu (ABOVE overlay) */}
                            <View
                                style={{
                                    position: "absolute",
                                    top: menuPosition.top,
                                    right: 25,
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.15,
                                    shadowRadius: 8,
                                    elevation: 5,
                                    minWidth: 140,
                                    zIndex: 60,
                                    padding: 6,
                                }}
                                pointerEvents="auto"
                            >
                                <Pressable
                                    onPress={() => {
                                        if (selectedConversationId) {
                                            deleteConversation(selectedConversationId);
                                        }
                                        setOptionsMenuOpen(false);
                                        setSelectedConversationId(null);
                                    }}
                                    style={({ pressed }) => ({
                                        borderRadius: 6,
                                        backgroundColor: pressed ? "#F2F2F2" : "transparent",
                                    })}
                                >
                                    <View
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 5,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ color: "red" }}>Delete</Text>
                                        <Ionicons size={18} name="trash-outline" color="red" />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </View>
            </Animated.View>
        </View>
    );
}
