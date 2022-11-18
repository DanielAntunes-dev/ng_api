import { NextFunction, Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'

export interface CustomRequest extends Request{
    user: any
}

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization){
        return res.status(403).json({message: 'O Usuário não está logado!'})
    }

    const token = authorization

    let jwtPayload

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_PASS ?? '')
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        res.status(401).send
    }
    // console.log(jwtPayload)

    if (!jwtPayload) {
        return res.status(403).json({message: 'Não Autorizado'})
    }

    const user = await userRepository.findOneOrFail({where:{id: jwtPayload.id}, relations: {account: true}})

    if(!user) {
        return res.status(403).json({message: 'Não Autorizado'})
    }

    const { password:_, ...loggedUser } = user

    req.user = loggedUser




    next()
}
