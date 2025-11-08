import InfographicCard from "@/components/InfographicCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View } from "react-native";

export default function Infographics() {
  const resources = useResourcesStore(state => state.resources);
  const infographics = resources?.infographics

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by title" />
        {infographics?.map((infographic, index) => (
          <InfographicCard key={index} infographic={infographic} />
        ))}
      </View>
    </ScrollView>
  );
}
