import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { generate } from "../controllers/asset.controllers.js";
const router = express.Router();

router.post("/generate", verifyToken, generate);

export default router;
