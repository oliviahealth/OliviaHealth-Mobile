import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function QuickTip() {
    const [ready, setReady] = useState(false);

    const [infographicShown, setInfographicShown] = useState(false);
    const [infographicLoading, setInfographicLoading] = useState(false);

    const toggleInfographic = () => {
        setInfographicShown((v) => {
            const next = !v;
            if (next) {
                setInfographicLoading(true); // start in loading state when showing
            }
            return next;
        });
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 24, }} showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: -20, marginTop: -20, position: "relative" }}>
                <YoutubePlayer
                    height={250}
                    play
                    videoId={"zRPJ8k1pASk"}
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
                        source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Trimesters-Fathers.png" }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                        onLoadStart={() => setInfographicLoading(true)}
                        onLoadEnd={() => setInfographicLoading(false)}
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
                            {"Pregnancy Trimesters for Fathers"}
                        </Text>
                    </View>

                </View>

                <Ionicons name="bookmark-outline" size={28} color="#B642D3" style={{ marginHorizontal: 5 }} />
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Description</Text>

                <Text style={{ fontSize: 14, color: '#888' }}>
                    {"In this video, learn about what to expect your partner to experience throughout pregnancy."}
                </Text>
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

                        { infographicLoading && <ActivityIndicator /> }

                        <Image
                            source={{
                                uri:
                                    "https://oliviahealth.org/wp-content/uploads/2023/03/Trimesters-Explained-for-Fathers-Infographic_NC.png",
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
                        marginTop: 12,
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