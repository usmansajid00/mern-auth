// JWTService.js
import jwt from "jsonwebtoken";
import RefreshToken from "../models/token.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/index.js";

const signAccessToken = (payload, expiryTime) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
};

const signRefreshToken = (payload, expiryTime) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: expiryTime });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

const storeRefreshToken = async (token, userId) => {
  try {
    const newToken = new RefreshToken({ token, userId });
    await newToken.save();
  } catch (error) {
    console.error(error);
  }
};

export {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  storeRefreshToken,
};
