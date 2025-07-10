import { pool } from "./main.js";

//POST

//A function for adding expenses
export async function addExpense(expense, expenseItems) {
    let full_cost = 0;
    let lastExpenseId = await pool.query('SELECT id FROM expenses ORDER BY id DESC LIMIT 1;')


    //Iterates for every expense item, adds its cost to the full cost and inserts it into the DB
    for (let n = 0; n < expenseItems.length; n++) {
        full_cost = expenseItems[n].price * expenseItems[n].amount;
        await pool.query(`INSERT INTO expense_items (parent_expense_id, item_name, item_type, item_price, amount)
            VALUES ((SELECT id + 1 FROM expenses ORDER BY id DESC LIMIT 1), ?, ?, ?, ?)`, [ expenseItems[n].name,
            expenseItems[n].type, expenseItems[n].price, expenseItems[n].amount])
    }

    //Calculates the discount for the full cost
    full_cost = full_cost - (full_cost * expense.discount / 100)

    //Inserts the expense into the DB
    await pool.query('INSERT INTO expenses (expense_type, discount, full_cost)',
        [expense.type, expense.discount, full_cost])
}

//GET

//A function that returns all the expenses
export async function getAllExpenses() {
    const expenses = await pool.query('SELECT * FROM expenses')
    const expenseItems = await pool.query('SELECT * FROM expense_items')

    return expenses, expenseItems
}

//A function that returns all the expenses between two dates
export async function getExpensesByDate(fromDate, toDate) {

    let expenseItems = []
    
    //A query that selects all the rows from a table between two dates
    const expenses = await pool.query(`SELECT * FROM expenses
        WHERE (date > ?) AND (date < toDate)`, [fromDate, toDate])

    for (expense of expenses) {
        expenseItems += await pool.query(`
            SELECT * FROM expense_items
            WHERE parent_expense_id = ?`, [expense.id])
    }

    return expenses, expenseItems
}

//A function that returns the expenses in certain price range
export async function getExpensesByPrice(floorPrice, roofPrice) {

    let expenseItems = []

    const expenses = await pool.query(`
        SELECT * FROM expenses
        WHERE full_cost > ? AND full_cost < ?`, [floorPrice, roofPrice])

    for (const expense of expenses) {
        expenseItems += await pool.query(`SELECT * FROM expense_items WHERE parent_expense_id = ?`, [expense.id])
    }

    return expenses, expenseItems
}

//A function that returns the expenses by type
export async function getExpensesByType(...types) {
    
    let expenses = []
    let expenseItems = []

    for (const type of types) {
        expenses += pool.query(`SELECT * FROM expenses WHERE expense_type = ?`, [type])
    }

    for (const expense of expenses) {
        expenseItems += pool.query(`SELECT * FROM expense_items WHERE parent_expense_id = ?`, [expense.id])
    }

    return expenses, expenseItems
}

// A function that returns one of each item names from the table
export async function distinctItemNames() {
    const expenseItemNames = pool.query(`SELECT DISTINCT item_name FROM expense_items`)

    return expenseItemNames
}

// A function that returns one of each item types from the table
export async function distinctItemTypes() {
    const expenseItemTypes = pool.query(`SELECT DISTINCT item_type FROM expense_items`)

    return expenseItemTypes
}

// A function that returns one of each expense types from the table
export async function distinctExpenseTypes() {
    const expenseTypes = pool.query(`SELECT DISTINCT expense_type FROM expenses`)

    return expenseTypes
}