import SearchComponent from "@/components/SearchComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import useResourcesStore, {
  IInfographics,
  ILocalResources,
  IQuickTips,
  IVideoSpotlights,
} from "@/src/store/useResourcesStore";

const oliviahealth_branding = require("../../../assets/images/oliviahealth_branding.png");

export default function Index() {
  const router = useRouter();
  const resources = useResourcesStore((state) => state.resources);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchLower = searchQuery.toLowerCase().trim();

  // Helper: spotlight when no search, otherwise search in title
  const filterSection = <T extends { title: string; spotlight?: boolean }>(
    items?: T[]
  ): T[] => {
    if (!items) return [];
    return items.filter((item) => {
      if (!searchLower) {
        return item.spotlight;
      }
      return item.title.toLowerCase().includes(searchLower);
    });
  };

  const video_spotlights_featured = useMemo(() => filterSection<IVideoSpotlights>(resources?.video_spotlights),
    [resources, searchLower]
  );

  const local_resources_featured = useMemo(() => filterSection<ILocalResources>(resources?.local_resources),
    [resources, searchLower]
  );

  const quick_tips_featured = useMemo(() => filterSection<IQuickTips>(resources?.quick_tips),
    [resources, searchLower]
  );

  const infographics_features = useMemo(() => filterSection<IInfographics>(resources?.infographics),
    [resources, searchLower]
  );

  const goToQuickTips = () => router.push("/(tabs)/(home)/quick-tips");
  const goToVideoSpotlights = () => router.push("/(tabs)/(home)/video-spotlights");
  const goToLocalResources = () => router.push("/(tabs)/(home)/local-resources");
  const goToInfographics = () => router.push("/(tabs)/(home)/infographics");
  const goToAbout = () => router.push("/(tabs)/(home)/about-us");

  const goToVideoSpotlight = (videoSpotlight: IVideoSpotlights) => {
    router.push({ pathname: "/(tabs)/(home)/video-spotlight", params: { videoSpotlight: JSON.stringify(videoSpotlight) } });
  };

  const goToLocalResource = (localResource: ILocalResources) => {
    router.push({ pathname: "/(tabs)/(home)/local-resource", params: { localResource: JSON.stringify(localResource) } });
  };

  const goToQuickTip = (quickTip: IQuickTips) => {
    router.push({ pathname: "/(tabs)/(home)/quick-tip", params: { quickTip: JSON.stringify(quickTip) } });
  };

  const goToInfographic = (infographic: IInfographics) => {
    router.push({ pathname: "/(tabs)/(home)/infographic", params: { infographic: JSON.stringify(infographic) } });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={44}>
      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false} >
        <View style={{ flex: 1, gap: 18 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
            <Image source={oliviahealth_branding} style={{ width: 200, resizeMode: "contain" }} />
            <Pressable onPress={goToAbout}>
              <Ionicons name="information-circle-outline" size={24} color="#B642D3" />
            </Pressable>
          </View>

          {/* Search */}
          <SearchComponent placeholder="Looking for something specific?" value={searchQuery} onChangeText={setSearchQuery} />

          {/* Tiles row only when no search */}
          {!searchQuery && (
            <View style={{ flexDirection: "row", justifyContent: "space-between", }} >
              <TouchableOpacity onPress={goToQuickTips} style={{ width: "31%", height: 120, borderRadius: 24, backgroundColor: "#FBF6FF", alignItems: "center", justifyContent: "center" }} activeOpacity={0.9} >
                <Ionicons name="bulb-outline" size={40} color="#B642D3" />
                <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3", }} >
                  Quick Tips
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={goToLocalResources}
                style={{ width: "31%", height: 120, borderRadius: 24, backgroundColor: "#FBF6FF", alignItems: "center", justifyContent: "center" }}
                activeOpacity={0.9}
              >
                <Ionicons name="location-outline" size={40} color="#B642D3" />
                <Text
                  style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3", }}
                >
                  Resources
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={goToInfographics}
                style={{ width: "31%", height: 120, borderRadius: 24, backgroundColor: "#FBF6FF", alignItems: "center", justifyContent: "center", }}
                activeOpacity={0.9}
              >
                <Ionicons name="stats-chart-outline" size={40} color="#B642D3" />
                <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3", }} >
                  Infographics
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Video Spotlights */}
          {video_spotlights_featured.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>
                  Video Spotlights
                </Text>
                <Pressable onPress={goToVideoSpotlights} hitSlop={8}>
                  <Text style={{ color: "#B642D3" }}>See all</Text>
                </Pressable>
              </View>

              {video_spotlights_featured.map((elm) => (
                <TouchableOpacity
                  key={elm.id}
                  style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee", gap: 2, }}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: elm.thumbnail_url }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                  />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={{ fontSize: 15, fontWeight: "600", color: "#333", }}
                      numberOfLines={2}
                    >
                      {elm.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>{elm.subtitle}</Text>
                  </View>
                  <Pressable onPress={() => goToVideoSpotlight(elm)} hitSlop={8}>
                    <Ionicons
                      name="play-circle-outline"
                      size={32}
                      color="#B642D3"
                    />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Local Resources */}
          {local_resources_featured.length > 0 && (
            <View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
              >
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>
                  Local Resources
                </Text>
                <Pressable onPress={goToLocalResources} hitSlop={8}>
                  <Text style={{ color: "#B642D3" }}>See all</Text>
                </Pressable>
              </View>

              {local_resources_featured.map((elm) => (
                <TouchableOpacity
                  key={elm.id}
                  style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee", gap: 2, }}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: elm.thumbnail_url }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12, }}
                  />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={{ fontSize: 15, fontWeight: "600", color: "#333", }}
                      numberOfLines={2}
                    >
                      {elm.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>{elm.subtitle}</Text>
                  </View>
                  <Pressable onPress={() => goToLocalResource(elm)} hitSlop={8}>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={32}
                      color="#B642D3"
                    />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Quick Tips */}
          {quick_tips_featured.length > 0 && (
            <View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, }}
              >
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>
                  Quick Tips
                </Text>
                <Pressable onPress={goToQuickTips} hitSlop={8}>
                  <Text style={{ color: "#B642D3" }}>See all</Text>
                </Pressable>
              </View>

              {quick_tips_featured.map((elm) => (
                <TouchableOpacity
                  key={elm.id}
                  style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee", gap: 2, }}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: elm.thumbnail_url }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12, }}
                  />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={{ fontSize: 15, fontWeight: "600", color: "#333", }}
                      numberOfLines={2}
                    >
                      {elm.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {elm.description}
                    </Text>
                  </View>
                  <Pressable onPress={() => goToQuickTip(elm)} hitSlop={8}>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={32}
                      color="#B642D3"
                    />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Infographics */}
          {infographics_features.length > 0 && (
            <View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, }}
              >
                <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>
                  Infographics
                </Text>
                <Pressable onPress={goToInfographics} hitSlop={8}>
                  <Text style={{ color: "#B642D3" }}>See all</Text>
                </Pressable>
              </View>

              {infographics_features.map((elm) => (
                <TouchableOpacity
                  key={elm.id}
                  style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee", gap: 2, }} 
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: elm.thumbnail_url }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12, }}
                  />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={{ fontSize: 15, fontWeight: "600", color: "#333", }}
                      numberOfLines={2}
                    >
                      {elm.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {elm.description}
                    </Text>
                  </View>
                  <Pressable onPress={() => goToInfographic(elm)} hitSlop={8}>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={32}
                      color="#B642D3"
                    />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
