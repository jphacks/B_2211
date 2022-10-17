import axiosBase from "axios";
import { baseURL } from "./common";

export const axios = axiosBase.create({
  baseURL: baseURL,
  headers: {
    //"Content-Type": "application/json",
    //"X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    //"Content-Type": "application/x-www-form-urlencoded",
  },
  responseType: "json",
});
