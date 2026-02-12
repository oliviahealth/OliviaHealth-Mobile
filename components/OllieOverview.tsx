// OllieOverviewCard.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
    title?: string;
    body?: string;
    avatarUri?: string;
};

export default function OllieOverviewCard({
    title = "Ollie Overview",
    body = "Domestic confined any but son bachelor advanced remember. How proceed offered her offence shy forming. Returned peculiar pleasant but appetite differed she. Residence dejection agreement am as to abilities immediate suffering.",
    avatarUri = "https://i.pravatar.cc/100?img=12",
}: Props) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <LinearGradient
                    colors={["#EDF3FF", "#F3EEFF", "#F6EBF6"]}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.9, y: 0.9 }}
                    style={styles.gradient}
                >
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Image source={require("../assets/images/ollie_avatar.png")} style={styles.avatar} />
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    {/* Body */}
                    <Text
                        style={styles.body}
                        numberOfLines={expanded ? undefined : 4}
                    >
                        {body}
                    </Text>

                    {
                        !expanded && (
                            <Pressable
                                onPress={toggleExpand}
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && { opacity: 0.85 },
                                ]}
                            >
                                <View style={styles.buttonContent}>
                                    <Ionicons
                                        name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                                        size={14}
                                        color="#2E2E2E"
                                    />
                                    <Text style={styles.buttonText}>
                                        Show more
                                    </Text>
                                </View>
                            </Pressable>
                        )
                    }

                    {/* Expand Button */}
                    {expanded && (
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                pressed && { opacity: 0.85 },
                            ]}
                        >
                            <View style={styles.buttonContent}>
                                <Ionicons
                                    name="sparkles-outline"
                                    size={14}
                                    color="#2E2E2E"
                                />
                                <Text style={styles.buttonText}>
                                    Dive deeper with Ollie
                                </Text>
                            </View>
                        </Pressable>
                    )}
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        marginTop: 8,
    },

    card: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
        overflow: "hidden",
    },

    gradient: {
        padding: 14,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2E2E2E",
    },

    body: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 22,
        color: "#3A3A3A",
    },

    button: {
        marginTop: 14,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.12)",
        backgroundColor: "rgba(255,255,255,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    buttonText: {
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
        color: "#2E2E2E",
    },
});
