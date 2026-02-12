import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef } from "react";
import { Animated, TextInput, View } from "react-native";

import OllieOverviewCard from "./OllieOverview";

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    if (value && value.trim().length > 0) {
      // reset then animate in
      opacity.setValue(0);
      translateY.setValue(8);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // optional: animate out (feels nicer than popping away)
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 6,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [value, opacity, translateY]);

  const showCard = !!value && value.trim().length > 0;

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
          style={{ flex: 1, fontSize: 16, color: "#555" }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {/* keep mounted to allow fade-out; hide pointer events when not shown */}
      <Animated.View
        pointerEvents={showCard ? "auto" : "none"}
        style={{
          opacity,
          transform: [{ translateY }],
          marginTop: 12,
          // prevents it from taking space when "hidden" (still mounted)
          height: showCard ? undefined : 0,
          overflow: "hidden",
        }}
      >
        <OllieOverviewCard />
      </Animated.View>
    </View>
  );
};

export default SearchComponent;
