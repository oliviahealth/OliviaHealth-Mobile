import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import { useMutation } from '@tanstack/react-query';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import OllieOverviewCard from "./OllieOverview";

const OLLIE_URL = process.env.EXPO_PUBLIC_OLLIE_URL!;

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, value, onChangeText }) => {
  // fetch ollie overview given the search string
  const getOllieOverview = useMutation({
    mutationFn: async (value: string | undefined) => {
      const searchQuery = value?.trim() ?? null;
      if (!searchQuery) return;

      const conversationId = uuid();

      const formData = new FormData();
      // use the user's actual input instead of a hardcoded string:
      formData.append("data", value?.trim() ?? "");
      formData.append("conversationId", conversationId);

      const res = await fetch(`${OLLIE_URL}/formattedresults`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      return {
        conversationId,
        data
      }
    },
    onError: (error) => {
      console.error("Failed to get Ollie overview", error);
    },
  })

  const clearSearch = () => {
    onChangeText?.("");
    getOllieOverview.reset();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fafafa",
          borderRadius: 15,
          paddingHorizontal: 15,
          height: 45,
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={{ marginRight: 10 }}
        />

        <TextInput
          placeholder={placeholder ?? ""}
          placeholderTextColor="#aaa"
          style={{
            flex: 1,
            fontSize: 16,
            color: "#555",
          }}
          value={value}
          onChangeText={(t) => {
            onChangeText?.(t as any);
            getOllieOverview.reset();
          }}
          returnKeyType="search"
          onSubmitEditing={() => getOllieOverview.mutate(value)}
        />

        {/* CLEAR BUTTON */}
        {!!value && (
          <Pressable
            onPress={clearSearch}
            hitSlop={10}
            style={{ marginLeft: 6 }}
          >
            <Ionicons name="close-circle" size={18} color="#aaa" />
          </Pressable>
        )}
      </View>

      <View>
        {!getOllieOverview.data && !getOllieOverview.isError && !getOllieOverview.isPending && value && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 13, color: "#666", lineHeight: 18 }}>
              Not finding what you need? Enter your question above and press{" "}
              <Text style={{ fontWeight: "700" }}>Enter</Text> for more results.
            </Text>

          </View>
        )}

        {(getOllieOverview.isPending || getOllieOverview.data || getOllieOverview.error) && (
          <OllieOverviewCard
            ollieResponse={getOllieOverview.data}
            isError={getOllieOverview.isError}
            isLoading={getOllieOverview.isPending}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(SearchComponent);
