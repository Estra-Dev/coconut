import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(errorHandler(400, "User already exist"));
    }

    if (password.length < 5) {
      return next(
        errorHandler(400, "Password should not be less than 5 digit")
      );
    }
    if (username.length < 5) {
      return next(
        errorHandler(400, "Username should not be less than 5 digit")
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "Invalide User"));
    }

    const passOk = await bcryptjs.compare(password, validUser.password);
    if (!passOk) {
      return next(errorHandler(400, "Wrong Credentials"));
    } else {
      const { password, ...rest } = validUser._doc;
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.SECRETE
      );
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const { password, ...rest } = user._doc;
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRETE
      );
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = await User.create({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photoUrl: googlePhotoUrl,
      });

      console.log(newUser);

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.SECRETE
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
