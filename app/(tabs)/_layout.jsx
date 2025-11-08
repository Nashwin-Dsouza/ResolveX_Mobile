import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets(); // We still use this, but differently

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.textPrimary,
          fontWeight: "600",
        },
        headerShadowVisible: false,

        // --- THIS IS THE UPDATED STYLE ---
        tabBarStyle: {
          position: 'absolute',
          bottom: 16 + insets.bottom, // Make sure it respects the safe area
          left: 16,
          right: 16,
          
          borderRadius: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: 'hsla(220, 15%, 88%, 0.5)', 
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 32,
          elevation: 20,

          paddingTop: 5,
          paddingBottom: 5, 
          height: 60,
        },
        // --- END OF UPDATE ---

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}