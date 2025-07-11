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
    const {expenses, expenseItems} = getAllExpenses()

    if (!expenses) return res.status(404).send("There is no items in the expenses")

    res.status(200).send(expenses, expenseItems)
})

expensesRouter.post('/expensesByDate', (req, res) => {
    const {fromDate, toDate} = req.body

    const {expenses, expenseItems} = getExpensesByDate(fromDate, toDate)
    res.status(200).send(expenses, expenseItems)
})

expensesRouter.post('/expensesByPrice', (req, res) => {
    const {floorPrice, roofPrice} = req.body

    const {expenses, expenseItems} = getExpensesByPrice(floorPrice, roofPrice)
    res.status(200).send(expenses, expenseItems)
})

expensesRouter.post('/expensesByType', (req, res) => {
    const {types} = req.body

    const {expenses, expenseItems} = getExpensesByType(types)
    res.status(200).send(expenses. expenseItems)
})

expensesRouter.post('/displayOptions', (req, res) => {
    const itemNames = distinctItemNames()
    const itemTypes = distinctItemTypes()
    const expenseTypes = distinctExpenseTypes()

    res.status(200).send(itemNames, itemTypes, expenseTypes)
})