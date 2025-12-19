import { AsyncStorageKeys } from "@/src/store/useResourcesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Markdown from "react-native-markdown-display";

const ABOUT_MD = `
## Welcome to OLIVIA HealthCare

### Who We Are
OLIVIA HealthCare is a **non-profit, interdisciplinary platform** created by Texas A&M University faculty, staff, students, and partners.

Our team of subject matter experts is **nurse-led**, yet collaborative with the entire spectrum of healthcare professionals — from babies to moms and dads to every expert you expect on the best healthcare team.

### Our Mission
OLIVIA's mission is to improve **health, developmental, and socioeconomic outcomes** for mothers, children, and families.

We are committed to ensuring everyone has access to trusted information and resources, empowering families with an educated voice to support healthy growth and development.

### Our Vision
To be the **most trusted source** of maternal and child health information — expanding access, reducing gaps, and empowering families from pregnancy through preschool.

### What Makes Us Different
- Built **for the public good**, not for profit
- Mothers, Children & Families are at the **center of everything we do**
- All content is **expert-reviewed** and grounded in evidence-based practice

### What We Offer
- Pregnancy, postpartum, and early childhood guidance
- Infant and toddler development resources
- Parenting, family wellness, and mental health support
- Connections to local health and social services
- Research-backed content to support families and care teams

### Learn More
OLIVIA is driven by the **Program of Excellence for Mothers, Children & Families**
at the Texas A&M College of Nursing.

https://nursing.tamu.edu/research/cpp/poemcf/index.html
`;

export default function WelcomeScreen() {
    const router = useRouter();

    const goToHome = () => {
        router.push("/(tabs)/(home)");
    };

    useEffect(() => {
        AsyncStorage.setItem(AsyncStorageKeys.FIRST_LAUNCH, "false");
    }, []);

    return (
        <ImageBackground
            source={require("../assets/images/olivia-splash-2.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            {/* Overlay */}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            />

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                    style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        paddingTop: 16,
                        paddingHorizontal: 28,
                        paddingBottom: 32,
                        maxHeight: "70%",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 10,
                    }}
                >
                    {/* Drag Handle */}
                    <View
                        style={{
                            width: 44,
                            height: 5,
                            backgroundColor: "#D1D5DB",
                            borderRadius: 3,
                            alignSelf: "center",
                            marginBottom: 20,
                        }}
                    />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    >
                        <Markdown
                            style={{
                                body: {
                                    fontSize: 15,
                                    lineHeight: 24,
                                    color: "#4B5563",
                                },
                                heading2: {
                                    fontSize: 26,
                                    fontWeight: "700",
                                    color: "#111827",
                                    marginBottom: 20,
                                    textAlign: "center",
                                    letterSpacing: -0.5,
                                },
                                heading3: {
                                    fontSize: 17,
                                    fontWeight: "700",
                                    color: "#111827",
                                    marginTop: 24,
                                    marginBottom: 10,
                                    letterSpacing: -0.3,
                                },
                                paragraph: {
                                    marginBottom: 12,
                                },
                                strong: {
                                    fontWeight: "700",
                                    color: "#1F2937",
                                },
                                list_item: {
                                    marginVertical: 4,
                                    lineHeight: 24,
                                },
                                link: {
                                    color: "#B642D3",
                                    fontWeight: "600",
                                    textDecorationLine: "underline",
                                },
                                text: {
                                    color: "#4B5563",
                                },
                            }}
                        >
                            {ABOUT_MD}
                        </Markdown>
                    </ScrollView>

                    <TouchableOpacity
                        onPress={goToHome}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: "#B642D3",
                            paddingVertical: 16,
                            borderRadius: 14,
                            alignItems: "center",
                            marginTop: 16,
                            shadowColor: "#B642D3",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 17,
                                fontWeight: "700",
                                letterSpacing: 0.3,
                            }}
                        >
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}