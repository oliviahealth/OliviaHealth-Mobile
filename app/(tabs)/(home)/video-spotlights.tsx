import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View, Text } from "react-native";

export default function VideoSpotlights() {
  const resources = useResourcesStore(state => state.resources);
  const video_spotlights = resources?.video_spotlights;
  const [searchQuery, setSearchQuery] = useState("");

  const isError = !resources || !video_spotlights;

  const filteredVideoSpotlights = !isError
    ? video_spotlights.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          gap: 18,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, gap: 18 }}>
          <SearchBar
            placeholder="Search by title"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {isError ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 60,
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#555" }}>
                Something went wrong
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#999",
                  textAlign: "center",
                  paddingHorizontal: 40,
                }}
              >
                Please try again later.
              </Text>
            </View>
          ) : (
            filteredVideoSpotlights.map((video, index) => (
              <VideoSpotlightCard key={index} videoSpotlight={video} />
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
