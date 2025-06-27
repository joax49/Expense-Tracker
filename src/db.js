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
    date DATE DEFAULT CURRENT_DATE()
    )`);

//A table for storing each item inside an expense
await pool.execute(`CREATE TABLE IF NOT EXISTS expense_items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_expense_id INT,
    item_name CHAR(30),
    item_type CHAR(30),
    item_price MEDIUMINT,
    amount SMALLINT,
    FOREIGN KEY(parent_expense_id) REFERENCES expenses(id)
    )`);

//AUTHENTICATION QUERIES

//A function for inserting the user inside the database
export async function registerUser(newUser, newPassword) {
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [newUser, newPassword])
}

export async function getPassword(user) {
    const password = await pool.query(`SELECT password FROM users WHERE username = ?`, user)
    return password
}

//EXPENSES QUERIES

//A function for adding expenses
export async function addExpense(expense, expenseItems) {
    let full_cost = 0;
    const lastExpenseId = pool.query('SELECT max(id) FROM expenses')

    for (item of expenseItems) {
        full_cost += item.price
        await pool.query(`INSERT INTO expense_items (parent_expense_id, item_name, item_type, item_price, item_amount)
            VALUES (?, ?, ?, ?, ?)`, [lastExpenseId+1, item.name, item.type, item.price, item.amount])
    }

    full_cost = full_cost - (full_cost * expense.discount / 100)

    await pool.query('INSERT INTO expenses (expense_type, discount, full_cost)',
        [expense.type, expense.discount, full_cost])
}

//A function that returns all the expenses
export async function getAllExpenses() {
    const allExpenses = await pool.query('SELECT * FROM expenses')
    const allExpensesDetails = await pool.query('SELECT * FROM expense_items')
    return allExpenses, allExpensesDetails
}

//A function that returns all the expenses between two dates
export async function getExpensesByDate(fromDate, toDate) {
    const expenses = await pool.query(`SELECT * FROM expenses
        WHERE (date > ?) AND (date < toDate)`, [fromDate, toDate])
    for (expense of expenses) {
        listOfIds = expense.id
    }
    const expensesDetails = await pool.query(`SELECT * FROM expense_items
        WHERE id = ?`, [listOfIds])
    return expenses
}

//A function that returns the expenses in certain price range
export async function getExpensesByPrice(floorPrice, roofPrice) {
    
}

//A function that returns the expenses by type
export async function getExpensesByType(...type) {
    
}