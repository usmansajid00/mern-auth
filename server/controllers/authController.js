import Joi from "joi";
import User from "../models/user.js";
import UserDto from "../dto/user.js";
import bcrypt from "bcryptjs";
import * as JWTService from "../services/JWTServices.js";
import RefreshToken from "../models/token.js";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  async register(req, res, next) {
    const userRegistrationSchema = Joi.object({
      firstName: Joi.string().min(5).max(32).required(),
      lastName: Joi.string().min(5).max(32).required(),
      username: Joi.string().min(5).max(32).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { firstName, lastName, username, email, password } = req.body;
    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailInUse || usernameInUse) {
        const errorMsg = emailInUse
          ? "Email already in use"
          : "Username already in use";
        return next({ status: 409, message: errorMsg });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userToRegister = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });
      const user = await userToRegister.save();

      const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      const refreshToken = JWTService.signRefreshToken(
        { _id: user._id },
        "60m"
      );

      await JWTService.storeRefreshToken(refreshToken, user._id);

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      //response
      const userDto = new UserDto(user);
      return res.status(201).json({ user: userDto, auth: true });
    } catch (error) {
      return next(error);
    }
  },
  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return next({ status: 401, message: "Invalid username or password" });
      }
      const isMatch = await bcrypt.compare(user.password, password);
      if (!isMatch) {
        return next({ status: 401, message: "Invalid username or password" });
      }

      //Generate JWT Tokens
      const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      const refreshToken = JWTService.signRefreshToken(
        { _id: user._id },
        "60m"
      );

      try {
        await RefreshToken.updateOne(
          {
            _id: user._id,
          },
          {
            token: refreshToken,
          },
          {
            upsert: true,
          }
        );
      } catch (error) {
        return next(error);
      }

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      //response logic
      const userDto = new UserDto(user);
      return res.status(200).json({ user: userDto, auth: true });
    } catch (error) {
      return next(error);
    }
  },
  async logout(req, res, next) {},
  async forgetPassword(req, res, next) {},
  async refresh(req, res, next) {},
};
export default authController;
