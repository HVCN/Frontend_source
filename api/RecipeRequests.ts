import { foodomaticAPI } from "./API";

export const getAllRecipes = async () => {
  const request = await foodomaticAPI();

  let response = await request.get(`recipe/recipes`);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const getOneRecipe = async (id: string) => {
  const request = await foodomaticAPI();

  let response = await request.get(`recipe/recipes/${id}`);

  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export const searchRecipeTitle = async (title: string) => {
  const request = await foodomaticAPI();

  let response = await request.get(`recipe/search/${title}`);

  if (response.status == 200) {
    return response.data;
  }

  return null;
};

export const compareRecipeUser = async (
  uid: string | undefined,
  returnQuantity: number
) => {
  const request = await foodomaticAPI();

  let response = await request.get(`recipe/compare/${uid}/${returnQuantity}`);

  if (response.status == 200) {
    return response.data;
  }

  return null;
};
