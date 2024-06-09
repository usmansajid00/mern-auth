import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

//user authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgetPassword", authController.forgetPassword);
router.get("/refresh", authController.refresh);

export default router;
