import Lang from "../language";

export enum InventoryTypings {
  Fridge = "fridge",
  Freezer = "freezer",
  Pantry = "pantry",
}

export const InventoryTypes = [
  { name: Lang.screens.inventory.fridge, type: InventoryTypings.Fridge },
  { name: Lang.screens.inventory.freezer, type: InventoryTypings.Freezer },
  { name: Lang.screens.inventory.pantry, type: InventoryTypings.Pantry },
];
