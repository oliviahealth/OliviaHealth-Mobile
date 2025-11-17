import useResourcesStore, { IQuickTips } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import YoutubePlayer from "react-native-youtube-iframe";

export default function QuickTip() {
    const [ready, setReady] = useState(false);
    const [transcriptShown, setTranscriptShown] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [infographicShown, setInfographicShown] = useState(false);
    const [infographicLoading, setInfographicLoading] = useState(false);

    const { quickTip } = useLocalSearchParams();
    const quickTipParsed: IQuickTips = JSON.parse(quickTip as string);

    const savedResources = useResourcesStore(state => state.savedResources);
    const addToSavedResources = useResourcesStore(state => state.addToSavedResources);
    const removeFromSavedResources = useResourcesStore(state => state.removeFromSavedResources);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: quickTipParsed.title || "Quick Tip",
        });
    }, [quickTipParsed.title]);

    const toggleInfographic = () => {
        setInfographicShown((v) => {
            const next = !v;
            if (next) {
                setInfographicLoading(true); // start in loading state when showing
            }
            return next;
        });
    };

    useEffect(() => {
        const isQuickTipSaved = savedResources?.quick_tips.includes(quickTipParsed.id);
        setIsSaved(isQuickTipSaved || false);
    }, [savedResources, quickTipParsed.id]);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 24, }} showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: -20, marginTop: -20, position: "relative" }}>
                <YoutubePlayer
                    height={250}
                    play
                    videoId={quickTipParsed.video_id}
                    onReady={() => setReady(true)}
                    webViewStyle={{ zIndex: 2, elevation: 2 }}
                    webViewProps={{
                        androidLayerType: "hardware",
                        allowsFullscreenVideo: true,
                        allowsInlineMediaPlayback: true,
                        style: { backgroundColor: "transparent" }
                    }}
                />

                {/* Loading overlay UNDER the player */}
                {!ready && (
                    <View
                        pointerEvents="none"
                        style={{
                            position: "absolute",
                            inset: 0,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            zIndex: 1,  // lower than player
                            elevation: 1
                        }}
                    >
                        <ActivityIndicator />
                    </View>
                )}
            </View>

            <View style={{
                flexDirection: 'row',
                width: "100%",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center", flex: 1 }}>

                    <Image
                        source={{ uri: quickTipParsed.thumbnail_url }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                    />

                    <View style={{ flexShrink: 1 }}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "600",
                                color: "#000",
                                flexWrap: "wrap"
                            }}
                        >
                            {quickTipParsed.title}
                        </Text>
                    </View>

                </View>

                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={28} color="#B642D3"
                    style={{ marginHorizontal: 5 }}
                    onPress={isSaved ? () => removeFromSavedResources('quick_tips', quickTipParsed.id) : () => addToSavedResources('quick_tips', quickTipParsed.id)}
                />
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Description</Text>

                <Text style={{ fontSize: 14, color: '#888' }}>
                    {quickTipParsed.description}
                </Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Transcript</Text>
                    <Text style={{ fontSize: 12, color: '#888' }}>Follow along with the video transcript</Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        marginTop: 8,
                        alignItems: "center",
                    }}
                    onPress={() => setTranscriptShown(!transcriptShown)}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {transcriptShown ? 'Hide Transcript' : 'Show Transcript'}
                    </Text>
                </TouchableOpacity>

                {transcriptShown && (
                    <Markdown style={{
                        body: { fontSize: 12, lineHeight: 20, color: "#888" },
                    }}>
                        {quickTipParsed.transcript}
                    </Markdown>
                )}
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Infographic</Text>
                </View>

                {infographicShown && (
                    <View
                        style={{
                            marginTop: 10,
                            borderRadius: 16,
                            overflow: "hidden",
                            position: "relative",
                            width: "100%",
                            // This creates a predictable box for the image + spinner
                            aspectRatio: 0.4, // adjust if your image ratio differs
                        }}
                    >

                        {infographicLoading && <ActivityIndicator />}

                        <Image
                            source={{
                                uri:
                                    quickTipParsed.infographic_url,
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="contain"
                            resizeMethod="scale"
                            onLoadStart={() => setInfographicLoading(true)}
                            onLoadEnd={() => setInfographicLoading(false)}
                            onError={(e) => {
                                setInfographicLoading(false);
                                console.log("Image error:", e.nativeEvent);
                            }}
                        />

                    </View>
                )}

                <TouchableOpacity
                    onPress={toggleInfographic}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        marginTop: 10,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {infographicShown ? "Hide Infographic" : "Show Infographic"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}