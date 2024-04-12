import express from "express";
import {
  getUer,
  signOut,
  updateUser,
  updateWithAssets,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signOut);
router.get("/:userId", getUer);
router.put(
  "/updatewithassets/:userId/:assetuserId/:assetId",
  verifyToken,
  updateWithAssets
);

export default router;
