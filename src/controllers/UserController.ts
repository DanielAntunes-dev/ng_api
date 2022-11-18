
import { CustomRequest } from './../middleware/authMiddleware'
import { Accounts } from './../entities/Accounts'
import { userRepository } from '../repositories/userRepository'
import { Request, Response } from 'express'
import { User } from '../entities/User'
import { validate } from 'class-validator'
import bcrypt from 'bcryptjs'
import { accountRepository } from '../repositories/accountRepository'


export class UserController {
    async createUser(req: Request, res: Response) {
        const { username, password } = req.body

        const userNameExists = await userRepository.findOneBy({ username })

        if(userNameExists){
            return res.status(400).json({message: 'Username já cadastrado'})
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const account = new Accounts()
        account.balance = 100
        const newUser = userRepository.create({
            username,
            password: hashPassword,
            account

        })

        await userRepository.save(newUser)

        const {password: _, ...user} = newUser

        return res.status(201).send(user)
}

    async getBalance(req: any, res: Response) {
        req.user.id
        const balance = await accountRepository.findOneOrFail({where: {user: req.user.id}})

        console.log(req.user)
        return res.status(400).json(balance)

    }
}
