export type WeekDaysProps = {
  recipe: WeekDayRecipe;
  setRenderMenu: any;
  navigation: any;
};

export type WeekDayRecipe = {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  tags?: string[];
  uri: string;
  category: number;
  weekday: number;
};

export type WeekDayRecipeUGH = {
  recipe: WeekDayRecipe;
};
