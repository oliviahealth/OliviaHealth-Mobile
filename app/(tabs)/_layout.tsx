import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { TINT_COLOR } from "../../theme";

export default function TabLayout() {
  return (
    <Tabs detachInactiveScreens={false} screenOptions={{
      tabBarActiveTintColor: TINT_COLOR,
      headerShown: false,
      sceneStyle: {
        backgroundColor: "#ffff",
      },
      animation: 'shift',
    }}>
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
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="sparkles-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(library)"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="library-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(about)"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="information-circle-outline" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
