import { ReactElement } from "react";

export type CategoryProps = {
  name: string;
  icon: ReactElement;
  onPress: () => void;
};

export type IngredientsType = {
  data: string[];
};

export type RecipeProps = {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  tags?: string[];
  uri: string;
  category: number;
};
