import InfographicCard from "@/components/InfographicCard";
import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore from "@/src/store/useResourcesStore";
import { TINT_COLOR } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [videoTabSelected, setVideoTabSelected] = useState(true);
  const savedResources = useResourcesStore(state => state.savedResources);

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Ionicons name="bookmark" size={24} color={TINT_COLOR} />
          <Text style={{ fontWeight: '500', fontSize: 22 }}>Saved</Text>
        </View>

        <SearchBar placeholder="Search in saved" />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: videoTabSelected ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setVideoTabSelected(true)}>
            <Text style={{ color: videoTabSelected ? TINT_COLOR : '#888', fontWeight: '500' }}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: !videoTabSelected ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setVideoTabSelected(false)}>
            <Text style={{ color: !videoTabSelected ? TINT_COLOR : '#888', fontWeight: '500' }}>Infographics</Text>
          </TouchableOpacity>
        </View>

        {videoTabSelected && savedResources?.videos.map((videoSpotlight, index) => (
          <VideoSpotlightCard key={index} videoSpotlight={videoSpotlight} />
        ))}

        {!videoTabSelected && savedResources?.infographics.map((infographic, index) => (
          <InfographicCard key={index} infographic={infographic} />
        ))}
      </View>
    </ScrollView>
  );
}
