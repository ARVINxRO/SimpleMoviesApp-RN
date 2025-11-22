import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#b5cef5",
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "#b5cef5" },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="magnifying-glass"
              size={focused ? 32 : 24}
              color={focused ? "#5b8fe3" : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={focused ? 32 : 24}
              color={focused ? "#5b8fe3" : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="bookmark"
              size={focused ? 32 : 24}
              color={focused ? "#5b8fe3" : "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
