import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (data) => {
  let response;
  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const signout = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }
  return response;
};
