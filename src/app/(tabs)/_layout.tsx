import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import { sections } from "@/lib/sections";

// The active tab differs from the others in two ways, so it is not shown by
// color alone: a strong text color and a light background tint.
// Both text colors have enough contrast on the light background.
const ACTIVE_COLOR = "#0b5fff";
const INACTIVE_COLOR = "#5f6368";
const ACTIVE_BACKGROUND = "#e8f0ff";

// From this window width (in px) up, the tab bar moves to a left sidebar.
const WIDE_BREAKPOINT = 768;

// Width (in px) of the left sidebar. The tab bar's default minimum is 360,
// which is too wide for three short labels.
const SIDEBAR_WIDTH = 225;

// Tabs is Expo Router's tab navigator. On the phone it renders touchable tabs;
// on the web it renders links, so mouse, keyboard, and page reload all work.
// Each Tabs.Screen "name" matches a file in this folder.
export default function TabLayout() {
  // useWindowDimensions returns the current window size and re-renders when it
  // changes, so resizing the browser switches the layout live.
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarActiveBackgroundColor: ACTIVE_BACKGROUND,
        // Sidebar on wide windows, bottom bar on narrow ones. The "material"
        // variant is only valid together with a left or right position.
        tabBarPosition: isWide ? "left" : "bottom",
        tabBarVariant: isWide ? "material" : "uikit",
        // By default a narrow bar puts each label below its (empty) icon at
        // size 10, where it gets small and clipped. Keep it beside the icon.
        tabBarLabelPosition: "beside-icon",
        // The screens use tabBarIcon: () => null, but the tab bar still draws
        // an empty icon box. Hide it, and drop the label's default margins,
        // so the text is centered in its tab.
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: { marginStart: 0, marginEnd: 0 },
        // tabBarStyle is applied last, so it overrides the sidebar's default
        // 360 px minimum width. Narrow windows keep the default bottom bar.
        tabBarStyle: isWide ? { width: SIDEBAR_WIDTH, minWidth: 0 } : undefined,
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
