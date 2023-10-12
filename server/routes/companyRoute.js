import { Router } from "express";
import { getAllCompanies, hardDeleteCompany, createCompany, softDeleteCompany, updateCompany } from '../controllers/CompanyController.js';
import multer from 'multer';
const router = Router();
import path from 'path';
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

router.get('/companies', getAllCompanies);
router.post('/create-company', upload.fields([{ name: 'image_src', maxCount: 10 }, { name: 'video_src', maxCount: 10 }]), createCompany);
router.put('/update-company', upload.fields([{ name: 'image_src', maxCount: 10 }, { name: 'video_src', maxCount: 10 }]), updateCompany)
router.put('/delete-company', softDeleteCompany); // default delete method
router.delete('/hard-delete-company', hardDeleteCompany);

export default router;