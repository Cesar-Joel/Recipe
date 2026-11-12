import { StyleSheet, Text, View } from "react-native";

import { APP_NAME } from "@/lib/sections";

type SectionScreenProps = {
  name: string;
  description: string;
};

// Shared layout for the three sections: app name, section name, one sentence.
export default function SectionScreen({
  name,
  description,
}: SectionScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

// StyleSheet.create is React Native's way to define styles as plain objects
// (there is no CSS file). The same styles work on the phone and on the web.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  content: {
    // Fills narrow screens, but never grows wider than 640 on wide windows.
    width: "100%",
    maxWidth: 640,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: "#222222",
  },
});
