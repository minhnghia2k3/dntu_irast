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
        gmail TEXT NOT NULL,
        logo TEXT NOT NULL,
        video_banner TEXT NOT NULL,
        description TEXT,
        websiteURL TEXT,
        phone TEXT,
        address TEXT,
        company_index INTEGER DEFAULT 9999,
        isDeleted BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        banner_img TEXT,
        title TEXT,
        description TEXT,
        other_products TEXT,
        company_id INTEGER NOT NULL,
        FOREIGN KEY (company_id) REFERENCES companies (company_id)
    )
  `);
})
// db.close();


export default db;