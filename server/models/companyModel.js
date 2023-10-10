const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/companies.db')

const CompanyModel = {
    getAllCompanies: (callback) => {
        const query = `SELECT * FROM companies`;
        db.all(query, [], callback)
    }
}
module.exports = CompanyModel;