import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
