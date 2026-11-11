import { Tabs } from "expo-router";

import { sections } from "@/lib/sections";

// Tabs is Expo Router's tab navigator. On the phone it renders touchable tabs;
// on the web it renders links, so mouse, keyboard, and page reload all work.
// Each Tabs.Screen "name" matches a file in this folder.
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: sections[0].name, tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="recipes"
        options={{ title: sections[1].name, tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{ title: sections[2].name, tabBarIcon: () => null }}
      />
    </Tabs>
  );
}
