import express from 'express'
import {registerUser, loginUser} from '../controllers/authControllers.js'

const authRouter = express.Router()
authRouter.use(express.json())

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

export default authRouter