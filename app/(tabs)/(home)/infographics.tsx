import InfographicCard from "@/components/InfographicCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function Infographics() {
  const resources = useResourcesStore(state => state.resources);
  const infographics = resources?.infographics;
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, gap: 18 }}>
          <SearchBar placeholder="Search by title" value={searchQuery} onChangeText={setSearchQuery} />
          {infographics?.filter((infographic) => infographic.title.toLowerCase().includes(searchQuery.toLowerCase())).map((infographic, index) => (
            <InfographicCard key={index} infographic={infographic} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
