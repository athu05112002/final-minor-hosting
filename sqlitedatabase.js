const sqlite3 = require('sqlite3').verbose();

// create a new database
let db = new sqlite3.Database('minorproject.sqlite');

// create a table named "worker" with an array column
db.run(`CREATE TABLE worker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    contact TEXT,
    taskarray TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS supervisor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    contact TEXT,
    workerarray TEXT
)`);

db.close();
