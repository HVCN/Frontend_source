import { InventoryItemObject } from "../types";
import { foodomaticAPI } from "./API";

async function deleteImageFromStorage() {} // TODO

export async function getItemsFromReceipt(uri: string) {
  const request = await foodomaticAPI();
  let result = await request.post("/ocr/scan", { uri: uri });

  if (result.status === 201) {
    return result.data;
  }

  return null;
}

export async function addItemsFromReceipt(
  uid: string,
  itemArray: InventoryItemObject[]
) {
  const request = await foodomaticAPI();

  let result = await request.post(`/ocr/insertMany/${uid}`, {
    document: itemArray,
  });

  if (result.status === 201) {
    return result.data;
  }

  return null;
}
