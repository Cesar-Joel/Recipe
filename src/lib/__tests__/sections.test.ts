import { sections } from "../sections";

describe("sections", () => {
  it("has exactly three sections in the expected order", () => {
    expect(sections.map((section) => section.name)).toEqual([
      "Weekly Menu",
      "Recipes",
      "Shopping List",
    ]);
  });

  it("has unique keys, names, and routes", () => {
    for (const field of ["key", "name", "route"] as const) {
      const values = sections.map((section) => section[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("starts with the landing route", () => {
    expect(sections[0].route).toBe("/");
  });

  it("describes each section with one non-empty sentence", () => {
    for (const { description } of sections) {
      expect(description.length).toBeGreaterThan(0);
      expect(description.endsWith(".")).toBe(true);
      // No sentence ending in the middle of the text.
      expect(description).not.toMatch(/[.!?]\s/);
      expect(description.slice(0, -1)).not.toMatch(/[.!?]$/);
    }
  });
});
