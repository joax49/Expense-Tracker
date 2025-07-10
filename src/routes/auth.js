import express from 'express'
import bcrypt from 'bcrypt'
import { registerUser, getPassword } from '../dbFunctions/users.js'

const authRouter = express.Router()
authRouter.use(express.json())

authRouter.post('/register', async (req, res) => {
    try {
        const {name, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        await registerUser(name, hashedPassword)
        res.status(201).send("User successfully registered")
    } catch(err) {
        console.log(err)
    }
})

authRouter.post('/login', async (req, res) => {
    const {name, password} = req.body

    //In case the user is not valid, we return an error
    if (!name) {return res.status(404).send("Please provide a valid user")}

    const hashedPassword = getPassword(name)
    const isMatch = bcrypt.compare(password, hashedPassword)


})

export default authRouter