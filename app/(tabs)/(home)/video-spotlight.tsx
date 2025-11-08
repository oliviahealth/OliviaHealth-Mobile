import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoSpotlight() {
    const [ready, setReady] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {/* Make this container a stacking context */}
            <View style={{ marginHorizontal: -20, marginVertical: -20, position: "relative" }}>
                {/* Player ABOVE the overlay */}
                <YoutubePlayer
                    height={250}
                    play
                    videoId="X1ZzIaug7vU"
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
        </ScrollView>
    );
}
