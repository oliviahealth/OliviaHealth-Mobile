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

  //TODO get the actual distance, or we can just ignore this
  // const locDistance = 1.1;

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: 'rgba(0, 0, 0, 0.15)',
          borderWidth: 1,
          borderRadius: 16,
          backgroundColor: 'white',
          padding: 12,
          paddingEnd: 0,
        }}
      >
        <View
          style={{
            flex: 85,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 4,
            marginRight: 16,
            // backgroundColor: 'red'
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
              color: 'rgba(0, 0, 0, 0.5)', 
              fontSize: 13,
            }}
          >
            {location.address}
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'green', 
            flex: 15,
            alignSelf: 'center'
          }}
        >
          <Ionicons
            name="chevron-forward" size={20} color="black"
          />
        </View>
      </View>
    </TouchableOpacity>)
}