import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";
import { validateSchoolData } from "../middlewares/validateSchool.js";
const router = express.Router();

router.post("/addSchool", validateSchoolData, addSchool);
router.get("/listSchools", listSchools);

export default router;
