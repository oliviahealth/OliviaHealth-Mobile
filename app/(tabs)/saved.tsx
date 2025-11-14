import InfographicCard from "@/components/InfographicCard";
import LocalResourceCard from "@/components/LocalResourceCard";
import QuickTipCard from "@/components/QuickTipCard";
import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore from "@/src/store/useResourcesStore";
import { TINT_COLOR } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

enum SavedTab {
  Videos,
  LocalResources,
  QuickTips,
  Infographics
}

export default function Index() {
  const [savedTab, setSavedTab] = useState<SavedTab>(SavedTab.Videos);
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
          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: savedTab === SavedTab.Videos ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSavedTab(SavedTab.Videos)}>
            <Text style={{ color: savedTab === SavedTab.Videos ? TINT_COLOR : '#888', fontWeight: '500' }}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: savedTab === SavedTab.LocalResources ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSavedTab(SavedTab.LocalResources)}>
            <Text style={{ color: savedTab === SavedTab.LocalResources ? TINT_COLOR : '#888', fontWeight: '500' }}>Local</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: savedTab === SavedTab.QuickTips ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSavedTab(SavedTab.QuickTips)}>
            <Text style={{ color: savedTab === SavedTab.QuickTips ? TINT_COLOR : '#888', fontWeight: '500' }}>Quick Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 10, height: 50, borderBottomWidth: 2, borderBottomColor: savedTab === SavedTab.Infographics ? TINT_COLOR : 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSavedTab(SavedTab.Infographics)}>
            <Text style={{ color: savedTab === SavedTab.Infographics ? TINT_COLOR : '#888', fontWeight: '500' }}>Infographics</Text>
          </TouchableOpacity>
        </View>

        {savedTab === SavedTab.Videos && savedResources?.video_spotlights.map((videoSpotlight, index) => (
          <VideoSpotlightCard key={index} videoSpotlight={videoSpotlight} />
        ))}

        {savedTab === SavedTab.LocalResources && savedResources?.local_resources.map((localResource, index) => (
          <LocalResourceCard key={index} localResource={localResource} />
        ))}

        {savedTab === SavedTab.QuickTips && savedResources?.quick_tips.map((quickTip, index) => (
          <QuickTipCard key={index} quickTip={quickTip} />
        ))}

        {savedTab === SavedTab.Infographics && savedResources?.infographics.map((infographic, index) => (
          <InfographicCard key={index} infographic={infographic} />
        ))}
      </View>
    </ScrollView>
  );
}
