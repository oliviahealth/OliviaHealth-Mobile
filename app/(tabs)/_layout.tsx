import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import OllieLineArt from "../../assets/images/ollie-avatar-lineart.svg"; // Uncomment for line art version of Ollie for tab icon
import ProfessionalIcon from "../../assets/images/professionals_icon.svg";
// import OllieTabIcon from "../../components/OllieTabIcon"; // Uncomment for non-line art version of Ollie for tab icon
import { TINT_COLOR } from "../../theme";

export default function TabLayout() {
  return (
    <Tabs
      detachInactiveScreens={false}
      screenOptions={{
        tabBarActiveTintColor: TINT_COLOR,
        headerShown: false,
        sceneStyle: {
          backgroundColor: "#ffff",
        },
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="(journey)"
        options={{
          title: "Journey",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="map-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(library)"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="library-outline" color={color} />
          ),
        }}
      />

      {/* Line art Ollie Version */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Ollie AI",
          tabBarIcon: ({ color }) => (
            <OllieLineArt width={24} height={24} fill="none" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(about)"
        options={{
          title: "About",
          href: null, // disabling the about icon right now since it looks out of place
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={24}
              name="information-circle-outline"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="professionals"
        options={{
          title: "Professionals",
          tabBarIcon: ({ color }) => (
            <ProfessionalIcon
              width={24}
              height={24}
              fill="none"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
