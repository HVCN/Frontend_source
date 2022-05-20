// const axios = require("axios").default;
import axios from "axios";
import { getAuth } from "firebase/auth";

export const apiHeader = async () => {
  let auth = getAuth();
  // console.log(await auth.currentUser?.getIdToken());
  return {
    Authorization: "Bearer " + (await auth.currentUser?.getIdToken()),
  };
};

export const foodomaticAPI = async () => {
  let instance = axios.create({
    // baseURL: "https://foodomatic-api.herokuapp.com/",
    baseURL: "https://dev-foodomatic-api.herokuapp.com/",
    timeout: 1000,
    headers: await apiHeader(),
    validateStatus: function (status: number | string) {
      // validateStatus defines which HTTP codes that should thow an error
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  return instance;
};
