const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/companies.db')

const VideosModel = {
    getAllVideos: (callback) => {
        const query = `SELECT * FROM videos`;
        db.all(query, [], callback)
    }
}
module.exports = VideosModel;