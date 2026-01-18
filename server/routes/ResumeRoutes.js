import express from "express"
import protect from "../middlewares/AuthMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/ResumeController.js";
import upload from '../configs/multer.js'

const ResumeRouter = express.Router();
ResumeRouter.post("/create",protect, createResume);
ResumeRouter.delete("/delete",protect, deleteResume);
ResumeRouter.put("/update",upload.single('image'),protect, updateResume);
ResumeRouter.get('/get/:resumeId', protect ,getResumeById);
ResumeRouter.get('/public/:resumeId',getPublicResumeById);

export default ResumeRouter;