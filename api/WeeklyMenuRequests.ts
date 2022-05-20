import { foodomaticAPI } from "./API";

export async function getWeeklyMenu(uid: string | undefined) {
  const request = await foodomaticAPI();

  let response = await request.get(`weeklymenu/${uid}`);

  if (response.status == 200) {
    return response.data;
  }
  if (response.status === 204) {
    return response.status;
  }

  return null;
}

export async function deleteMenuDay(
  uid: string | undefined,
  item: {
    type: string;
    weekDay: number;
  }
) {
  const request = await foodomaticAPI();

  let response = await request.delete(`weeklymenu/${uid}`, {
    data: item,
  });

  return response.status;
}

export async function changeMenuDay(
  uid: string | undefined,
  item: {
    weekDay: number;
    type: string;
    newId: string;
  }
) {
  const request = await foodomaticAPI();

  let response = await request.put(`weeklymenu/${uid}`, item);

  return response.status;
}

export const generateWeeklyMenu = async (uid: string | undefined) => {
  const request = await foodomaticAPI();

  let response = await request.get(`weeklymenu/${uid}/generate`);

  //204, 200, 400 codes
  if (response.status === 200) {
    return response.data;
  }
  // if (response.status === 204) {
  //   return response.status;
  // }

  return null;
};
