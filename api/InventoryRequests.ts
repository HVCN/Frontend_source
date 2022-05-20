import { foodomaticAPI } from "./API";

export async function getAllItemsFromInventory(
  uid: string | undefined,
  inventoryType: string
) {
  const request = await foodomaticAPI();

  let response = await request.get(`inventory/${uid}/${inventoryType}`);

  if (response.status === 204) {
    return response.status;
  } else if (response.status === 200) {
    return response.data;
  }

  return null;
}

export async function searchItemsInventory(
  uid: string | undefined,
  itemName: string
) {
  const request = await foodomaticAPI();

  let response = await request.get(`inventory/${uid}/search/${itemName}`);

  if (response.status === 204) {
    return response.status;
  }
  if (response.status === 200) {
    return response.data;
  }

  return null;
}

export async function deleteItemFromInventory(
  uid: string | undefined,
  item: {
    type: string;
    location: string;
    id: string;
  }
) {
  const request = await foodomaticAPI();
  let response = await request.delete(`inventory/${uid}`, {
    data: item,
  });

  if (response.status === 204) {
    return null;
  }

  return response.status;
}

export async function getAllItemsFromWholeInventory(uid: string | undefined) {
  const request = await foodomaticAPI();

  let response = await request.get(`inventory/${uid}`);

  if (response.status === 204) {
    return response.status;
  }
  if (response.status === 200) {
    return response.data;
  }

  return null;
}

/**
 *
 * @param uid
 * @param item
 * @returns status codes: 201-Item created, 202-Item was not created, probably non-existent user, 400-Bad request
 */
export async function addItemToInventory(
  uid: string | undefined,
  item: {
    type: string;
    location: string;
    itemName: string;
    expirationDate: Date;
  }
) {
  const request = await foodomaticAPI();

  let response = await request.post(`inventory/${uid}`, item);

  if (response.status === 201) {
    return null;
  }

  return response.status;
}

export const getExpiringItems = async (uid: string) => {
  const request = await foodomaticAPI();

  let response = await request.get(`/inventory/${uid}/expiration/search`);

  if (response.status === 200 || response.status === 204) {
    return response.data;
  }

  return null;
};
