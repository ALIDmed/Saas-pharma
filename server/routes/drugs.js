import express from "express";
import {
  getDrugs,
  getLabos,
  getCategories,
  getSubCategories,
  getDrugsVolume,
  getAnalysisDrugs,
} from "../controllers/drugs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.post("/", verifyToken, getDrugs);

router.get("/labos", verifyToken, getLabos);

router.get("/categories", verifyToken, getCategories);

router.get("/subcategories", verifyToken, getSubCategories);

router.get("/drugsvolume", verifyToken, getDrugsVolume);

router.post("/analysisdrugs", getAnalysisDrugs);

export default router;
