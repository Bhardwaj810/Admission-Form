import express from "express";
import submitAdmission from "../controller/admissionController.js"

const router = express.Router();
router.post("/", submitAdmission);
router.post("/submit", submitAdmission);

export default router;
