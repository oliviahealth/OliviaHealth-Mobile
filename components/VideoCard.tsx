import { IVideoSpotlights } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface VideoCardProps {
  video: IVideoSpotlights;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#E9E9E9', gap: 2 }} activeOpacity={0.9}>
      <Image source={{ uri: video.video_url }} style={{ width: '100%', height: 75, borderRadius: 12 }} />

      <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
        <Image source={{ uri: video.thumbnail_url }} style={{ width: 24, height: 24, borderRadius: 30, marginRight: 8, alignSelf: 'center' }} />

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {video.subtitle}
          </Text>
        </View>

        <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
