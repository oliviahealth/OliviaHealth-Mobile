import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text, Image, ScrollView, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Markdown from "react-native-markdown-display";
import YoutubePlayer from "react-native-youtube-iframe";

export default function LocalResource() {
    const [ready, setReady] = useState(false);
    const [transcriptShown, setTranscriptShown] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 24, }} showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: -20, marginTop: -20, position: "relative" }}>
                <YoutubePlayer
                    height={250}
                    play
                    videoId={"49x9YhrSOsk"}
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
                        source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/04/AA-768x432.png" }}
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
                            {"Alcoholics Anonymous"}
                        </Text>

                        <Text style={{ fontSize: 12, color: '#888' }}>
                            {"Local resources from the Brazos Valley-College Station area."}
                        </Text>
                    </View>

                </View>

                <Ionicons name="bookmark-outline" size={28} color="#B642D3" style={{ marginHorizontal: 5 }} />
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Description</Text>

                <Text style={{ fontSize: 14, color: '#888' }}>
                    {"Test Description"}
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
                        {"### **Alcoholics Anonymous — Brazos Valley**\n\nIf you have a desire to **stop drinking** for any reason — or if you are looking for resources to help someone you know — you are in the right place.\n\n---\n\n### **What is Alcoholics Anonymous (AA)?**\n\n**Alcoholics Anonymous (AA)** is a **fellowship of people** who come together to help one another solve their drinking problem.\n\n- It is **free** to attend meetings.\n- There are **no age or education requirements**.\n- Membership is open to **anyone who wants to do something** about their drinking.\n\n---\n\n### **What to Expect at a Meeting**\n\n1. The **chairperson** opens the meeting with brief remarks.\n2. Some meetings begin with a **moment of silence** and/or the **Serenity Prayer**.\n3. The chair may ask if **any newcomers** are present (sharing is optional).\n4. A reading is shared from the **AA Big Book** or similar material.\n5. Members **share personal experiences** related to recovery.\n\nMeetings may be **in-person** or **virtual**.\n\n---\n\n### **How to Find Meetings in Brazos Valley**\n\n1. Search **“Brazos Valley Alcoholics Anonymous”** on Google.\n2. Click the first link.\n3. Select **“Meetings”** at the top of the page.\n4. Browse or use **filters** to narrow by day, time, location, or meeting type.\n\nWhen you select a meeting, you’ll see:\n- **Time & date**\n- **Location or virtual link**\n- **What to bring**, if anything\n\n---\n\n### **Need Help or Have Questions?**\n\nClick **“Contact Us”** on the AA home page to find:\n- A **phone number**\n- An **email address**\n- **Office hours**\n\n---\n\n**You are not alone. We hope to see you there.**\n\n---"}
                    </Markdown>
                )}
            </View>

        </ScrollView>
    )
}