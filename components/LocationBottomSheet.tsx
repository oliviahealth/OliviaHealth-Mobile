import { ILocation } from "@/src/utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import AppBottomSheet from "./BottomSheet";
import React from "react";
import MapView from 'react-native-maps';

interface LocationBottomSheetProps {
  location: ILocation,
  isOpen: boolean;
  onClose: () => void;
}

const LinkButton: React.FC<{
  icon: any, 
  text: string, 
  func: any,
  redirect: boolean,
}> = ({icon, text, func, redirect }: {icon: any, text: string, func: any, redirect: boolean}) => {
  return <TouchableOpacity
    onPress={func}
    activeOpacity={0.8}
    style={{
      marginTop: 8
    }}
  >
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignSelf: 'flex-start',
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection:'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          gap: 4,
          padding: 6,
        }}
      >
        <Ionicons name={icon} size={16} color={'rgba(0, 0, 0, 0.75)'}></Ionicons>
        <Text
          style={{
            color:'rgba(0, 0, 0, 0.75)',
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >
          {text}
        </Text>
        {redirect && (<Ionicons name={'open-outline'} size={16} color={'rgba(0, 0, 0, 0.75)'}></Ionicons>)}
      </View>
    </View>
  </TouchableOpacity>
}

const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    Alert.alert('Error', 'Unable to perform action');
  }
}

export const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({location, isOpen, onClose}) => {

  // console.log(location.longitude, location.latitude);

  return <AppBottomSheet 
    isOpen={isOpen} 
    onClose={onClose}
  >
    <View
      style={{
        flexDirection: 'column',
        padding: 24,
        // backgroundColor: 'red'
      }}
    >
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          aspectRatio: 1,
          borderRadius: 24,
          marginBottom: 24,
        }}
      >
        <MapView
          style={{
            width: '100%',
            aspectRatio: 1,
          }}
          initialRegion={{
            latitude: location.latitude ?? Math.random() * 180,
            longitude: location.longitude ?? Math.random() * 180,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
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
        style={{marginTop: 16}}
      >
        {location.description}
      </Text>
      <LinkButton 
        icon={'location-outline'} 
        text={"Open in maps"} 
        func={() => {openLink(location.addressLink ?? "about:any")}} 
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