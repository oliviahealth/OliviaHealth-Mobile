import { Text, Image, ActivityIndicator, ScrollView, View, TouchableOpacity } from "react-native";
import { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Markdown from "react-native-markdown-display";
import YoutubePlayer from "react-native-youtube-iframe";
import { IVideoSpotlights } from "@/src/store/useResourcesStore";

export default function VideoSpotlight() {
    const [ready, setReady] = useState(false);
    const [transcriptShown, setTranscriptShown] = useState(false);

    const { videoSpotlight } = useLocalSearchParams();
    const videoSpotlightParsed: IVideoSpotlights = JSON.parse(videoSpotlight as string);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: videoSpotlightParsed.title || "Video Spotlight",
        });
    }, [videoSpotlightParsed.title]);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 24, }} showsVerticalScrollIndicator={false}>
            {/* Make this container a stacking context */}
            <View style={{ marginHorizontal: -20, marginTop: -20, position: "relative" }}>
                {/* Player ABOVE the overlay */}
                <YoutubePlayer
                    height={250}
                    play
                    videoId={videoSpotlightParsed.video_id}
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
                        source={{ uri: videoSpotlightParsed.thumbnail_url }}
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
                            {videoSpotlightParsed.title}
                        </Text>

                        <Text style={{ fontSize: 12, color: '#888' }}>
                            {videoSpotlightParsed.subtitle}
                        </Text>
                    </View>

                </View>

                <Ionicons name="bookmark-outline" size={28} color="#B642D3" style={{ marginHorizontal: 5 }} />
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Description</Text>

                <Text style={{ fontSize: 14, color: '#888' }}>
                    {videoSpotlightParsed.video_description}
                </Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 10 }}>
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
                        {videoSpotlightParsed.transcript}
                    </Markdown>
                )}
            </View>
        </ScrollView>
    );
}
