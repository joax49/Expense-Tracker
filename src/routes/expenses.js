import express from 'express'
import {insertExpense, sendAllExpenses, sendExpensesByDate,
    sendExpensesByPrice, sendExpensesByType, sendDisplayOptions} 
    from '../controllers/expenseControllers.js'

export const expensesRouter = express.Router()
expensesRouter.use(express.json())

expensesRouter.post('/newExpense', insertExpense)

expensesRouter.get('/allExpenses', sendAllExpenses)

expensesRouter.post('/expensesByDate', sendExpensesByDate)

expensesRouter.post('/expensesByPrice', sendExpensesByPrice)

expensesRouter.post('/expensesByType', sendExpensesByType)

expensesRouter.get('/displayOptions', sendDisplayOptions)