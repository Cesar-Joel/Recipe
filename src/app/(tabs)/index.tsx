import type { Metadata } from "expo-router/server";

import SectionScreen from "@/components/SectionScreen";
import { APP_NAME, sections } from "@/lib/sections";

// generateMetadata sets the browser tab title in the HTML at build time, before
// JavaScript runs (SDK 58). It must be exported from a route file; it has no
// effect on the phone.
export function generateMetadata(): Metadata {
  return { title: APP_NAME };
}

// The "(tabs)" folder is a route group: its name does not appear in the URL,
// so this file is the "/" route while sharing the tab bar in (tabs)/_layout.tsx.
export default function WeeklyMenuScreen() {
  const { name, description } = sections[0];
  return <SectionScreen name={name} description={description} />;
}
