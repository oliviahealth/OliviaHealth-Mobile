import LoadingDot from "@/components/LoadingDot";
import { TINT_COLOR } from "@/theme";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import Ionicons from '@expo/vector-icons/Ionicons';

import { IOllieResponse, OllieResponseSchema } from "@/src/utils/interfaces";
import parseWithZod from "@/src/utils/parseWithZod";
import { useLocalSearchParams } from "expo-router";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const PRIMARY = "#F5F5F7"; // same role as bg-primary
const OLLIE_URL = process.env.EXPO_PUBLIC_OLLIE_URL!;

interface ChatBubbleProps {
    children: React.ReactNode
    isResponse: boolean
    isLocationResponse?: boolean
    isFocused?: boolean
    background?: boolean
}
const ChatBubble: React.FC<ChatBubbleProps> = ({ children, isResponse, isLocationResponse: isLocation, isFocused: focused, background = true }) => {
    return (
        <View
            style={{ width: "100%", flexDirection: "row", justifyContent: isResponse ? "flex-start" : "flex-end", marginVertical: 6, }} >
            <View style={{ flexDirection: "row", borderRadius: 16, maxWidth: "100%", backgroundColor: background ? "#ffffff" : "transparent", opacity: focused ? 1 : 0.8, }}>
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
    const { conversationIdParam, ollieResponseParam } = useLocalSearchParams<{ conversationIdParam: string, ollieResponseParam: string }>();

    const [conversationId, setConversationId] = useState(uuid());

    const [query, setQuery] = useState<string>();

    const [submittedQuery, setSubmittedQuery] = useState<null | string>(null);
    const [ollieResponses, setOllieResponses] = useState<IOllieResponse[]>([]);

    useEffect(() => {
        if (!ollieResponseParam) return;
        const lastResponse = JSON.parse(ollieResponseParam).data;

        setOllieResponses([lastResponse]);
        setConversationId(conversationIdParam);

    }, [conversationIdParam, ollieResponseParam])

    const handleInputSubmit = () => {
        if (!query?.trim()) return;

        const submitQuery = query;
        setQuery("")

        getResponse({ query: submitQuery });
    }

    const { mutate: getResponse, isPending: ollieRepsonsePending } = useMutation({
        mutationFn: async (data: { query: string }) => {
            if (data.query === "") return;

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
            const ollieReponsesCopy = [...ollieResponses];
            ollieReponsesCopy.push(data);

            setOllieResponses(ollieReponsesCopy);
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
                        <Pressable>
                            <Ionicons size={24} name="menu-outline" color={TINT_COLOR} />
                        </Pressable>

                        <ScrollView
                            contentContainerStyle={{
                                gap: 18,
                                flexGrow: 1,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>

                                {
                                    ollieResponses.map((ollieResponse, index) => (
                                        (
                                            <View key={`OllieResponse-${index}`}>
                                                <ChatBubble isResponse={false}>
                                                    <Markdown>
                                                        {ollieResponse.userQuery}
                                                    </Markdown>
                                                </ChatBubble>

                                                <ChatBubble isResponse={true}>
                                                    <Markdown>
                                                        {ollieResponse.response}
                                                    </Markdown>
                                                </ChatBubble>
                                            </View>
                                        )
                                    ))
                                }

                                {submittedQuery && (
                                    <ChatBubble isResponse={false}>
                                        <Text>{submittedQuery}</Text>
                                    </ChatBubble>
                                )}

                                {ollieRepsonsePending && (
                                    <ChatBubble isResponse={true} background={false}>
                                        <LoadingDot />
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
                                        backgroundColor: pressed ? "#a138bb" : TINT_COLOR,
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