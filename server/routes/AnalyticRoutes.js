import { Router } from "express";
import { runReport } from "../controllers/AnalyticsController.js";

const router = Router();

router.get('/analytic', runReport);

export default router;