import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView, View, Image, Text, ActivityIndicator } from "react-native";
import useResourcesStore, { IQuickTips } from "@/src/store/useResourcesStore";

export default function Infographic() {
    const [isSaved, setIsSaved] = useState(false);
    const [infographicLoading, setInfographicLoading] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingHorizontal: 20, gap: 18, }} showsVerticalScrollIndicator={false}>

            <View style={{
                flexDirection: 'row',
                width: "100%",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center", flex: 1 }}>
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

                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={28} color="#B642D3"
                    style={{ marginHorizontal: 5 }}
                // onPress={isSaved ? () => removeFromSavedResources('quick_tips', quickTipParsed.id) : () => addToSavedResources('quick_tips', quickTipParsed.id)}
                />
            </View>

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


        </ScrollView>
    )
}