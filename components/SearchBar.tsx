import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 15, paddingHorizontal: 15, height: 45 }}>
      <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 10 }} />
      <TextInput
        placeholder={placeholder ?? ""}
        placeholderTextColor="#aaa"
        style={{ flex: 1, fontSize: 16, color: '#555' }}
      />
    </View>
  )
}

export default SearchBar;