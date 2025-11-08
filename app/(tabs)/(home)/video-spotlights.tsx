import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View } from "react-native";

export default function VideoSpotlights() {
  const resources = useResourcesStore(state => state.resources);
  const video_spotlights = resources?.video_spotlights;

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by title" />
        {video_spotlights?.map((video_spotlight, index) => (
          <VideoSpotlightCard key={index} videoSpotlight={video_spotlight} />
        ))}
      </View>
    </ScrollView>
  );
}
