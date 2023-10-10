import db from '../models/companyModel.js'

export const getAllCompanies = async (req, res, err) => {
    try {
        const query = `SELECT * FROM companies`
        const companies = await db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err.message)
                res.status(500).json({ error: err.message })
            }
            res.status(200).json(rows)
        })
        return companies
    } catch (err) {
        next(err);
    }
}