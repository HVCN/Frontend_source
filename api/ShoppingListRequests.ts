import { foodomaticAPI } from "./API";

export async function addShoppingList(
  uid: string | undefined,
  listName: string
) {
  const request = await foodomaticAPI();

  let response = await request.post(`shoppingList/${uid}`, {
    listName: listName,
  });

  if (response.status === 403 || response.status === 400) {
    return response.status;
  }

  return response.data;
}

export async function getShoppingList(uid: string | undefined, id: string) {
  const request = await foodomaticAPI();

  let response = await request.get(`shoppingList/${uid}/${id}`);

  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export async function getAllShoppingLists(uid: string | undefined) {
  const request = await foodomaticAPI();

  let response = await request.get(`shoppingList/${uid}`);

  if (response.status === 200) {
    return response.data;
  }
  if (response.status === 204) {
    return response.status;
  }

  return null;
}

export async function deleteShoppingList(uid: string | undefined, id: string) {
  const request = await foodomaticAPI();

  let response = await request.delete(`shoppingList/${uid}/list`, {
    data: { id: id },
  });

  if (response.status !== 204) {
    return response.status;
  }

  return null;
}

export async function deleteItemFromShoppingList(
  uid: string | undefined,
  body: { id: string; itemName: string }
) {
  const request = await foodomaticAPI();

  let response = await request.delete(`shoppingList/${uid}`, {
    data: body,
  });

  if (response.status !== 204) {
    return response.status;
  }

  return null;
}

export async function addItemToShoppingList(
  uid: string | undefined,
  body: { id: string; itemName: string }
) {
  const request = await foodomaticAPI();

  let response = await request.put(`shoppingList/${uid}`, body);

  if (response.status !== 200) {
    return response.status;
  }

  return null;
}

export const archiveShoppingList = async (
  uid: string | undefined,
  body: { id: string; archived: boolean }
) => {
  const request = await foodomaticAPI();

  let response = await request.put(`shoppingList/${uid}/archiveList`, body);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};
