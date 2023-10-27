import { Router } from "express";
// import { getAllCompanies, hardDeleteCompany, createCompany, softDeleteCompany, updateCompany, restoreCompany } from '../controllers/CompanyController.js';
import { getCompanies, createCompany, softDeleteCompany, updateCompany, restoreCompany } from "../controllers/CompanyController.js";
import multer from 'multer';
const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/companies', getCompanies);
router.post('/create-company', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'video_banner', maxCount: 1 }]), createCompany);
router.put('/update-company', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'video_banner', maxCount: 1 }]), updateCompany)
router.put('/restore-company', restoreCompany)
router.put('/delete-company', softDeleteCompany); // default delete method
export default router;