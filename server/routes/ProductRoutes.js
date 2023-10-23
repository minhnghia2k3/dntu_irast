import { Router } from "express";
import { createProductByCompanyId, deleteProductByProductId, getProductByCompanyId, updateProductByProductId } from "../controllers/ProductController.js";
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

router.get('/products', getProductByCompanyId)
router.post('/create-product', upload.fields([{ name: 'banner_img', maxCount: 1 }, { name: 'other_products', maxCount: 10 }]), createProductByCompanyId)
router.put('/update-product', upload.fields([{ name: 'banner_img', maxCount: 1 }, { name: 'other_products', maxCount: 10 }]), updateProductByProductId)
router.delete('/delete-product', deleteProductByProductId)

export default router;