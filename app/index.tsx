import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import OllieLineArt from "../assets/images/ollie-avatar-lineart.svg";

const { width, height } = Dimensions.get("window");

const sizeScale = Math.min(width / 393, height / 852);
const scale = Math.min(Math.max(sizeScale, 0.82), 1);

const SHEET_HEIGHT = 390 * scale;

const CARD_WIDTH = (width - 16 * 2 - 12) / 2;
const CARD_HEIGHT = 136;

const ICON_CIRCLE_SIZE = 48;
const ICON_SIZE = 26;

const TITLE_SIZE = 14;
const SUBTITLE_SIZE = 11;

function MenuCard({ title, subtitle, children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF6FF",
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
        transform: [{ scale: pressed ? 0.98 : 1 }],
        opacity: pressed ? 0.94 : 1,
      })}
    >
      <View
        style={{
          height: ICON_CIRCLE_SIZE,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {children}
      </View>

      <Text
        style={{
          color: "#2A2230",
          fontSize: TITLE_SIZE,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 4,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text
        style={{
          color: "#8B7D92",
          fontSize: SUBTITLE_SIZE,
          lineHeight: SUBTITLE_SIZE + 4,
          textAlign: "center",
        }}
        numberOfLines={2}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
}

function IconCircle({ children, bordered = false }: any) {
  return (
    <View
      style={{
        width: ICON_CIRCLE_SIZE,
        height: ICON_CIRCLE_SIZE,
        borderRadius: ICON_CIRCLE_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4E9FF",
        borderWidth: bordered ? 1 : 0,
        borderColor: "#E7D5FF",
      }}
    >
      {children}
    </View>
  );
}

export default function IntroScreen() {
  const router = useRouter();

  const [visible] = useState(true);

  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT + 40)).current;
  const sheetOpacity = useRef(new Animated.Value(0)).current;

  const isSmallScreen = height < 860;

  const backgroundImage = isSmallScreen
    ? require("../assets/images/olivia-splash-smaller.png")
    : require("../assets/images/olivia-splash.png");

  useEffect(() => {
    Animated.parallel([
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        damping: 20,
        stiffness: 150,
        mass: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navigateToJourney = () => {
    router.replace("/(tabs)/(journey)");
  };

  const navigateToChat = () => {
    router.replace("/(tabs)/chat");
  };

  const navigateToLibrary = () => {
    router.replace("/(tabs)/(library)");
  };

  const navigateToAbout = () => {
    router.replace("/(tabs)/(about)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Image
        source={backgroundImage}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Animated.View
            style={{
              minHeight: SHEET_HEIGHT,
              paddingHorizontal: 16,
              paddingTop: 4 * scale,
              paddingBottom: 18 * scale,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              opacity: sheetOpacity,
              transform: [{ translateY: sheetTranslateY }],
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 20 * scale,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Select a path
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.86)",
                fontSize: 13 * scale,
                textAlign: "center",
                marginBottom: 14,
              }}
            >
              Where would you like to go?
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                rowGap: 12,
              }}
            >
              <MenuCard
                title="Olivia Journey"
                subtitle="Progress at your speed"
                onPress={navigateToJourney}
              >
                <IconCircle>
                  <MaterialCommunityIcons
                    name="orbit"
                    size={ICON_SIZE}
                    color="#B642D3"
                  />
                </IconCircle>
              </MenuCard>

              <MenuCard
                title="Chat with Ollie"
                subtitle="Answer all things parenthood"
                onPress={navigateToChat}
              >
                <IconCircle bordered>
                  <OllieLineArt
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    fill="none"
                    color="#B642D3"
                  />
                </IconCircle>
              </MenuCard>

              <MenuCard
                title="Library"
                subtitle="Browse all of our content"
                onPress={navigateToLibrary}
              >
                <IconCircle>
                  <Feather
                    name="book-open"
                    size={ICON_SIZE - 2}
                    color="#B642D3"
                  />
                </IconCircle>
              </MenuCard>

              <MenuCard
                title="About us"
                subtitle="Learn about the Olivia team"
                onPress={navigateToAbout}
              >
                <IconCircle>
                  <Ionicons
                    name="information-circle-outline"
                    size={ICON_SIZE}
                    color="#B642D3"
                  />
                </IconCircle>
              </MenuCard>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}