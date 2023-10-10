const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/companies.db')

const ImagesModel = {
    getAllImages: (callback) => {
        const query = `SELECT * FROM images`;
        db.all(query, [], callback)
    }
}
module.exports = ImagesModel;