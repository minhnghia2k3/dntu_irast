import { Router } from "express";
import { getAllCompanies } from '../controllers/companyController.js';

const router = Router();

router.get('/companies', getAllCompanies);

export default router;