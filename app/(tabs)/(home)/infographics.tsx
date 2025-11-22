import InfographicCard from "@/components/InfographicCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View, Text } from "react-native";

export default function Infographics() {
  const resources = useResourcesStore(state => state.resources);
  const infographics = resources?.infographics;

  const isError = !resources || !infographics;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 18,
        flexGrow: 1
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by title" />

        {isError ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 60, gap: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#555" }}>
              Something went wrong
            </Text>
            <Text style={{ fontSize: 14, color: "#999", textAlign: "center", paddingHorizontal: 40 }}>
              Please try again later.
            </Text>
          </View>
        ) : (
          infographics.map((infographic, index) => (
            <InfographicCard key={index} infographic={infographic} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
