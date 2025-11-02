import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

const oliviahealth_branding = require('../../assets/images/oliviahealth_branding.png')

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 30 }}>
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

        <View style={{ marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Video Spotlights</Text>
            <Text style={{ color: '#B642D3' }}>See all</Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Tara-Maxa-2.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Maternal Anexity and Depression
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                with Tara Maxa
              </Text>
            </View>
            <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Downing.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Domestic Violence
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                with Dr. Nancy Downing
              </Text>
            </View>
            <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/NICU-4.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Family Spotlight with the NICU
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                with the Brown Family
              </Text>
            </View>
            <Ionicons name="play-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}