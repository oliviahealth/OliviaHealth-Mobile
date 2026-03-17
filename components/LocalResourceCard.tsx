import { ILocalResources } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";

interface LocalResourceCardProps {
  localResource: ILocalResources;
}

const LocalResourceCard: React.FC<LocalResourceCardProps> = ({ localResource }) => {
  const router = useRouter();

  const goToLocalResource = () => {
    router.push({ pathname: "/(tabs)/(home)/local-resource", params: { localResource: JSON.stringify(localResource) } });
  }

  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E9E9E9', gap: 2 }} activeOpacity={0.9}>
      <WebView
        style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 12, marginBottom: 8, resizeMode: 'contain' }}
        source={{ uri: localResource.thumbnail_url }}
        scrollEnabled={false}
      />


      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Image source={{ uri: localResource.thumbnail_url }} style={{ width: 38, height: 38, borderRadius: 30, marginRight: 8, alignSelf: 'center' }} />

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
            {localResource.title}
          </Text>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {localResource.subtitle}
          </Text>
        </View>

        <Pressable onPress={goToLocalResource} hitSlop={8}>
          <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default LocalResourceCard;
