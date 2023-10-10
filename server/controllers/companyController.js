const CompanyModel = require('../models/companyModel');

const companyController = {
    getAllCompanies: (req, res) => {
        CompanyModel.getAllCompanies((err, company) => {
            if (err) {
                console.log('Error getting all companies:', err)
                res.status(500).send('Error getting all companies')
            }
            res.status(200).json(company)
        })
    }
}

module.exports = companyController;
