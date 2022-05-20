import { RecipeProps } from "../types";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  ShoppingList: undefined;
  Profile: undefined;
  SingleList: {};
  ExpirationDates: undefined;
  Inventory: undefined;
  SpecificInventory: undefined;
  CompleteInventory: undefined;
  Recipes: undefined;
  RecipeCategories: { category: string; recipes: RecipeProps | undefined };
  SingleRecipe: undefined;
  WeeklyMenu: undefined;
  ReceiptScanner: undefined;
};
