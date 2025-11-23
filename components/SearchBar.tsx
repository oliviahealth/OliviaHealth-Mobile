import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 15, paddingHorizontal: 15, height: 45 }}>
      <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 10 }} />
      <TextInput
        placeholder={placeholder ?? ""}
        placeholderTextColor="#aaa"
        style={{ flex: 1, fontSize: 16, color: '#555' }}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchBar;