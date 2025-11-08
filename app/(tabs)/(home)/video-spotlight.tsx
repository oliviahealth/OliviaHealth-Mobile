import Ionicons from "@expo/vector-icons/Ionicons";
import Markdown from "react-native-markdown-display";
import { useState } from "react";
import { Text, Image, ActivityIndicator, ScrollView, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const content = `
This is **Dr. Downing**, a forensic faculty member here at **Texas A&M School of Nursing**. Today’s topic will be about **domestic violence**.

### **What is domestic violence?**

Domestic violence refers to abuse that occurs between people who are in or have been in an intimate partner or romantic relationship. It can involve **physical abuse**, **psychological or emotional abuse**, and can include **financial or sexual abuse**, or **stalking**.

### **Is it more likely for domestic violence to occur during pregnancy?**

Some statistics suggest that domestic violence, if it’s present in a relationship, may be **more likely to happen during pregnancy**, although in other relationships where abuse has been present, pregnancy may be a honeymoon time for people.

Although pregnancy can be a really exciting time for couples, it can also be a **very stressful time**, and that stress can make abuse more likely to occur.

### **What type of impact does domestic violence have on a person’s mental health or on the pregnancy itself?**

Domestic violence is a **healthcare issue**. It’s unfortunately associated with a lot of health outcomes. For example, women who are in relationships where domestic violence is present are at risk for more **mental health issues** such as **depression, anxiety, suicidal thoughts or self-harm, and substance use**.

During pregnancy, domestic violence can increase a woman’s risk for:

- Not gaining enough weight during pregnancy
- Not being able to take as good care of herself and her growing baby
- **Preterm birth** and **low birth weight**
- **Other birth complications**
- **Higher risk of postpartum depression**

**Thank you.**  
We appreciate you coming out here today and answering your questions. You’re welcome.
`;

export default function VideoSpotlight() {
    const [ready, setReady] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 24, }} showsVerticalScrollIndicator={false}>
            {/* Make this container a stacking context */}
            <View style={{ marginHorizontal: -20, marginTop: -20, position: "relative" }}>
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

            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Downing.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />

                    <View>
                        <Text style={{ fontSize: 26, fontWeight: "500", color: "#000" }}>Maternal Anexity</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}> with Dr.Nancy Downing</Text>
                    </View>
                </View>

                <Ionicons name="bookmark-outline" size={32} color="#B642D3" />
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 24, fontWeight: "500", color: "#000" }}>Description</Text>

                <Text style={{ fontSize: 14, color: '#888' }}>
                    In this video, Dr. Nancy Downing, PHD, RN, SANE-A, SANE-P, FAAN, discusses domestic violence.
                </Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 24, fontWeight: "500", color: "#000" }}>Transcript</Text>

                <Markdown style={{
                    body: { fontSize: 12, lineHeight: 20 },
                }}>
                    { content }
                </Markdown>
            </View>
        </ScrollView>
    );
}
