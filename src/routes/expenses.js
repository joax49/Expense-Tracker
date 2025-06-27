import express from 'express'
import { getAllExpenses } from '../db.js'

const expensesRouter = express.Router()

expensesRouter.get('/allExpenses', (req, res) => {
    const listOfExpenses = getAllExpenses()
    res.status(201).send(listOfExpenses)
})

