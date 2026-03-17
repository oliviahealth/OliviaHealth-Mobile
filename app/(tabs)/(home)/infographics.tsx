import InfographicCard from "@/components/InfographicCard";
import SearchComponent from "@/components/SearchComponent";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Text, View } from "react-native";

export default function Infographics() {
  const resources = useResourcesStore((state) => state.resources);
  const infographics = resources?.infographics;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isError = !resources || !infographics;

  const filteredInfographics = useMemo(() => {
    if (isError) return [];
    return infographics.filter((infographic) =>
      infographic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [infographics, searchQuery, isError]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      {isError ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
            gap: 12,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#222222" }}>
            Something went wrong
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#222222",
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Please try again later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredInfographics}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <InfographicCard infographic={item} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            gap: 18,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: 18 }}>
              <SearchComponent
                placeholder="Search by title"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          }
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          removeClippedSubviews
        />
      )}
    </KeyboardAvoidingView>
  );
}