import { KeyboardAvoidingView, ScrollView, View, Text } from "react-native";
import { TINT_COLOR } from "@/theme";

const PRIMARY = "#16a34a"; // same role as bg-primary

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
                    style={{ paddingVertical: 8, paddingHorizontal: 16, flexShrink: 1, }}
                >
                    {children}
                </View>
            </View>
        </View>
    );
};

export default function Chat() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={40}>
            <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20, gap: 20 }}>
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
                        <ChatBubble isResponse={false}>
                            <Text>Quick Responses</Text>

                            <View>
                                <Text>Where can i find prenatal vitamins?</Text>
                                <Text>Where is a good food pantry near me?</Text>
                                <Text>Where can i find mental health support?</Text>
                            </View>
                        </ChatBubble>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}