import { Text, TouchableOpacity, View } from "react-native";
import { ILocation } from "../src/utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { LocationBottomSheet } from "./LocationBottomSheet";

interface OllieLocationCardProps {
  location: ILocation,
  onClick: () => void 
}

export const OllieLocationCard: React.FC<OllieLocationCardProps> = ({location, onClick}) => {

  //TODO  this should be the distance from your location to this location
  const locOpen = Math.random() < 0.5;
  
  return (
  <>
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.6}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: 'rgba(0, 0, 0, 0.25)',
          borderWidth: 1.3,
          borderRadius: 16,
          backgroundColor: 'white',
          padding: 8,
          paddingEnd: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 4
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            {location.name}
          </Text>
          <Text 
            style={{ 
              // fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.5)' 
            }}
          >
            <Text 
              style={{ 
                fontWeight: 'bold', 
                color: locOpen ? 'rgba(0, 200, 0, 0.6)' : 'rgba(200, 0, 0, 0.6)' 
              }}
            >
              {locOpen ? "Open" : "Closed"}
            </Text>
            {" • " + location.address}
          </Text>
        </View>
        <Ionicons style={{alignSelf: 'center'}} name="chevron-forward" size={20} color="black"/>
      </View>
    </TouchableOpacity>
  </>)
}