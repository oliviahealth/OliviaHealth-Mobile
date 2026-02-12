import InfographicCard from "@/components/InfographicCard";
import SearchComponent from "@/components/SearchComponent";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

export default function Infographics() {
  const resources = useResourcesStore(state => state.resources);
  const infographics = resources?.infographics;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isError = !resources || !infographics;

  const filteredInfographics = !isError
    ? infographics.filter(infographic =>
        infographic.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          gap: 18,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, gap: 18 }}>
          <SearchComponent
            placeholder="Search by title"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {isError ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 60,
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#555" }}>
                Something went wrong
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#999",
                  textAlign: "center",
                  paddingHorizontal: 40,
                }}
              >
                Please try again later.
              </Text>
            </View>
          ) : (
            filteredInfographics.map((infographic, index) => (
              <InfographicCard key={index} infographic={infographic} />
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
