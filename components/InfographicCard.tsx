import { IInfographics } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

interface InfographicCardProps {
  infographic: IInfographics;
}

const InfographicCard: React.FC<InfographicCardProps> = ({ infographic }) => {
  const router = useRouter();

  const goToInfographic = () => {
    router.push({ pathname: "/(tabs)/(home)/infographic", params: { infographic: JSON.stringify(infographic) } });
  }

  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E9E9E9', gap: 2 }} activeOpacity={0.9}>
      <Image source={{ uri: infographic.thumbnail_url }}
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          borderRadius: 12,
          marginBottom: 8,
          resizeMode: 'contain',
        }} />

      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* TODO: Replace with proper profile picture */}
        <Image source={{ uri: infographic.thumbnail_url }} style={{ width: 38, height: 38, borderRadius: 30, marginRight: 8, alignSelf: 'center' }} />

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
            {infographic.title}
          </Text>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {infographic.description}
          </Text>
        </View>

        <Pressable onPress={goToInfographic} hitSlop={8}>
          <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default InfographicCard;
