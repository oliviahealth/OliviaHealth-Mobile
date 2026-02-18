import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, Text, TouchableOpacity, UIManager, View } from "react-native";
import { useRouter } from "expo-router";
import { TruncatedTextView } from 'react-native-truncated-text-view';

import useResourcesStore, { IResources, IResourceItem } from "@/src/store/useResourcesStore";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface IOllieOverviewResponse {
    response: string;
    response_type: string;
    locations: string[];
    documents: string[];
}

type OllieOverviewProps = {
    data: IOllieOverviewResponse | null;
    isError: boolean
    isLoading: boolean
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

export default function OllieOverviewCard({ data, isError, isLoading }: OllieOverviewProps) {
    const router = useRouter();
    const resources = useResourcesStore(state => state.resources);

    const [sources, setSources] = useState<{ doc: IResourceItem; type: string; }[]>();

    // link the resouces to data.sources
    const fetchSources = (dataSources: string[], resources: IResources) => {
        const res: { doc: any; type: string; }[] = [];

        for (const [key, resources_arr] of Object.entries(resources)) {
            for (const doc of resources_arr) {
                if (dataSources.includes(doc.id)) {
                    res.push({ 'doc': doc, 'type': key });
                }
            }
        }

        return res;
    }

    const navigateToSource = (source: { doc: IResourceItem; type: string }) => {
        switch (source.type) {
            case "infographics":
                router.push({
                    pathname: "/(tabs)/(home)/infographic",
                    params: { infographic: JSON.stringify(source.doc) },
                });
                break;

            case "local_resources":
                router.push({
                    pathname: "/(tabs)/(home)/local-resource",
                    params: { localResource: JSON.stringify(source.doc) },
                });
                break;

            case "video_spotlights":
                router.push({
                    pathname: "/(tabs)/(home)/video-spotlight",
                    params: { videoSpotlight: JSON.stringify(source.doc) },
                });
                break;

            case "quick_tips":
                router.push({
                    pathname: "/(tabs)/(home)/quick-tip",
                    params: { quickTip: JSON.stringify(source.doc) },
                });
                break;

            default:
                console.warn("Unknown source type:", source.type);
        }
    };

    // link data.documents to resources
    useEffect(() => {
        if (!resources) return;

        const referenceSources = fetchSources(data?.documents ?? [], resources);
        setSources(referenceSources);

    }, [data?.documents, resources])

    return (
        <View style={{ marginVertical: 10 }}>
            <View
                style={{
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.06)",
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={["#F8FAFF", "#F6F0FF", "#FFF6FA"]}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 14 }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={require("../assets/images/ollie_avatar.png")}
                            style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#2E2E2E" }}>
                            Ollie Overview
                        </Text>
                    </View>

                    {/* BODY */}
                    {isLoading ? (
                        <View style={{ marginTop: 10 }}>
                            <SkeletonLine width="92%" height={12} />
                            <SkeletonLine width="86%" height={12} style={{ marginTop: 10 }} />
                            <SkeletonLine width="78%" height={12} style={{ marginTop: 10 }} />
                            <SkeletonLine width="60%" height={12} style={{ marginTop: 10 }} />
                        </View>
                    )
                        : isError ? (
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, color: "#2E2E2E" }}>
                                    Couldn&apos;t load Ollie overview, please try again later.
                                </Text>
                            </View>
                        )
                            : data?.response && sources ? (
                                <TruncatedTextView
                                    numberOfLines={4}
                                    lineHeight={28}
                                    enableShowLess={false}
                                    textPropsChild={{ allowFontScaling: false }}
                                    textPropsRoot={{ allowFontScaling: false }}
                                    style={{
                                        marginTop: 10,
                                        fontSize: 14,
                                        color: "#444",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <View style={{ marginTop: 12 }}>
                                        <Text>{data.response}</Text>

                                        {sources.map((source, index) => (
                                            <TouchableOpacity
                                                key={source.doc.id}
                                                activeOpacity={0.6}
                                                onPress={() => navigateToSource(source)}
                                                style={{
                                                    alignSelf: "flex-start",
                                                    marginTop: index === 0 ? 12 : 6,
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 6,
                                                    borderRadius: 12,
                                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                }}
                                            >
                                                <View style={{ display: 'flex', flexDirection: "row",  alignItems: "center", gap: 4 }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: "#555",
                                                            fontWeight: "500",
                                                        }}
                                                        numberOfLines={1}
                                                    >
                                                        {source.doc.title}
                                                    </Text>
                                                    <Ionicons name="chevron-forward-outline" />
                                                </View>
                                            </TouchableOpacity>
                                        ))}

                                    </View>
                                </TruncatedTextView>
                            ) : (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontSize: 14, color: "#2E2E2E" }}>
                                        Couldn&apos;t load Ollie overview, please try again later.
                                    </Text>
                                </View>
                            )}

                    {/* CTA (only on success) */}
                    {/* {data?.response && sources && (
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
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "600",
                                        marginLeft: 6,
                                        color: "#2E2E2E",
                                    }}
                                >
                                    Dive deeper with Ollie
                                </Text>
                            </View>
                        </Pressable>
                    )} */}
                </LinearGradient>
            </View>
        </View>
    );
}
