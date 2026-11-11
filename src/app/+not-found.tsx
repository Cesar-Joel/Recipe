import { Link } from "expo-router";
import Head from "expo-router/head";
import { StyleSheet, Text, View } from "react-native";

import { APP_NAME } from "@/lib/sections";

// "+not-found" is a special route: Expo Router shows it for any unknown address.
export default function NotFoundScreen() {
  return (
    <View style={styles.screen}>
      {/* Head sets the browser tab title after load; generateMetadata is not applied to this page in static export. */}
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Text style={styles.message}>This page doesn&apos;t exist.</Text>
      <Link href="/" style={styles.link}>
        Go to Weekly Menu
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  message: {
    fontSize: 20,
    color: "#111111",
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: "#0b5fff",
    paddingVertical: 12,
  },
});
