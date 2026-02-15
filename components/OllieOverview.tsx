import React, { useEffect, useRef } from "react";
import { View, Text, Image, Pressable, Platform, UIManager, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TruncatedTextView } from 'react-native-truncated-text-view';
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface IOllieOverviewResponse {
    response: string;
    response_type: string;
    locations: string[];
    documents: string[];
}

type Props = {
    data: IOllieOverviewResponse | null;
};

function SkeletonLine({ width, height = 12, style }: { width: string | number; height?: number; style?: any }) {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
                Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [shimmer]);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.35, 0.75],
    });

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius: 8,
                    backgroundColor: "rgba(0,0,0,0.10)",
                    opacity,
                },
                style,
            ]}
        />
    );
}

export default function OllieOverviewCard({ data }: Props) {
    const isLoading = data == null;

    return (
        <View style={{  marginTop: 8 }}>
            <View style={{ borderRadius: 18, borderWidth: 1, borderColor: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <LinearGradient
                    colors={["#EDF3FF", "#F3EEFF", "#F6EBF6"]}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.9, y: 0.9 }}
                    style={{ padding: 14 }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={require("../assets/images/ollie_avatar.png")}
                            style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#2E2E2E" }}>Ollie Overview</Text>
                    </View>

                    {/* BODY */}
                    {isLoading ? (
                        <View style={{ marginTop: 10 }}>
                            <SkeletonLine width="92%" height={12} />
                            <SkeletonLine width="86%" height={12} style={{ marginTop: 10 }} />
                            <SkeletonLine width="78%" height={12} style={{ marginTop: 10 }} />
                            <SkeletonLine width="60%" height={12} style={{ marginTop: 10 }} />
                        </View>
                    ) : (
                        
                        // <Text
                        //     style={{ marginTop: 10, fontSize: 14, lineHeight: 22, color: "#3A3A3A" }}
                        //     numberOfLines={expanded ? undefined : 4}
                        // >
                        //     {data.response}  
                        // </Text>

                        <TruncatedTextView
                            text={data.response}
                            numberOfLines={4}
                            lineHeight={22}
                            enableShowLess={false}
                            textPropsChild={{allowFontScaling: false}}
                            textPropsRoot={{allowFontScaling: false}}
                            style={{ marginTop: 10, fontSize: 14, color: "#3A3A3A", backgroundColor: 'transparent' }}
                        />
                    )}

                    {/* CTA */}
                    {!isLoading && (
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    marginTop: 14,
                                    height: 36,
                                    borderRadius: 18,
                                    borderWidth: 1,
                                    borderColor: "rgba(0,0,0,0.12)",
                                    backgroundColor: "rgba(255,255,255,0.9)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                                pressed && { opacity: 0.85 },
                            ]}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="sparkles-outline" size={14} color="#2E2E2E" />
                                <Text style={{ fontSize: 13, fontWeight: "600", marginLeft: 6, color: "#2E2E2E" }}>
                                    Dive deeper with Ollie
                                </Text>
                            </View>
                        </Pressable>
                    )}
                </LinearGradient>
            </View>
        </View>
    );
}
