import { TextInput, View, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

const oliviahealth_branding = require('../../assets/images/oliviahealth_branding.png')

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 30 }}>
      <View style={{ flex: 1, gap: 10 }}>
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
      </View>
    </SafeAreaView>
  );
}