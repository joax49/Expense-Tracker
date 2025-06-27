import express from 'express'
import { getAllExpenses, getExpensesByDate } from '../db.js'

const expensesRouter = express.Router()

expensesRouter.post('newExpense', (req, res) => {
    const { expense, expenseItems } = req.body

})

expensesRouter.get('/allExpenses', (req, res) => {
    const listOfExpenses = getAllExpenses()
    res.status(201).send(listOfExpenses)
})

expensesRouter.get('/expensesByDate', (req, res) => {
    const listOfExpenses = getExpensesByDate()
})