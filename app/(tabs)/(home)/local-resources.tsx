import LocalResourceCard from "@/components/LocalResourceCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View } from "react-native";

export default function LocalResources() {
  const resources = useResourcesStore(state => state.resources);
  const local_resources = resources?.local_resources

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by title" />
        {local_resources?.map((local_resource, index) => (
          <LocalResourceCard key={index} localResource={local_resource} />
        ))}
      </View>
    </ScrollView>
  );
}
