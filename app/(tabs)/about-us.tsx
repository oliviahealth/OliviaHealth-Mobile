import { Image, ScrollView, Text, View } from "react-native";

const SECTIONS = [
  {
    title: "Who We Are",
    content: "The OLIVIA project is a uniquely expansive and powerful interdisciplinary research and development effort led by the Texas A&M School of Nursing in partnership with Philips.\n\nFunded by a TAMU Health seedling grant, OLIVIA integrates academia, industry, community, and government partners including: Texas A&M University, Amazon, Philips, Texas Health and Human Services Commission, Texas A&M Center for Applied Technology, Project REACH, Driscoll Health System, and HealthPoint."
  },
  {
    title: "What We Do",
    content: "The OLIVIA project operates under the ‘Program of Excellence for Mothers, Children & Families’ (PEMCF) at the Texas A&M School for Nursing. The interdisciplinary team – including students, faculty and staff from the Nursing, Public Health, Engineering, and Visualization, are working together to leverage innovative learning and access to resources based on advanced mobile technology."
  },
  {
    title: "Our Mission",
    content: "As OLIVIA grows, its “ecosystem” of information and resource access will expand to improve the care and outcomes for Mothers, Children and Families across the United States."
  }
]

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 20, gap: 30,  backgroundColor: 'white' }}>
      <Image 
        source={{ uri: 'http://oliviahealth.org/wp-content/uploads/2023/06/About-Circle-1024x1024.gif' }} 
        style={{ width: 200, height: 200, alignSelf: 'center' }} 
      />

      <Text style={{ fontSize: 24, fontWeight: 500 }}>
        About OliviaHealth
      </Text>

      {SECTIONS.map((section, index) => (
        <View key={index} style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {section.title}
          </Text>
          <Text style={{ fontSize: 14, color: '#888', lineHeight: 25 }}>
            {section.content}
          </Text>
        </View>
      ))}

      <Image 
        source={{ uri: 'https://oliviahealth.org/wp-content/uploads/2023/02/sponsors.png' }} 
        style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 30, alignSelf: 'center' }} 
      />
    </ScrollView>
  );
}
