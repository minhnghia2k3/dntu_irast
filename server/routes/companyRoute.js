const { Router } = require('express')
const { getAllCompanies } = require('../controllers/companyController')

const router = Router();

router.get('/companies', getAllCompanies);

module.exports = router;