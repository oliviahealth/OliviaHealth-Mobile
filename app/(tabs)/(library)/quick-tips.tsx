import QuickTipCard from "@/components/QuickTipCard";
import SearchComponent from "@/components/SearchComponent";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Text, View } from "react-native";

export default function QuickTips() {
  const resources = useResourcesStore((state) => state.resources);
  const quick_tips = resources?.quick_tips;
  const [searchQuery, setSearchQuery] = useState("");

  const isError = !resources || !quick_tips;

  const filteredQuickTips = useMemo(() => {
    if (isError) return [];
    return quick_tips.filter((tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quick_tips, searchQuery, isError]);

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
          data={filteredQuickTips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <QuickTipCard quickTip={item} />}
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
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews
        />
      )}
    </KeyboardAvoidingView>
  );
}