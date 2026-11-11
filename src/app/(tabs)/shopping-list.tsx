import type { Metadata } from "expo-router/server";

import SectionScreen from "@/components/SectionScreen";
import { APP_NAME, sections } from "@/lib/sections";

export function generateMetadata(): Metadata {
  return { title: APP_NAME };
}

export default function ShoppingListScreen() {
  const { name, description } = sections[2];
  return <SectionScreen name={name} description={description} />;
}
