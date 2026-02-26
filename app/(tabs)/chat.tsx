import { TINT_COLOR } from "@/theme";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

import { IOllieResponse, OllieResponseSchema } from "@/src/utils/interfaces";
import parseWithZod from "@/src/utils/parseWithZod";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const PRIMARY = "#F5F5F7"; // same role as bg-primary
const OLLIE_URL = process.env.EXPO_PUBLIC_OLLIE_URL!;

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
            <View style={{ flexDirection: "row", borderRadius: 16, maxWidth: "100%", backgroundColor: "#ffffff", opacity: focused ? 1 : 0.8, }}>
                {isLocation && (
                    <View style={{ width: 8, backgroundColor: focused ? PRIMARY : "transparent", borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }} />
                )}

                <View style={{ paddingVertical: 12, paddingHorizontal: 16, flexShrink: 1, }} >
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

    const [query, setQuery] = useState<string>();

    const [submittedQuery, setSubmittedQuery] = useState<null | string>(null);
    const [apiResponse, setApiResponse] = useState<IOllieResponse>();

    const handleQuickResponseSubmit = (query: string) => {
        getResponse({ query });
    }

    const handleInputSubmit = () => {
        if (!query?.trim()) return;

        const submitQuery = query;
        setQuery("")

        getResponse({ query: submitQuery });
    }

    const { mutate: getResponse } = useMutation({
        mutationFn: async (data: { query: string }) => {
            if (data.query === "") return;

            const conversationId = uuid();

            const formData = new FormData();
            formData.append("data", data.query);
            formData.append("conversationId", conversationId);

            const res = await fetch(
                `${OLLIE_URL}/formattedresults`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            const response: IOllieResponse = await res.json();
            parseWithZod(response, OllieResponseSchema);

            return response;
        },
        onMutate(variables, context) {
            const { query } = variables;
            setSubmittedQuery(query);
        },
        onSettled() {
            setSubmittedQuery(null);
        },
        onError() {
            console.error("Something went wrong");
        },
        onSuccess: async (data) => {
            if (!data) return;
            setApiResponse(data);
        }
    },);

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
                    <View style={{ flex: 1, paddingTop: 20, paddingBottom: 5, paddingHorizontal: 20, gap: 8 }}>
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
                                                onPress={() => handleQuickResponseSubmit(quickResponse)}
                                            >
                                                {({ pressed }) => (
                                                    <Text
                                                        style={{
                                                            color: pressed ? "#a138bb" : TINT_COLOR,
                                                        }}
                                                    >
                                                        {quickResponse}
                                                    </Text>
                                                )}
                                            </Pressable>

                                        ))}
                                    </View>
                                </ChatBubble>

                                {apiResponse && (
                                    <>
                                        <ChatBubble isResponse={false}>
                                            <Text>{apiResponse.userQuery}</Text>
                                        </ChatBubble>

                                        <ChatBubble isResponse={true}>
                                            <Text>{apiResponse.response}</Text>
                                        </ChatBubble>
                                    </>
                                )}

                                {submittedQuery && (
                                    <ChatBubble isResponse={false}>
                                        <Text>{submittedQuery}</Text>
                                    </ChatBubble>
                                )}

                            </View>
                        </ScrollView>

                        <View style={{ paddingBottom: 6 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    borderRadius: 22,            // smaller pill
                                    paddingLeft: 14,
                                    paddingRight: 8,
                                    paddingVertical: 4,          // ↓ shorter height
                                    borderWidth: 1,
                                    borderColor: "rgba(0,0,0,0.05)",
                                    shadowColor: "#000",
                                    shadowOpacity: 0.05,
                                    shadowRadius: 6,
                                    shadowOffset: { width: 0, height: 4 },
                                    elevation: 1,
                                }}
                            >
                                <TextInput
                                    placeholder="Message"
                                    value={query}
                                    onChangeText={(text) => setQuery(text)}
                                    onSubmitEditing={handleInputSubmit}
                                    placeholderTextColor="rgba(0,0,0,0.35)"
                                    style={{
                                        flex: 1,
                                        fontSize: 15,              // ↓ smaller text
                                        paddingRight: 8,
                                        color: "#111",
                                    }}
                                    returnKeyType="send"
                                />

                                <Pressable
                                    style={({ pressed }) => ({
                                        width: 34,                 // ↓ smaller button
                                        height: 34,
                                        borderRadius: 17,
                                        backgroundColor: pressed ? "#8A6BFF" : "#7B61FF",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    })}
                                    onPress={handleInputSubmit}
                                >
                                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
                                        ↑
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}