"use strict"

import express from 'express'

const app = express()
const PORT = 5000

app.listen(PORT, console.log("App is listening on port " + PORT))