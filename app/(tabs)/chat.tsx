import { KeyboardAvoidingView, ScrollView, View, Text, SafeAreaView, Pressable } from "react-native";
import { TINT_COLOR } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY = "#F5F5F7"; // same role as bg-primary

interface ChatBubbleProps {
    children: React.ReactNode
    isResponse: boolean
    isLocationResponse?: boolean
    isFocused?: boolean
}
const ChatBubble: React.FC<ChatBubbleProps> = ({ children, isResponse, isLocationResponse: isLocation, isFocused: focused }) => {
    return (
        <View
            style={{ width: "100%", flexDirection: "row", justifyContent: isResponse ? "flex-start" : "flex-end", marginVertical: 6, }} >
            <View
                style={{ flexDirection: "row", borderRadius: 16, maxWidth: "100%", backgroundColor: isResponse ? "#ffffff" : PRIMARY, opacity: focused ? 1 : 0.8, }}
            >
                {isLocation && (
                    <View
                        style={{ width: 8, backgroundColor: focused ? PRIMARY : "transparent", borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }}
                    />
                )}

                <View
                    style={{ paddingVertical: 12, paddingHorizontal: 16, flexShrink: 1, }}
                >
                    {children}
                </View>
            </View>
        </View>
    );
};

export default function Chat() {
    const quickResponses = [
        "Where can I find prenatal vitamins?",
        "Where is a good food pantry near me?",
        "Where can I find mental health support?",
    ];

    return (
        <LinearGradient
            colors={["#F8FAFF", "#F6F0FF", "#FFF6FA"]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={40}>
                    <View style={{ flex: 1, paddingTop: 20, paddingBottom: 5, paddingHorizontal: 20, gap: 20 }}>
                        <View style={{ gap: 2 }}>
                            <Text style={{ fontWeight: "500", fontSize: 32, color: TINT_COLOR }}>OllieChat</Text>
                            <Text style={{ paddingHorizontal: 2 }} >Powered by <Text style={{ color: TINT_COLOR }} >OliviaHealth</Text></Text>
                        </View>

                        <ScrollView
                            contentContainerStyle={{
                                gap: 18,
                                flexGrow: 1,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <ChatBubble isResponse={true}>
                                    <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }} >Quick Responses</Text>

                                    <View style={{ gap: 12 }}>
                                        {quickResponses.map((quickResponse, index) => (
                                            <Pressable
                                                key={index}
                                            >
                                                {({ pressed }) => (
                                                    <Text
                                                        style={{
                                                            color: pressed ? "rgba(102,20,41,0.85)" : "#661429",
                                                        }}
                                                    >
                                                        {quickResponse}
                                                    </Text>
                                                )}
                                            </Pressable>

                                        ))}
                                    </View>
                                </ChatBubble>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}