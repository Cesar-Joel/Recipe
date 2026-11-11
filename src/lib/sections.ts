// Single source of truth for the app name and the three sections.
// Tab labels and screen text both read from here so they never drift apart.

export const APP_NAME = "Recipe";

export type Section = {
  key: string;
  name: string;
  route: string;
  description: string;
};

export const sections: readonly Section[] = [
  {
    key: "weekly-menu",
    name: "Weekly Menu",
    route: "/",
    description: "Plan which meals you will eat on each day of the week.",
  },
  {
    key: "recipes",
    name: "Recipes",
    route: "/recipes",
    description:
      "Keep the recipes you know how to cook, with their ingredients and instructions.",
  },
  {
    key: "shopping-list",
    name: "Shopping List",
    route: "/shopping-list",
    description:
      "See everything you need to buy for the week's meals and check items off.",
  },
];
