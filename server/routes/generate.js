import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { generate } from "../controllers/generate.js";

const router = express.Router();

/* READ */
router.post("/", generate);

export default router;
