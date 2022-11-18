/* eslint-disable linebreak-style */
import { userRepository } from '../repositories/userRepository'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export class LoginController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body

        const user = await userRepository.findOneBy({ username })

        if (!user) {
            return res.status(400).json({ message: 'Username ou senha invalidos' })
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if (!verifyPass) {
            return res.status(400).json({ message: 'username ou senha invalidos!' })
        }

        const token = jwt.sign({
            id: user.id
        },
        process.env.JWT_PASS ?? '',
        { expiresIn: '24h' })

        
        const { password: _, ...userLogin } = user

        return res.json({
            user: userLogin,
            token: token
        })
    }

}
