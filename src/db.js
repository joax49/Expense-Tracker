import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '5000',
    user: 'root',
    password: 'tuki',
    database: "expense_tracker_db"
}).promise()

//CREATING THE USERS

//A table for storing the users
await pool.execute(`CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username CHAR(30),
    password VARCHAR(200)
    )`);

//A table for storing all the expenses
await pool.execute(`CREATE TABLE IF NOT EXISTS expenses(
    id INT PRIMARY KEY AUTO_INCREMENT,
    expense_type CHAR(30),
    discount TINYINT,
    full_cost MEDIUMINT,
    date DATE
    )`);

//A table for storing each item inside an expense
await pool.execute(`CREATE TABLE IF NOT EXISTS expenses_details(
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name CHAR(30),
    item_type CHAR(30),
    cost MEDIUMINT,
    amount SMALLINT)
    `);

//AUTHENTICATION QUERIES

//A function for inserting the user inside the database
export async function registerUser(newUser, newPassword) {
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [newUser, newPassword])
}

export async function getPassword(user) {
    const password = await pool.query(`SELECT password FROM users WHERE username = ?`, user)
    return password
}