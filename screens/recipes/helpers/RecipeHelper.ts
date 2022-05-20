import { RecipeProps } from "../../../types";

export const getRecipesInCategory = async (
  data: RecipeProps[],
  category: number
) => {
  return data.reduce((prevValue: any, currValue: any) => {
    if (currValue.category === category) {
      prevValue.push(currValue);
    }
    return prevValue;
  }, []);
};
