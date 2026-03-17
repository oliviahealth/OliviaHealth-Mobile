import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { IVideoSpotlights } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import WebView from "react-native-webview";

interface VideoSpotlightCardProps {
  videoSpotlight: IVideoSpotlights;
}

const VideoSpotlightCard: React.FC<VideoSpotlightCardProps> = ({ videoSpotlight }) => {
  const router = useRouter();

  const goToVideoSpotlight = () => {
    router.push({ pathname: "/(tabs)/(home)/video-spotlight", params: { videoSpotlight: JSON.stringify(videoSpotlight) } });
  }

  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E9E9E9', gap: 2 }} activeOpacity={0.9}>
      <WebView
        style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 12, marginBottom: 8, resizeMode: 'contain' }}
        source={{ uri: videoSpotlight.thumbnail_url }}
        scrollEnabled={false}
      />

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
          {videoSpotlight.title}
        </Text>
        <Text style={{ fontSize: 12, color: '#888' }}>
          {videoSpotlight.subtitle}
        </Text>
      </View>

      <Pressable onPress={goToVideoSpotlight} hitSlop={8}>
        <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
      </Pressable>
    </TouchableOpacity>
  );
};

export default VideoSpotlightCard;
