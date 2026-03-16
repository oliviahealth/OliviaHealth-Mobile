import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { TINT_COLOR } from '../../theme';

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
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home-outline" color={color} />,
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
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="bookmark-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}