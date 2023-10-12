import sqlite3 from "sqlite3";
sqlite3.verbose();
// Init DB
const db = new sqlite3.Database('./db/Company.db', err =>
  err
    ?
    console.error(err.message)
    : console.log('Connected to the companies database.'));

// Create table
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS companies (
        company_id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        description TEXT,
        websiteURL TEXT,
        address TEXT,
        phone TEXT,
        isDeleted BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS images (
        image_id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_src TEXT,
        image_description TEXT,
        company_id INTEGER NOT NULL,
        FOREIGN KEY (company_id) REFERENCES companies (company_id)
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    video_id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_src TEXT,
    video_description TEXT,
    company_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies (company_id)
)
  `)
})
// db.close();


export default db;