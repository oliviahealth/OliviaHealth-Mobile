import InfographicCard from "@/components/InfographicCard";
import LocalResourceCard from "@/components/LocalResourceCard";
import QuickTipCard from "@/components/QuickTipCard";
import SearchComponent from "@/components/SearchComponent";
import VideoSpotlightCard from "@/components/VideoSpotlightCard";
import useResourcesStore, {
  IInfographics,
  ILocalResources,
  IQuickTips,
  IVideoSpotlights,
} from "@/src/store/useResourcesStore";
import { TINT_COLOR } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

enum SavedTab {
  Videos,
  LocalResources,
  QuickTips,
  Infographics,
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View
      style={{
        marginTop: 60,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Ionicons name="bookmark-outline" size={40} color="#C4C4C4" />
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
      <Text
        style={{
          fontSize: 13,
          color: "#777",
          textAlign: "center",
          paddingHorizontal: 24,
        }}
      >
        {description}
      </Text>
    </View>
  );
}

export default function Index() {
  const [savedTab, setSavedTab] = useState<SavedTab>(SavedTab.Videos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const savedResources = useResourcesStore((state) => state.savedResources);
  const resources = useResourcesStore((state) => state.resources);

  const savedVideoSpotlights = useMemo(() => {
    if (!resources?.video_spotlights || !savedResources?.video_spotlights)
      return [];
    return savedResources.video_spotlights
      .map((id) => resources.video_spotlights.find((item) => item.id === id))
      .filter(Boolean) as IVideoSpotlights[];
  }, [resources?.video_spotlights, savedResources?.video_spotlights]);

  const savedLocalResources = useMemo(() => {
    if (!resources?.local_resources || !savedResources?.local_resources)
      return [];
    return savedResources.local_resources
      .map((id) => resources.local_resources.find((item) => item.id === id))
      .filter(Boolean) as ILocalResources[];
  }, [resources?.local_resources, savedResources?.local_resources]);

  const savedQuickTips = useMemo(() => {
    if (!resources?.quick_tips || !savedResources?.quick_tips) return [];
    return savedResources.quick_tips
      .map((id) => resources.quick_tips.find((item) => item.id === id))
      .filter(Boolean) as IQuickTips[];
  }, [resources?.quick_tips, savedResources?.quick_tips]);

  const savedInfographics = useMemo(() => {
    if (!resources?.infographics || !savedResources?.infographics) return [];
    return savedResources.infographics
      .map((id) => resources.infographics.find((item) => item.id === id))
      .filter(Boolean) as IInfographics[];
  }, [resources?.infographics, savedResources?.infographics]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={40}>
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingTop: 12 }}>
            <Ionicons name="bookmark" size={24} color={TINT_COLOR} />
            <Text style={{ fontWeight: "500", fontSize: 32 }}>Saved</Text>
          </View>

          <SearchComponent 
            placeholder="Search in saved" 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
          />

          {/* Tabs */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                paddingHorizontal: 10,
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor:
                  savedTab === SavedTab.Videos ? TINT_COLOR : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setSavedTab(SavedTab.Videos)}
            >
              <Text
                style={{
                  color:
                    savedTab === SavedTab.Videos ? TINT_COLOR : "#888",
                  fontWeight: "500",
                }}
              >
                Videos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                paddingHorizontal: 10,
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor:
                  savedTab === SavedTab.LocalResources
                    ? TINT_COLOR
                    : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setSavedTab(SavedTab.LocalResources)}
            >
              <Text
                style={{
                  color:
                    savedTab === SavedTab.LocalResources
                      ? TINT_COLOR
                      : "#888",
                  fontWeight: "500",
                }}
              >
                Local
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                paddingHorizontal: 10,
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor:
                  savedTab === SavedTab.QuickTips ? TINT_COLOR : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setSavedTab(SavedTab.QuickTips)}
            >
              <Text
                style={{
                  color:
                    savedTab === SavedTab.QuickTips ? TINT_COLOR : "#888",
                  fontWeight: "500",
                }}
              >
                Quick Tips
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                paddingHorizontal: 10,
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor:
                  savedTab === SavedTab.Infographics
                    ? TINT_COLOR
                    : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setSavedTab(SavedTab.Infographics)}
            >
              <Text
                style={{
                  color:
                    savedTab === SavedTab.Infographics
                      ? TINT_COLOR
                      : "#888",
                  fontWeight: "500",
                }}
              >
                Infographics
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content + empty states */}
          {savedTab === SavedTab.Videos &&
            (savedVideoSpotlights.length > 0 ? (
              savedVideoSpotlights.filter((videoSpotlight) => videoSpotlight.title.toLowerCase().includes(searchQuery.toLowerCase())).map((videoSpotlight) => (
                <VideoSpotlightCard
                  key={videoSpotlight.id}
                  videoSpotlight={videoSpotlight}
                />
              ))
            ) : (
              <EmptyState
                title="No saved videos yet"
                description="Tap the bookmark icon on any video to save it here."
              />
            ))}

          {savedTab === SavedTab.LocalResources &&
            (savedLocalResources.length > 0 ? (
              savedLocalResources.filter((localResource) => localResource.title.toLowerCase().includes(searchQuery.toLowerCase())).map((localResource) => (
                <LocalResourceCard
                  key={localResource.id}
                  localResource={localResource}
                />
              ))
            ) : (
              <EmptyState
                title="No saved local resources yet"
                description="When you save local resources, they will appear here."
              />
            ))}

          {savedTab === SavedTab.QuickTips &&
            (savedQuickTips.length > 0 ? (
              savedQuickTips.filter((quickTip) => quickTip.title.toLowerCase().includes(searchQuery.toLowerCase())).map((quickTip) => (
                <QuickTipCard key={quickTip.id} quickTip={quickTip} />
              ))
            ) : (
              <EmptyState
                title="No saved quick tips yet"
                description="Save a quick tip to find it again quickly."
              />
            ))}

          {savedTab === SavedTab.Infographics &&
            (savedInfographics.length > 0 ? (
              savedInfographics.filter((infographic) => infographic.title.toLowerCase().includes(searchQuery.toLowerCase())).map((infographic) => (
                <InfographicCard
                  key={infographic.id}
                  infographic={infographic}
                />
              ))
            ) : (
              <EmptyState
                title="No saved infographics yet"
                description="Once you save an infographic, it will show up here."
              />
            ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}