import InfographicCard from "@/components/InfographicCard";
import LocalResourceCard from "@/components/LocalResourceCard";
import QuickTipCard from "@/components/QuickTipCard";
import SearchBar from "@/components/SearchBar";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore, { IInfographics, ILocalResources, IQuickTips, IVideoSpotlights } from "@/src/store/useResourcesStore";
import { TINT_COLOR } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
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
  const resources = useResourcesStore(state => state.resources);

  // Get the actual resource objects from the IDs
  const savedVideoSpotlights = useMemo(() => {
    if (!resources?.video_spotlights || !savedResources?.video_spotlights) return [];
    return savedResources.video_spotlights
      .map(id => resources.video_spotlights.find(item => item.id === id))
      .filter(Boolean) as IVideoSpotlights[];
  }, [resources?.video_spotlights, savedResources?.video_spotlights]);

  const savedLocalResources = useMemo(() => {
    if (!resources?.local_resources || !savedResources?.local_resources) return [];
    return savedResources.local_resources
      .map(id => resources.local_resources.find(item => item.id === id))
      .filter(Boolean) as ILocalResources[];
  }, [resources?.local_resources, savedResources?.local_resources]);

  const savedQuickTips = useMemo(() => {
    if (!resources?.quick_tips || !savedResources?.quick_tips) return [];
    return savedResources.quick_tips
      .map(id => resources.quick_tips.find(item => item.id === id))
      .filter(Boolean) as IQuickTips[];
  }, [resources?.quick_tips, savedResources?.quick_tips]);

  const savedInfographics = useMemo(() => {
    if (!resources?.infographics || !savedResources?.infographics) return [];
    return savedResources.infographics
      .map(id => resources.infographics.find(item => item.id === id))
      .filter(Boolean) as IInfographics[];
  }, [resources?.infographics, savedResources?.infographics]);

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
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              paddingHorizontal: 10,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: savedTab === SavedTab.Videos ? TINT_COLOR : 'transparent',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setSavedTab(SavedTab.Videos)}
          >
            <Text style={{ color: savedTab === SavedTab.Videos ? TINT_COLOR : '#888', fontWeight: '500' }}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              paddingHorizontal: 10,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: savedTab === SavedTab.LocalResources ? TINT_COLOR : 'transparent',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setSavedTab(SavedTab.LocalResources)}
          >
            <Text style={{ color: savedTab === SavedTab.LocalResources ? TINT_COLOR : '#888', fontWeight: '500' }}>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              paddingHorizontal: 10,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: savedTab === SavedTab.QuickTips ? TINT_COLOR : 'transparent',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setSavedTab(SavedTab.QuickTips)}
          >
            <Text style={{ color: savedTab === SavedTab.QuickTips ? TINT_COLOR : '#888', fontWeight: '500' }}>Quick Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              paddingHorizontal: 10,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: savedTab === SavedTab.Infographics ? TINT_COLOR : 'transparent',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setSavedTab(SavedTab.Infographics)}
          >
            <Text style={{ color: savedTab === SavedTab.Infographics ? TINT_COLOR : '#888', fontWeight: '500' }}>Infographics</Text>
          </TouchableOpacity>
        </View>
        {savedTab === SavedTab.Videos && savedVideoSpotlights.map((videoSpotlight, index) => (
          <VideoSpotlightCard key={videoSpotlight.id} videoSpotlight={videoSpotlight} />
        ))}
        {savedTab === SavedTab.LocalResources && savedLocalResources.map((localResource, index) => (
          <LocalResourceCard key={localResource.id} localResource={localResource} />
        ))}
        {savedTab === SavedTab.QuickTips && savedQuickTips.map((quickTip, index) => (
          <QuickTipCard key={quickTip.id} quickTip={quickTip} />
        ))}
        {savedTab === SavedTab.Infographics && savedInfographics.map((infographic, index) => (
          <InfographicCard key={infographic.id} infographic={infographic} />
        ))}
      </View>
    </ScrollView>
  );
}