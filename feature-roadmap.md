# Feature Roadmap — `/speckit-specify` Prompts

**How to use:** run one feature at a time through the full cycle (specify → clarify → plan → tasks → analyze → implement), test it on the phone and in the browser, merge it, and only then start the next one. Paste each prompt right after `/speckit-specify`.

| # | Feature | Depends on | When it's done, I can… |
|---|---|---|---|
| 1 | App shell (walking skeleton) | — | Open the app and move between its three empty sections |
| 2 | Recipe book | 1 | Save the recipes I know how to cook |
| 3 | Weekly menu | 2 | Plan the week's meals using my recipes |
| 4 | Shopping list | 3 | See the week's total ingredients and mark what I need to buy |
| 5 | Ingredient prices & cost estimate | 4 | Know roughly how much the week's food will cost |

---

## 1. App shell (walking skeleton)

```
Create the basic shell of a personal meal-planning app that I will use on my phone and in my computer's browser. The app has three sections: Recipes, Weekly Menu, and Shopping List. For now each section only shows its name and one sentence describing what it will be for; there is no data and no functionality yet.

I must be able to move between the three sections easily on both the phone (touch) and the computer (mouse and keyboard), and the layout must look right on both a narrow phone screen and a wide computer window. Any example or starter content that is not part of this app must be removed.

This is the walking skeleton: its only purpose is to prove the app runs on both platforms and to give later features a place to live.
```

---

## 2. Recipe book

```
Add a recipe book where I keep the recipes I know how to cook. Each recipe has:
- A name (required).
- A list of ingredients. Each line has an ingredient and an optional quantity (some ingredients are "to taste").
- Preparation instructions as free text.
- One or more usual meal times when I tend to eat it (for example: chilaquiles → Breakfast; hamburgers → Lunch and Dinner).
- One or more dish categories (for example: Main dish, Side dish, Snack).
- Optional notes.

Ingredients are shared across recipes: "tomato" in two recipes is the same ingredient, not two different ones. When I add an ingredient to a recipe, I can pick an existing one or create a new one by typing its name, so I don't end up with duplicates. Each ingredient has a single measurement unit chosen when it is created (for example: piece, g, kg, ml, l, cup, tbsp, tsp), and quantities in recipes are always expressed in that unit. Later features will add up quantities across recipes and attach a price to each ingredient, so ingredients must be their own records, not free text inside a recipe.

The app starts with default meal times (Breakfast, Lunch, Dinner, Snack) and default dish categories (Main dish, Side dish, Snack). I can add my own of each as I think of them (for example: Dessert, Starter, Finger food).

User stories, in priority order:
- P1: I can create, view, edit, and delete recipes with their name, ingredients, quantities, preparation, and notes, and see all my recipes in a list.
- P2: I can tag each recipe with its usual meal times and dish categories, and filter the recipe list by meal time and by category.
- P3: I can add new meal times and new dish categories, and they become available for every recipe.

All data is stored on the device and must still be there after closing and reopening the app.
```

---

## 3. Weekly menu

```
Add a weekly menu where I plan what I will eat each day of the week, Monday through Sunday, using the recipes in my recipe book.

Each day is divided into meals. By default every day has Breakfast, Lunch, and Dinner, but each day's meals can be changed independently: I can add a meal to a specific day (for example, a Snack on Wednesday) or remove one (for example, no Breakfast on Sunday). The meals I can add come from the same list of meal times used to tag recipes, including the ones I created myself. Meals within a day appear in the same order as that list; reordering meals by hand is out of scope for now.

Each meal can hold one or more recipes (for example, a main dish and a side dish for lunch). When I choose a recipe for a meal, recipes tagged with that meal time are shown first, but I can pick any recipe. The same recipe can appear in several meals during the week.

There is a single current weekly menu, and I can clear it to plan a new week. Past weeks do not need to be kept.

User stories, in priority order:
- P1: I can see the whole week with Breakfast, Lunch, and Dinner for each day, add and remove recipes in any meal, and clear the whole menu.
- P2: I can add and remove meals on a specific day.
- P3: When picking a recipe for a meal, recipes tagged with that meal time appear first.

The menu is stored on the device and must still be there after closing and reopening the app.
```

---

## 4. Shopping list

```
Add a shopping list generated from the current weekly menu. It lists every ingredient needed for all the recipes in the menu, with the total quantity for the week in each ingredient's unit. If a recipe appears several times in the week, its ingredients are counted each time. Recipes are used as written; scaling by number of servings is out of scope. Ingredients with no quantity in a recipe ("to taste") still appear in the list, marked as having no quantity.

I can mark the ingredients I actually need to buy, because I already have some of them at home. The list updates when the menu changes, and the marks I already made are kept for ingredients that are still in the list.

User stories, in priority order:
- P1: I can see the full list of ingredients and their total quantities for the week's menu.
- P2: I can mark and unmark the ingredients I need to buy, and choose to see only the marked ones.

The list does not show prices yet; a later feature adds them.
```

---

## 5. Ingredient prices & cost estimate

```
Add prices to ingredients and an estimate of how much the week's shopping will cost.

Each ingredient can have a price per its measurement unit (for example, tomatoes: price per kg; eggs: price per piece). Prices are in Mexican pesos (MXN). The price is optional: ingredients can have no price yet, and nothing in the app may break or show misleading numbers because of it.

I can see all my ingredients in one place, with their unit and price (or a clear "no price yet" indicator), and set, change, or remove an ingredient's price there. I can also set a missing price directly from the shopping list.

In the shopping list, the estimate adds up quantity × price for the ingredients I marked as needing to buy. Ingredients without a price or without a quantity are left out of the total, and the app tells me how many were left out so I know the estimate is incomplete. This is an approximate estimate based on the amounts the recipes use, not on package sizes at the store.

User stories, in priority order:
- P1: I can view all ingredients and set, edit, or clear their prices, including leaving them empty.
- P2: The shopping list shows the estimated cost of the items I need to buy, and how many items are not included because they have no price or no quantity.
- P3: I can set a missing price directly from the shopping list, and the estimate updates immediately.
```
