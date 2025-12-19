import React from "react";
import { Image, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";

const about_page_graphic = require("../../../assets/images/about_page_graphic.png");

const ABOUT_MD = `
## About OLIVIA HealthCare

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: "white",
        paddingBottom: 24,
      }}
    >
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
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Markdown
          style={{
            body: {
              fontSize: 16,
              lineHeight: 26,
              color: "#4B5563",
            },
            heading2: {
              fontSize: 26,
              fontWeight: "800",
              color: "#111827",
              textAlign: "center",
              marginBottom: 16,
              letterSpacing: -0.2,
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
              fontWeight: "900",
              color: "#111827",
            },
            text: {
              color: "#4B5563",
            },
          }}
        >
          {ABOUT_MD}
        </Markdown>
      </View>
    </ScrollView>
  );
}
