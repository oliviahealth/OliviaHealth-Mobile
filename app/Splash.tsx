import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const BG_WIDTH = 360;
const BG_HEIGHT = 800;

const bgScale = width / BG_WIDTH;
const bgRenderedHeight = BG_HEIGHT * bgScale;
const bgTop = (height - bgRenderedHeight) / 2;

const SHEET_HEIGHT = 350;

function MenuCard({ title, subtitle, children, onPress }: any) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                width: (width - 16 * 2 - 12) / 2,
                minHeight: 136,
                borderRadius: 24,
                paddingHorizontal: 14,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FBF6FF",
                shadowColor: "#000",
                shadowOpacity: 0.14,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 6,
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.94 : 1,
            })}
        >
            <View
                style={{
                    height: 52,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                }}
            >
                {children}
            </View>
``
            <Text
                style={{
                    color: "#2A2230",
                    fontSize: 14,
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: 4,
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    color: "#8B7D92",
                    fontSize: 11,
                    lineHeight: 15,
                    textAlign: "center",
                }}
            >
                {subtitle}
            </Text>
        </Pressable>
    );
}

export default function IntroScreen() {
    const [visible] = useState(true);

    const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT + 40)).current;
    const sheetOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(sheetTranslateY, {
                toValue: 0,
                damping: 20,
                stiffness: 150,
                mass: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(sheetOpacity, {
                toValue: 1,
                duration: 260,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            
            <Image
                source={require("../assets/images/olivia-splash.png")}
                style={{
                    width: '100%',
                    height: '100%'
                }}
                resizeMode="cover"
            />

            <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Animated.View
                        style={{
                            minHeight: SHEET_HEIGHT,
                            paddingHorizontal: 16,
                            paddingTop: 10,
                            paddingBottom: 22,
                            borderTopLeftRadius: 28,
                            borderTopRightRadius: 28,
                            opacity: sheetOpacity,
                            transform: [{ translateY: sheetTranslateY }],
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 20,
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: 6,
                            }}
                        >
                            Select a path
                        </Text>

                        <Text
                            style={{
                                color: "rgba(255,255,255,0.86)",
                                fontSize: 13,
                                textAlign: "center",
                                marginBottom: 18,
                            }}
                        >
                            Where would you like to go?
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                rowGap: 12,
                            }}
                        >
                            <MenuCard
                                title="Olivia Journey"
                                subtitle="Progress at your speed"
                            >
                                <View
                                    style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 27,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#F4E9FF",
                                    }}
                                >
                                    <MaterialCommunityIcons name="orbit" size={30} color="#B642D3" />
                                </View>
                            </MenuCard>

                            <MenuCard
                                title="Chat with Oli"
                                subtitle="Answer all things parenthood"
                            >
                                <View
                                    style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 27,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#F4E9FF",
                                        borderWidth: 1,
                                        borderColor: "#E7D5FF",
                                    }}
                                >
                                    <Ionicons name="sparkles" size={24} color="#B642D3" />
                                </View>
                            </MenuCard>

                            <MenuCard
                                title="Library"
                                subtitle="Browse all our content"
                            >
                                <View
                                    style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 27,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#F4E9FF",
                                    }}
                                >
                                    <Feather name="book-open" size={26} color="#B642D3" />
                                </View>
                            </MenuCard>

                            <MenuCard
                                title="About us"
                                subtitle="Learn about the Olivia team"
                            >
                                <View
                                    style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 27,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#F4E9FF",
                                    }}
                                >
                                    <Ionicons name="information-circle-outline" size={28} color="#B642D3" />
                                </View>
                            </MenuCard>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}