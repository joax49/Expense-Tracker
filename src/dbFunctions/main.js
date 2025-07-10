import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '5000',
    user: 'root',
    password: 'tuki',
    database: "expense_tracker_db"
}).promise()

//CREATING THE TABLES

//A table for storing the users
await pool.execute(`CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username CHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL
    )`);

//A table for storing all the expenses
await pool.execute(`CREATE TABLE IF NOT EXISTS expenses(
    id INT PRIMARY KEY AUTO_INCREMENT,
    expense_type CHAR(30) NOT NULL,
    discount TINYINT NOT NULL,
    full_cost MEDIUMINT NOT NULL,
    date DATE DEFAULT (CURRENT_DATE())
    )`);

//A table for storing each item inside an expense
await pool.execute(`CREATE TABLE IF NOT EXISTS expense_items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_expense_id INT NOT NULL,
    item_name CHAR(30) NOT NULL,
    item_type CHAR(30) NOT NULL,
    item_price MEDIUMINT NOT NULL,
    amount SMALLINT NOT NULL,
    FOREIGN KEY(parent_expense_id) REFERENCES expenses(id)
    )`);