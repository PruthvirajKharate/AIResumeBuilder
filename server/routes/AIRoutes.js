import express from "express"
import protect from "../middlewares/AuthMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/AIController.js";


const AIRouter = express.Router();

AIRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary)
AIRouter.post("/enhance-job-desc", protect, enhanceJobDescription)
AIRouter.post("/upload-resume", protect, uploadResume)

export default AIRouter;