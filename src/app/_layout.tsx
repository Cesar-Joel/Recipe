import { Stack } from "expo-router";

// The root Stack hosts the tab screens and the not-found screen.
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* The not-found screen has its own message, so hide the default header
          (it would show the internal route name "+not-found"). */}
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
