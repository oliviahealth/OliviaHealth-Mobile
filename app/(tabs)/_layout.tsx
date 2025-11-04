import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { TINT_COLOR } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: TINT_COLOR,
      headerShown: false,
      sceneStyle: {
        backgroundColor: "#ffff",
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about-us"
        options={{
          title: 'About Us',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="information-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}