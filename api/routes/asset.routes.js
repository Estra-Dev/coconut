import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { generate, getAssets } from "../controllers/asset.controllers.js";
const router = express.Router();

router.post("/generate", verifyToken, generate);
router.get("/getassets", getAssets);

export default router;
