import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'tuki',
    database: "expense_tracker_db"
}).promise()

await pool.query(`CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO INCREMENT,
    email CHAR(50),
    username CHAR(30),
    password CHAR(30)
    )`);

await pool.query(`CREATE TABLE IF NOT EXISTS expenses(
    id INT PRIMARY KEY AUTO INCREMENT,
    expense_type CHAR(30),
    discount TINYINT,
    full_cost MEDIUMINT,
    date DATE
    )`);

await pool.query(`CREATE TABLE IF NOT EXISTS 
    id INT PRIMARY KEY AUTO INCREMENT,
    item_name CHAR(30),
    item_type CHAR(30),
    cost MEDIUMINT,
    amount SMALLINT
    `);