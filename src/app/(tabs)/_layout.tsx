import { Tabs } from "expo-router";

import { sections } from "@/lib/sections";

// The active tab differs from the others in two ways, so it is not shown by
// color alone: a strong text color and a light background tint.
// Both text colors have enough contrast on the light background.
const ACTIVE_COLOR = "#0b5fff";
const INACTIVE_COLOR = "#5f6368";
const ACTIVE_BACKGROUND = "#e8f0ff";

// Tabs is Expo Router's tab navigator. On the phone it renders touchable tabs;
// on the web it renders links, so mouse, keyboard, and page reload all work.
// Each Tabs.Screen "name" matches a file in this folder.
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarActiveBackgroundColor: ACTIVE_BACKGROUND,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: sections[0].name,
          tabBarAccessibilityLabel: sections[0].name,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: sections[1].name,
          tabBarAccessibilityLabel: sections[1].name,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: sections[2].name,
          tabBarAccessibilityLabel: sections[2].name,
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
