import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import useResourcesStore, { IVideoSpotlights } from "@/src/store/useResourcesStore";

const oliviahealth_branding = require('../../../assets/images/oliviahealth_branding.png')

export default function Index() {
  const router = useRouter();
  const resources = useResourcesStore(state => state.resources);

  const video_spotlights_featured = resources?.video_spotlights.filter(elm => elm.spotlight);
  const local_resources_featured = resources?.local_resources.filter(elm => elm.spotlight);
  const quick_tips_featured = resources?.quick_tips.filter(elm => elm.spotlight);
  const infographics_features = resources?.infographics.filter(elm => elm.spotlight);

  const goToQuickTips = () => {
    router.push('/(tabs)/(home)/quick-tips');
  }

  const goToVideoSpotlights = () => {
    router.push('/(tabs)/(home)/video-spotlights');
  }

  const goToLocalResources = () => {
    router.push("/(tabs)/(home)/local-resources");
  }

  const goToInfographics = () => {
    router.push("/(tabs)/(home)/infographics");
  }

  const goToVideoSpotlight = (videoSpotlight: IVideoSpotlights) => {
    router.push({ pathname: "/(tabs)/(home)/video-spotlight", params: { videoSpotlight: JSON.stringify(videoSpotlight) } });
  }

  const goToLocalResource = () => {
    router.push("/(tabs)/(home)/local-resource")
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 20,
        gap: 18,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, gap: 18 }}>
        <Image
          source={oliviahealth_branding}
          style={{ width: 200, resizeMode: 'contain' }}
        />

        <SearchBar placeholder="Looking for something specific?" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={goToQuickTips} style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='bulb-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Quick Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToLocalResources} style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='location-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToInfographics} style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='stats-chart-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Infographics</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Video Spotlights</Text>
            <Pressable onPress={goToVideoSpotlights} hitSlop={8}>
              <Text style={{ color: '#B642D3' }}>See all</Text>
            </Pressable>
          </View>

          {video_spotlights_featured?.map((elm) => (
            <TouchableOpacity key={elm.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee', gap: 2 }} activeOpacity={0.9}>
              <Image source={{ uri: elm.thumbnail_url }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                  {elm.title}
                </Text>
                <Text style={{ fontSize: 12, color: '#888' }}>
                  {elm.subtitle}
                </Text>
              </View>
              <Pressable onPress={() => goToVideoSpotlight(elm)} hitSlop={8}>
                <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
              </Pressable>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Local Resources</Text>
            <Pressable onPress={goToLocalResources} hitSlop={8}>
              <Text style={{ color: '#B642D3' }}>See all</Text>
            </Pressable>
          </View>

          {
            local_resources_featured?.map((elm) => (
              <TouchableOpacity key={elm.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee', gap: 2 }} activeOpacity={0.9}>
                <Image source={{ uri: elm.thumbnail_url }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                    {elm.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>
                    {elm.description}
                  </Text>
                </View>
                <Pressable onPress={goToLocalResource} hitSlop={8}>
                  <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
                </Pressable>
              </TouchableOpacity>
            ))

          }

        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Quick Tips</Text>
            <Pressable onPress={goToQuickTips} hitSlop={8}>
              <Text style={{ color: '#B642D3' }}>See all</Text>
            </Pressable>
          </View>

          {
            quick_tips_featured?.map((elm) => (
              <TouchableOpacity key={elm.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee', gap: 2 }} activeOpacity={0.9}>
                <Image source={{ uri: elm.thumbnail_url }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                    {elm.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>
                    {elm.description}
                  </Text>
                </View>
                <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
              </TouchableOpacity>
            ))
          }
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Infographics</Text>
            <Pressable onPress={goToInfographics} hitSlop={8}>
              <Text style={{ color: '#B642D3' }}>See all</Text>
            </Pressable>
          </View>

          {
            infographics_features?.map((elm) => (
              <TouchableOpacity key={elm.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee', gap: 2 }} activeOpacity={0.9}>
                <Image source={{ uri: elm.thumbnail_url }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                    {elm.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>
                    {elm.description}
                  </Text>
                </View>
                <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
}