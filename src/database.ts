import sqlite from 'sqlite3';

const DBSOURCE = 'db.sqlite';

interface SmoothieRow {
    id: number;
    name: string;
    ingredients: string;
}

export function parseRow(row: SmoothieRow) {
    return { ...row, ingredients: JSON.parse(row.ingredients) };
}

export const db = new sqlite.Database(DBSOURCE, (err) => {
    console.log('Connecting to the SQLite database...');
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS smoothies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text UNIQUE,
        ingredients text
        )`);
});
