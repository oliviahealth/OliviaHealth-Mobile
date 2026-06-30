import BackButton from "@/components/BackButton";
import React from "react";
import { Image, ScrollView, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";

const about_page_graphic = require("../../assets/images/about_page_graphic.png");

const ABOUT_MD = `
### Who We Are
OLIVIA HealthCare is a **non-profit, interdisciplinary platform** created by Texas A&M University faculty, staff, students, and partners.

Our team of subject matter experts is **nurse-led**, yet collaborative with the entire spectrum of healthcare professionals — from babies to moms and dads to every expert you expect on the best healthcare team.

### Our Mission
OLIVIA’s mission is to improve **health, developmental, and socioeconomic outcomes** for mothers, children, and families.

We are committed to ensuring everyone has access to trusted information and resources, empowering families with an educated voice to support the growth and development of their family.

### Our Vision
To be the **most trusted source** of maternal and child health information and resources — expanding access, reducing gaps, and empowering families from pregnancy through preschool.

### What We Do
OLIVIA operates under the **Program of Excellence for Mothers, Children & Families (PEMCF)** at the Texas A&M College of Nursing.

Our interdisciplinary team includes faculty, staff, and students from Nursing, Public Health, Engineering, and Visualization, working together to leverage innovative learning and advanced mobile technology to improve access to care and resources.
`;

export default function Index() {
    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    backgroundColor: "white",
                    paddingBottom: 24,
                }}
            >
                {/* Header: Back Button + Title */}
                {/* <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 16,
                        gap: 10,
                    }}
                >
                    <BackButton />
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "500",
                            color: "#111827",
                        }}
                    >
                        About Olivia HealthCare
                    </Text>
                </View> */}

                {/* Hero Image */}
                <Image
                    source={about_page_graphic}
                    style={{
                        width: "100%",
                        height: 220,
                        resizeMode: "cover",
                    }}
                />

                {/* Content */}
                <View style={{ paddingHorizontal: 20 }}>
                    <Markdown
                        style={{
                            body: {
                                fontSize: 16,
                                lineHeight: 26,
                                color: "#4B5563",
                            },
                            heading3: {
                                fontSize: 18,
                                fontWeight: "700",
                                color: "#111827",
                                marginTop: 18,
                                marginBottom: 6,
                            },
                            paragraph: {
                                marginBottom: 10,
                            },
                            strong: {
                                fontWeight: "800",
                                color: "#111827",
                            },
                            text: {
                                color: "#4B5563",
                            },
                        }}
                    >
                        {ABOUT_MD}
                    </Markdown>
                    <Text
                        style={{
                            marginTop: 18,
                            fontSize: 12,
                            lineHeight: 18,
                            color: "#9CA3AF",
                            fontStyle: "italic",
                        }}
                    >
                        The Olivia Platform - including &quot;Ollie the AI&quot; - is an academic
                        &apos;work-in-progress,&apos; as part of research within the Program of Excellence
                        for Mothers, Children and Families at the Texas A&M College of Nursing.
                        {"\n\n"}
                        The material herein is for informational purposes and for use in our
                        educational environment. For medical advice, consult a professional.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
