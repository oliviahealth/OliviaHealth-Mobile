import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

const oliviahealth_branding = require('../../assets/images/oliviahealth_branding.png')

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 30 }}>
      <View style={{ flex: 1, gap: 20 }}>
        <Image
          source={oliviahealth_branding}
          style={{ width: 200, resizeMode: 'contain' }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 15, paddingHorizontal: 15, height: 45 }}>
          <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Looking for something specific?"
            placeholderTextColor="#aaa"
            style={{ flex: 1, fontSize: 16, color: '#555' }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='bulb-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Quick Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='location-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '31%', height: 120, borderRadius: 24, backgroundColor: '#FBF6FF', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Ionicons name='stats-chart-outline' size={40} color="#B642D3" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600", color: "#B642D3" }}>Infographics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}