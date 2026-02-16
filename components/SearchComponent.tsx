import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useMutation } from '@tanstack/react-query';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import OllieOverviewCard from "./OllieOverview";

const OLLIE_URL = "https://intelligentchild.org/ollie/formattedresults";

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, value, onChangeText }) => {

  const mutation = useMutation({
    mutationFn: async (value: string | undefined) => {
      const formData = new FormData();
      // use the user's actual input instead of a hardcoded string:
      formData.append("data", value?.trim() ?? "");
      formData.append("conversationId", uuid());

      const res = await fetch(OLLIE_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      return data
    },
    onError: (error) => {
      console.error("Failed to get Ollie overview", error);
    },
  })

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
        <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 10 }} />
        <TextInput
          placeholder={placeholder ?? ""}
          placeholderTextColor="#aaa"
          style={{ flex: 1, fontSize: 16, color: "#555" }}
          value={value}
          onChangeText={(t) => {
            // if they start typing again after submitting, you can either keep hasSubmitted
            // or reset it—this keeps it until they clear the box
            onChangeText?.(t as any);
            mutation.reset();
          }}
          returnKeyType="search"
          onSubmitEditing={() => mutation.mutate(value)}
        />
      </View>

      <View>
        {!mutation.data && !mutation.isError && !mutation.isPending && value && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 13, color: "#444", lineHeight: 18 }}>
              Not finding what you need? Enter your question above and press{" "}
              <Text style={{ fontWeight: "700" }}>Enter</Text> for more results.
            </Text>

          </View>
        )}

        {(mutation.isPending || mutation.data || mutation.error) && (
          <OllieOverviewCard
            data={mutation.data}
            isError={mutation.isError}
            isLoading={mutation.isPending}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(SearchComponent);
