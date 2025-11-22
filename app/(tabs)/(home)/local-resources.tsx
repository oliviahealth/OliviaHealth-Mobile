import LocalResourceCard from "@/components/LocalResourceCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function LocalResources() {
  const resources = useResourcesStore(state => state.resources);
  const local_resources = resources?.local_resources;
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, gap: 18 }}>
          <SearchBar placeholder="Search by title" value={searchQuery} onChangeText={setSearchQuery} />
          {local_resources?.filter((local_resource) => local_resource.title.toLowerCase().includes(searchQuery.toLowerCase())).map((local_resource, index) => (
            <LocalResourceCard key={index} localResource={local_resource} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
