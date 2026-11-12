# Recipe

A personal meal-planning app for my phone and my computer's browser, built with React Native and Expo. It has three sections: Weekly Menu, Recipes, and Shopping List.

## Run

```bash
npm install
npx expo start        # scan the QR code with Expo Go; press "w" for the browser
npx expo start --web  # browser only
```

## Checks

```bash
npx expo lint
npx tsc --noEmit
npx jest
```

Feature specs live in `specs/`; project rules are in `.specify/memory/constitution.md`.
