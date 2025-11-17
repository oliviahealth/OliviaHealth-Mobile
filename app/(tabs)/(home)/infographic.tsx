import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View, Image, Text, ActivityIndicator } from "react-native";
import useResourcesStore, { IInfographics } from "@/src/store/useResourcesStore";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function Infographic() {
    const [isSaved, setIsSaved] = useState(false);
    const [infographicLoading, setInfographicLoading] = useState(false);

    const { infographic } = useLocalSearchParams();
    const infographicParsed: IInfographics = JSON.parse(infographic as string);

    const navigation = useNavigation();

    const savedResources = useResourcesStore(state => state.savedResources);
    const addToSavedResources = useResourcesStore(state => state.addToSavedResources);
    const removeFromSavedResources = useResourcesStore(state => state.removeFromSavedResources);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: infographicParsed.title || "Infographic",
        });
    }, [infographicParsed.title]);

    useEffect(() => {
        const isInfographicSaved = savedResources?.infographics.includes(infographicParsed.id);
        setIsSaved(isInfographicSaved || false);

    }, [savedResources, infographicParsed.id]);

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
                        {infographicParsed.title}
                    </Text>
                </View>

                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={28} color="#B642D3"
                    style={{ marginHorizontal: 5 }}
                    onPress={isSaved ? () => removeFromSavedResources('infographics', infographicParsed.id) : () => addToSavedResources('infographics', infographicParsed.id)}
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
                            infographicParsed.infographic_url,
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