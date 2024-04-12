import Asset from "../model/asset.model.js";
import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  const { username, oldpassword, newpassword } = req.body;

  if (req.params.userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  const validUser = await User.findById(req.params.userId);
  // console.log(validUser);
  if (req.body.newpassword && req.body.oldpassword === "") {
    return next(errorHandler(403, "Please input old password"));
  }
  if (req.body.oldpassword && req.body.newpassword === "") {
    return next(errorHandler(403, "Please input new password"));
  }

  if (req.body.newpassword) {
    const verifyOldpassword = await bcryptjs.compare(
      req.body.oldpassword,
      validUser.password
    );
    // console.log(verifyOldpassword);
    if (!verifyOldpassword) {
      return next(errorHandler(403, "Invalid Old password"));
    } else {
      if (req.body.newpassword.length < 6) {
        return next(
          errorHandler(403, "New Password cannot be less than 6 digits")
        );
      } else {
        req.body.newpassword = await bcryptjs.hash(req.body.newpassword, 10);
      }
    }
  }

  if (req.body.username) {
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(errorHandler(403, "Username can only be between 6 and 20"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(403, "Username cannot contain space"));
    }
    if (!req.body.username.match(/^[A-Za-z0-9]+$/)) {
      return next(
        errorHandler(403, "username can only contain numbers and letters")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          password: req.body.newpassword,
          photoUrl: req.body.googlePhotoUrl,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("You have successfully signed out");
  } catch (error) {
    next(error);
  }
};

export const updateWithAssets = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.assetId);
    const user = await User.findById(req.params.userId);

    const assetIndex = user.ownedAssets.indexOf(req.params.assetId);
    if (assetIndex === -1) {
      user.ownedAssets.push(asset);
      user.numberOfAssets = user.ownedAssets.length;
    } else {
      user.ownedAssets.filter((id) => id !== req.params.assetId);
      user.numberOfAssets = user.ownedAssets.length;
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const getUer = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
