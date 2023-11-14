import db from "../models/CompanyModel.js";

/**
 *  GET /api/companies/companies
 *  GET /api/companies/companies?company_id=1
 * 
 * PURPOSE: Get all companies or a specific company
 * Parameters: 
 * @query [company_id] - optional
 * 
 * Response:
 *   - Success:
 *     errCode: 0
 *     data: [{companies}]
 *   - Error:
 *      errCode: 1
 *      errMessage: "Not found any companies"
 *      data: []
 * 
 *      errCode: 2
 *      errMessage: "Error while getting companies"
 *      data: []
 */

export const getCompanies = (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            const query = `SELECT * FROM Company
            ORDER BY priority ASC, id DESC`
            db.all(query, [], function (err, rows) {
                if (err) {
                    console.log(err)
                    return res.json({
                        errCode: 2,
                        errMessage: "Error while getting Company",
                        data: []
                    })
                }
                return res.json({
                    errCode: 0,
                    errMessage: "Get Company successfully",
                    data: rows
                })
            })
        } else {
            const query = `SELECT * FROM Company WHERE id = ?
                            ORDER BY priority ASC, id DESC`
            db.all(query, [id], function (err, rows) {
                if (err) {
                    console.log(err)
                    return res.json({
                        errCode: 2,
                        errMessage: "Error while getting Company",
                    })
                }
                return res.json({
                    errCode: 0,
                    errMessage: "Get company successfully",
                    data: rows
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

/**
 * POST /api/companies/create-company
 * PURPOSE: Create a new company
 * Parameters:
 * @body [company_name] - required
 * @body [gmail] - required
 * @body [logo] - required
 * @body [video_banner] - required
 * @body [description] - optional
 * @body [websiteURL] - optional
 * @body [phone] - optional
 * @body [address] - optional
 * 
 * Response:
 *  - Success:
 *      errCode: 0,
 *      errMessage: "Create company successfully",
 *  - Error:
 *      errCode: 1,
 *      errMessage: "Missing required fields",
 * 
 *      errCode: 2,
 *      errMessage: "Error while creating company",
 */
export const createCompany = (req, res, next) => {
    try {
        const { company_name, gmail, description, websiteURL, phone, address } = req.body;
        const logo = req.files.logo[0].filename
        const video_banner = req.files.video_banner[0].filename
        if (!company_name || !gmail || !logo || !video_banner) {
            res.json({
                errCode: 1,
                errMessage: "Missing required fields",
            })
        }
        const query = `INSERT INTO companies 
        (company_name, gmail, logo, video_banner, description, websiteURL, phone, address) 
        VALUES (?,?,?,?,?,?,?,?)`

        db.run(query, [company_name, gmail, logo, video_banner, description, websiteURL, phone, address], function (err) {
            if (err) {
                res.json({
                    errCode: 2,
                    errMessage: "Error while creating company",
                })
            }
            res.json({
                errCode: 0,
                errMessage: "Create company successfully",
            })
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

/**
 * PUT /api/companies/restore-company?company_id=1
 * PURPOSE: Change isDeleted value of company
 * Parameters:
 * @body [company_id] - required
 * 
 * Response:
 * - Success:
 *     errCode: 0,
 *    errMessage: "Restore company successfully",
 * - Error:
 *    errCode: 1,
 *   errMessage: "Missing company_id",
 * 
 *  errCode: 2,
 * errMessage: "Error while restoring company",
 */
export const restoreCompany = (req, res, next) => {
    try {
        const { company_id } = req.query;
        if (!company_id) {
            return res.json({
                errCode: 1,
                errMessage: "Missing company_id",
            })
        }

        const query = `UPDATE companies SET isDeleted=0
                        WHERE company_id = ?`

        db.run(query, [company_id], function (err) {
            if (err) {
                return res.json({
                    errCode: 2,
                    errMessage: "Error while restoring company",
                })
            }
            return res.json({
                errCode: 0,
                errMessage: "Restore company successfully",
            })
        })
    } catch (err) {
        next(err)
    }
}


/**
 * PUT /api/companies/update-company?company_id=1
 * PURPOSE: Update a company
 * Parameters:
 * @body [company_name] - optional
 * @body [gmail] - optional
 * @body [logo] - optional
 * @body [video_banner] - optional
 * @body [description] - optional
 * @body [websiteURL] - optional
 * @body [phone] - optional
 * @body [address] - optional
 * 
 * Response:
 *  - Success:
 *      errCode: 0,
 *      errMessage: "Update company successfully",
 *  - Error:
 *      errCode: 1,
 *      errMessage: "Missing company_id",
 * 
 *      errCode: 2,
 *      errMessage: "Error while updating company",
 */

export const updateCompany = (req, res, next) => {
    try {
        const { company_id } = req.query;
        const { company_name, gmail, description, websiteURL, phone, address, company_index } = req.body;
        const logo = req.body.logo || req.files.logo[0].filename
        const video_banner = req.body.video_banner || req.files.video_banner[0].filename

        if (!company_id) {
            res.json({
                errCode: 1,
                errMessage: "Missing required fields",
            })
        }
        const query = `UPDATE companies 
                        SET company_name = ?, gmail = ?, logo = ?, video_banner = ?, description = ?, websiteURL = ?, phone = ?, address = ?, company_index =?
                        WHERE company_id =?`
        db.run(query, [company_name, gmail, logo, video_banner, description, websiteURL, phone, address, company_index, company_id], function (err) {
            if (err) {
                res.json({
                    errCode: 2,
                    errMessage: "Error while updating company",
                })
            }
            res.json({
                errCode: 0,
                errMessage: "Update company successfully",
            })
        })

    } catch (err) {
        next(err)
    }
}

/**
 * PUT /api/companies/delete-company?company_id=1
 * PURPOSE: Change isDeleted value of company
 * Parameters:
 * @body [company_id] - required
 * 
 * Response:
 *  - Success:
 *      errCode: 0,
 *      errMessage: "Delete company successfully",
 *  - Error:
 *      errCode: 1,
 *      errMessage: "Missing company_id",
 * 
 *      errCode: 2,
 *      errMessage: "Error while deleting company",
 */


export const softDeleteCompany = (req, res, next) => {
    try {
        const { company_id } = req.query;
        if (!company_id) {
            res.json({
                errCode: 1,
                errMessage: "Missing company_id",
            })
        } else {
            const query = `UPDATE companies SET isDeleted = 1
                            WHERE company_id = ?`
            db.run(query, [company_id], function (err) {
                if (err) {
                    res.json({
                        errCode: 2,
                        errMessage: "Error while deleting company",
                    })
                }
                res.json({
                    errCode: 0,
                    errMessage: "Delete company successfully",
                })
            }
            )
        }
    } catch (err) {
        next(err)
    }
}