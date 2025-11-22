import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function VideoSpotlights() {
  const resources = useResourcesStore(state => state.resources);
  const video_spotlights = resources?.video_spotlights;
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, gap: 18 }}>
          <SearchBar placeholder="Search by title" value={searchQuery} onChangeText={setSearchQuery} />
          {video_spotlights?.filter((video_spotlight) => video_spotlight.title.toLowerCase().includes(searchQuery.toLowerCase())).map((video_spotlight, index) => (
            <VideoSpotlightCard key={index} videoSpotlight={video_spotlight} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
