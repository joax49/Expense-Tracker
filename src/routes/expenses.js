import express from 'express'
import { addExpense, getAllExpenses, getExpensesByDate, getExpensesByPrice, getExpensesByType,
    distinctExpenseTypes, distinctItemNames, distinctItemTypes } from '../dbFunctions/expenseQueries.js'

export const expensesRouter = express.Router()
expensesRouter.use(express.json())

expensesRouter.post('/newExpense', async (req, res) => {
    try {
        let {expenses, expenseItems} = req.body

        addExpense(expenses, expenseItems)

        res.status(201).send("Expense correctly added")
    } catch (err) {console.log(err)}
})

expensesRouter.get('/allExpenses', (req, res) => {
    const expenses = getAllExpenses()

    if (!expenses) return res.status(404).send("There is no items in the expenses")

    return expenses.then(result => res.status(201).send(result[0]))
})

expensesRouter.post('/expensesByDate', (req, res) => {
    const {fromDate, toDate} = req.body

    const {expenses, expenseItems} = getExpensesByDate(fromDate, toDate)
    console.log(expenses, expenseItems)
    res.status(201).send("hellow")
})