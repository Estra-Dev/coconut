import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteAsset,
  generate,
  getAssets,
  getMyAssets,
} from "../controllers/asset.controllers.js";
const router = express.Router();

router.post("/generate/:userId", verifyToken, generate);
router.get("/getassets", getAssets);
router.get("/:userId", verifyToken, getMyAssets);
router.delete("/deleteasset/:assetId", verifyToken, deleteAsset);

export default router;
