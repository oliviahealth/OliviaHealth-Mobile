import LoadingDot from "@/components/LoadingDot";
import { TINT_COLOR } from "@/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Markdown from 'react-native-markdown-display';

import SideDrawer from "@/components/SideDrawer";

import useResourcesStore, { IResourceItem } from "@/src/store/useResourcesStore";
import fetchSources from "@/src/utils/fetchSources";
import { IOllieResponse, OllieResponseSchema } from "@/src/utils/interfaces";
import parseWithZod from "@/src/utils/parseWithZod";
import { useLocalSearchParams, useRouter } from "expo-router";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const OLLIE_URL = process.env.EXPO_PUBLIC_OLLIE_URL!;

interface ChatBubbleProps {
    children: React.ReactNode
    isResponse: boolean
    isLocationResponse?: boolean
    background?: boolean
}
const ChatBubble: React.FC<ChatBubbleProps> = ({ children, isResponse, isLocationResponse: isLocation, background = true }) => {
    return (
        <View style={{ width: "100%", flexDirection: "row", justifyContent: isResponse ? "flex-start" : "flex-end", marginVertical: 6, paddingHorizontal: 20 }}>
            <View style={{
                flexDirection: "row",
                borderRadius: 16,
                maxWidth: "100%",
                backgroundColor: background ? "rgba(255,255,255,0.75)" : "transparent",
                shadowColor: "#a78bfa",
                shadowOpacity: 0.15,
                shadowRadius: 5,
                elevation: 2,
            }}>
                {isLocation && (
                    <View style={{ width: 8, backgroundColor: "#F5F5F7", borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }} />
                )}
                <View style={{ paddingVertical: 12, paddingHorizontal: 16, flexShrink: 1 }}>
                    {children}
                </View>
            </View>
        </View>
    );
};

export default function Chat() {
    const router = useRouter();
    const { ollieResponseParam } = useLocalSearchParams<{ ollieResponseParam: string }>();
    const resources = useResourcesStore(state => state.resources);

    const [conversationId, setConversationId] = useState(uuid());

    const [query, setQuery] = useState<string>();

    const [submittedQuery, setSubmittedQuery] = useState<null | string>(null);
    const [ollieResponses, setOllieResponses] = useState<IOllieResponse[]>([]);

    const scrollRef = useRef<ScrollView>(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (!ollieResponseParam) return;
        const ollieResponseParsed = JSON.parse(ollieResponseParam);

        const lastResponse = ollieResponseParsed.data;
        const convoId = ollieResponseParsed.conversationId
        const lastSources = ollieResponseParsed.sources;

        lastResponse.sources = lastSources

        setConversationId(convoId);
        setOllieResponses([lastResponse]);
    }, [ollieResponseParam])

    const handleInputSubmit = () => {
        if (!query?.trim()) return;

        const submitQuery = query;
        setQuery("")

        getResponse({ query: submitQuery });
    }

    const { mutate: getResponse, isPending: ollieRepsonsePending, reset } = useMutation({
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

            if (resources) {
                const fetchedSources = fetchSources(data.documents, resources)
                data.sources = fetchedSources;
            }

            ollieReponsesCopy.push(data);

            setOllieResponses(ollieReponsesCopy);
        }
    });

    const navigateToSource = (source: { doc: IResourceItem; type: string }) => {
        switch (source.type) {
            case "infographics":
                router.push({
                    pathname: "/(tabs)/(home)/infographic",
                    params: { infographic: JSON.stringify(source.doc) },
                });
                break;

            case "local_resources":
                router.push({
                    pathname: "/(tabs)/(home)/local-resource",
                    params: { localResource: JSON.stringify(source.doc) },
                });
                break;


            case "video_spotlights":
                router.push({
                    pathname: "/(tabs)/(home)/video-spotlight",
                    params: { videoSpotlight: JSON.stringify(source.doc) },
                });
                break;

            case "quick_tips":
                router.push({
                    pathname: "/(tabs)/(home)/quick-tip",
                    params: { quickTip: JSON.stringify(source.doc) },
                });
                break;

            default:
                console.warn("Unknown source type:", source.type);
        }
    };

    const resetChat = () => {
        setConversationId(uuid());
        setQuery("");
        setSubmittedQuery(null);
        setOllieResponses([]);
        reset();
    }

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
                    <SideDrawer isOpen={drawerOpen} onClose={() => { setDrawerOpen(false) }}  onReset={resetChat} />
                    
                    <View style={{ flex: 1, paddingTop: 20, paddingBottom: 5, gap: 8 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Pressable onPress={() => setDrawerOpen(true)}>
                                <Ionicons size={24} name="menu-outline" color={TINT_COLOR} />
                            </Pressable>
                        </View>

                        <ScrollView
                            contentContainerStyle={{
                                gap: 18,
                                flexGrow: 1,
                            }}
                            showsVerticalScrollIndicator={false}
                            ref={scrollRef}
                            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
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

                                                    {
                                                        ollieResponse.sources?.map((source, index) => (
                                                            <TouchableOpacity
                                                                key={source.doc.id}
                                                                activeOpacity={0.6}
                                                                onPress={() => navigateToSource(source)}
                                                                style={{
                                                                    alignSelf: "flex-start",
                                                                    marginTop: index === 0 ? 12 : 6,
                                                                    paddingHorizontal: 12,
                                                                    paddingVertical: 6,
                                                                    borderRadius: 12,
                                                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                                }}
                                                            >
                                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                                    <Text
                                                                        style={{ fontSize: 12, color: "#555", fontWeight: "500" }}
                                                                        numberOfLines={1}
                                                                    >
                                                                        {source.doc.title}
                                                                    </Text>
                                                                    <Ionicons name="chevron-forward-outline" />
                                                                </View>
                                                            </TouchableOpacity>
                                                        ))
                                                    }
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

                        <View style={{ paddingBottom: 6, paddingHorizontal: 20 }}>
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
                                    multiline
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        paddingRight: 8,
                                        color: "#555",
                                        maxHeight: 120,
                                        paddingTop: 8,
                                        paddingBottom: 8,
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