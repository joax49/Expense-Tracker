import bcrypt from 'bcrypt'
import { insertUser, getPassword } from '../dbFunctions/users.js'

export async function registerUser(req, res) {
    try {
        const {name, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        await insertUser(name, hashedPassword)
        res.status(201).send("User successfully registered")
    } catch(err) {
        console.log(err)
    }
}

export async function loginUser(req, res) {
    const {name, password} = req.body

    //In case the user is not valid, we return an error
    if (!name) {return res.status(404).send("Please provide a valid user")}

    const hashedPassword = getPassword(name)
    const isMatch = bcrypt.compare(password, hashedPassword)

    res.status(200).send("correct credentials")
}