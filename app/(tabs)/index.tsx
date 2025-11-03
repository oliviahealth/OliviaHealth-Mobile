import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const oliviahealth_branding = require('../../assets/images/oliviahealth_branding.png')

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 30,
        gap: 18,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, gap: 18 }}>
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

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Local Resources</Text>
            <Text style={{ color: '#B642D3' }}>See all</Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/04/family-promise-768x431.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Family Promise
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                Local resources from the Brazos Valley-College Station area.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/04/jubilee-768x432.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Jubilee Birth Center
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                Local resources from the Brazos Valley-College Station area.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/04/lincoln-1-768x432.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Lincoln House of Hope
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                Local resources from the Brazos Valley-College Station area.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Quick Tips</Text>
            <Text style={{ color: '#B642D3' }}>See all</Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Trimesters-Fathers.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Pregnancy Trimesters for Fathers
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                In this video, learn about what to expect your partner to experience throughout pregnancy.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Vitamins.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Vitamins and Supplements
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                Learn about vitamins and supplements to take during pregnancy.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Allergies.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Allergies
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                Learn about allergic reactions and your baby.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#000" }}>Infographics</Text>
            <Text style={{ color: '#B642D3' }}>See all</Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/03/Foods-to-Avoid.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Foods to Avoid
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                In this infographic, learn about food to avoid consuming during pregnancy.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/04/baby-teething.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Baby Teething
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                In this infographic, learn tips for when your baby begins teething.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }} activeOpacity={0.9}>
            <Image source={{ uri: "https://oliviahealth.org/wp-content/uploads/2023/05/Babyproofing-Infographic.png" }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }} numberOfLines={2}>
                Babyproofing
              </Text>
              <Text style={{ fontSize: 12, color: '#888' }}>
                In this infographic, learn how to safely babyproof your house.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={32} color="#B642D3" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}