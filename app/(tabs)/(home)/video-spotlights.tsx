import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View, Text } from "react-native";

export default function VideoSpotlights() {
  const resources = useResourcesStore(state => state.resources);
  const video_spotlights = resources?.video_spotlights;

  const isError = !resources || !video_spotlights;

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
          video_spotlights.map((video_spotlight, index) => (
            <VideoSpotlightCard key={index} videoSpotlight={video_spotlight} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
