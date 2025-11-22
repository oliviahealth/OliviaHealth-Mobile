import QuickTipCard from "@/components/QuickTipCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function QuickTips() {
  const resources = useResourcesStore(state => state.resources);
  const quick_tips = resources?.quick_tips;
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, gap: 18 }}>
          <SearchBar placeholder="Search by title" value={searchQuery} onChangeText={setSearchQuery} />
          {quick_tips?.filter((tip) => tip.title.toLowerCase().includes(searchQuery.toLowerCase())).map((tip, index) => (
            <QuickTipCard key={index} quickTip={tip} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
