"use strict"

//Modules
import express from 'express'
import authRouter from './routes/auth.js'

//Setting constants
const app = express()
const PORT = 5001

//Setiing the routers
app.use('/auth', authRouter)

app.listen(PORT, console.log("App is listening on port " + PORT))