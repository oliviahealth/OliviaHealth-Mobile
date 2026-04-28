import { ILocation } from "@/src/utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import AppBottomSheet from "./BottomSheet";
import React from "react";
import MapView, { Marker } from 'react-native-maps';

interface LocationBottomSheetProps {
  location: ILocation,
  isOpen: boolean;
  onClose: () => void;
}

const LinkButton = ({ icon, text, func, redirect }: any) => {
  return (
    <TouchableOpacity
      onPress={func}
      activeOpacity={0.8}
      style={{ marginTop: 12 }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          alignSelf: "flex-start",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            padding: 6,
          }}
        >
          <Ionicons name={icon} size={16} color="rgba(0,0,0,0.75)" />
          <Text
            style={{
              color: "rgba(0,0,0,0.75)",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {text}
          </Text>

          {redirect && (
            <Ionicons
              name="open-outline"
              size={16}
              color="rgba(0,0,0,0.75)"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", "Could not open maps");
  }
};

const openNativeMaps = async (
  latitude: number,
  longitude: number,
  name: string
) => {
  const label = encodeURIComponent(name);

  const url =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", "Could not open maps");
  }
};

export const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({location, isOpen, onClose}) => {

  const latitude = location.latitude ?? 0;
  const longitude = location.longitude ?? 0;
  
  return <AppBottomSheet 
    isOpen={isOpen} 
    onClose={onClose}
    snapPoints={['90%']}
    initialSnapIndex={0}
  >
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        overflow: 'scroll',
        paddingHorizontal: 4,
        paddingTop: 18,
        // backgroundColor: 'red'
      }}
    >
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          aspectRatio: 2,
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        <MapView
          style={{
            width: '100%',
            aspectRatio: 2,
          }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={location.name}
            description={location.address}
            opacity={0.8}
          />
        </MapView>
      </View>
      <Text
        style={{fontSize: 18, fontWeight: 'bold'}}
      >
        {location.name}
      </Text>
      <Text
        style={{marginTop: 12}}
      >
        {location.address}
      </Text>
      <Text
        style={{marginTop: 16, marginBottom: 16}}
      >
        {location.description}
      </Text>
      <LinkButton
        icon="location-outline"
        text="Open in Maps"
        func={() =>
          openNativeMaps(latitude, longitude, location.name || "Location")
        }
        redirect={true}
      />
      <LinkButton 
        icon={'globe-outline'} 
        text={"Visit website"} 
        func={() => {openLink(location.website ?? "about:any")}} 
        redirect={true}
      />
      <LinkButton 
        icon={'call-outline'} 
        text={"Call"} 
        func={() => {openLink(`tel:${location.phone}`)}} 
        redirect={false}
      />
    </View>
  </AppBottomSheet>
}