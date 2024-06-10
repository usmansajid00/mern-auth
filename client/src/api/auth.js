import axios from "axios";

const api = axios.create({
  baseURL: process.env.APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
