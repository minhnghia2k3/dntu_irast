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
    CREATE TABLE IF NOT EXISTS Company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        logo TEXT NOT NULL,
        video TEXT NOT NULL,
        tag TEXT,
        websiteUrl TEXT,
        phone TEXT,
        priority INTEGER DEFAULT 9999,
        isDeleted BOOLEAN DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Product (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        image TEXT NOT NULL,
        markdown TEXT,
        createdAt DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
        company INTEGER NOT NULL,
        FOREIGN KEY (product_id) REFERENCES Company
    )
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS CompanyProduct (
    company_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY (company_id, product_id),
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
  )`);

})
// db.close();


export default db;
