import express from "express";
import { signOut, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signOut);

export default router;
