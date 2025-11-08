import { IQuickTips } from "@/src/store/useResourcesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface QuickTipCardProps {
  quickTip: IQuickTips;
}

const QuickTipCard: React.FC<QuickTipCardProps> = ({ quickTip }) => {
  return (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E9E9E9', gap: 2 }} activeOpacity={0.9}>
      <Image source={{ uri: quickTip.thumbnail_url }} style={{ width: '100%', height: 120, borderRadius: 12, marginBottom: 8 }} />

      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* TODO: Replace with proper profile picture */}
        <Image source={{ uri: quickTip.thumbnail_url }} style={{ width: 38, height: 38, borderRadius: 30, marginRight: 8, alignSelf: 'center' }} />

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
            {quickTip.title}
          </Text>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {quickTip.description}
          </Text>
        </View>

        <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
      </View>
    </TouchableOpacity>
  );
};

export default QuickTipCard;
