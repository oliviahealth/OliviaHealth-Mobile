import { ILocation } from "@/src/utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  location: ILocation;
}

const OllieLocationCard: React.FC<Props> = ({ location }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
            {location.name}
          </Text>
          <Text style={{ fontSize: 14, color: "#555", marginBottom: 4 }}>
            {location.address}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

export default OllieLocationCard;
