import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import OllieOverviewCard from "./OllieOverview";

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, value, onChangeText }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  const [ollieResponse, setOllieResponse] = useState(null);
  const [ollieLoading, setOllieLoading] = useState(false);

  const prevHasTextRef = useRef(false);

  useEffect(() => {
    const hasTextNow = (value ?? "").trim().length > 0;
    const hadTextBefore = prevHasTextRef.current;

    // update ref for next render
    prevHasTextRef.current = hasTextNow;

    // animate in only once: empty -> non-empty
    if (!hadTextBefore && hasTextNow) {
      opacity.setValue(0);
      translateY.setValue(8);

      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }

    // animate out only once: non-empty -> empty
    if (hadTextBefore && !hasTextNow) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 6, duration: 150, useNativeDriver: true }),
      ]).start();

      setOllieResponse(null);
      setOllieLoading(false);
    }
  }, [value, opacity, translateY]);



  const showCard = !!value && value.trim().length > 0;

  const getOllieOverview = async () => {
    const OLLIE_URL = "https://intelligentchild.org/ollie/formattedresults";

    try {
      setOllieLoading(true);
      setOllieResponse(null);

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

      setOllieResponse(data);
    } catch (e) {
      console.error("Failed to get Ollie overview", e);
    } finally {
      setOllieLoading(false);
    }
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
          }}
          returnKeyType="search"
          onSubmitEditing={getOllieOverview}
        />
      </View>

      <Animated.View
        pointerEvents={showCard ? "auto" : "none"}
        style={{
          opacity,
          transform: [{ translateY }],
          marginTop: 12,
          height: showCard ? undefined : 0,
          overflow: "hidden",
        }}
      >
        {!ollieResponse && !ollieLoading && value && (
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

        {(ollieLoading || ollieResponse) && (
          <OllieOverviewCard
            data={ollieResponse}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default React.memo(SearchComponent);
