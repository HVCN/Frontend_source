import { foodomaticAPI } from "./API";

export async function createUserCollection(uid: string | undefined) {
  const request = await foodomaticAPI();

  let response = await request.post(`user/new/${uid}`);

  if (response.status !== 204) {
    return response.status;
  }

  return null;
}

export async function deleteUserCollection(uid: string | undefined) {
  const request = await foodomaticAPI();

  let response = await request.delete(`user/delete/${uid}`);

  if (response.status !== 204) {
    return response.status;
  }

  return null;
}
