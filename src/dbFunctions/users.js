import { pool } from "./main.js";

//AUTHENTICATION QUERIES

//A function for inserting the user inside the database
export async function registerUser(newUser, newPassword) {
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [newUser, newPassword])
}

export async function getPassword(user) {
    const password = await pool.query(`SELECT password FROM users WHERE username = ?`, user)
    return password
}