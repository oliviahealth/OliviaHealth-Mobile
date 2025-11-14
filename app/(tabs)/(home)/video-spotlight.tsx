import useResourcesStore, { ISavedResources, IVideoSpotlights } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoSpotlight() {
    const [ready, setReady] = useState(false);
    const [transcriptShown, setTranscriptShown] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { videoSpotlight } = useLocalSearchParams();
    const videoSpotlightParsed: IVideoSpotlights = JSON.parse(videoSpotlight as string);

    const savedResources = useResourcesStore(state => state.savedResources);
    const setSavedResources = useResourcesStore(state => state.setSavedResources);

    const navigation = useNavigation();

    const addToSavedVideos = () => {
        const currSavedVideos = [...(savedResources?.videos || []), videoSpotlightParsed];
        const newSavedResources: ISavedResources = {
            videos: currSavedVideos,
            infographics: savedResources?.infographics || []
        };
        setSavedResources(newSavedResources);
        AsyncStorage.setItem("savedResources", JSON.stringify(newSavedResources));
        setIsSaved(true);
    }

    const removeFromSavedVideos = () => {
        let currSavedVideos = savedResources?.videos || [];
        currSavedVideos = currSavedVideos.filter(video => video.id !== videoSpotlightParsed.id);
        const newSavedResources: ISavedResources = {
            videos: currSavedVideos,
            infographics: savedResources?.infographics || []
        };
        setSavedResources(newSavedResources);
        AsyncStorage.setItem("savedResources", JSON.stringify(newSavedResources));
        setIsSaved(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: videoSpotlightParsed.title || "Video Spotlight",
        });
    }, [videoSpotlightParsed.title, navigation]);

    useEffect(() => {
        const isVideoSaved = savedResources?.videos.some(video => video.id === videoSpotlightParsed.id);
        setIsSaved(isVideoSaved || false);
    }, [savedResources, videoSpotlightParsed.id]);

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

                <Ionicons 
                    name={isSaved ? "bookmark" : "bookmark-outline"} 
                    size={28} color="#B642D3" 
                    style={{ marginHorizontal: 5 }} 
                    onPress={isSaved ? removeFromSavedVideos : addToSavedVideos}
                />
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
