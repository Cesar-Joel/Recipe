import { Stack } from "expo-router";

// The root Stack hosts the tab screens and the not-found screen.
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
