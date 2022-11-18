import { NextFunction, Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'


type JwtPayload = {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).json({message: 'O Usuário não está logado!'})
    }

    const token = authorization


    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findOneOrFail({where: {id}, relations: {account: true} } )

    if(!user) {
        return res.status(401).json({message: 'Não Autorizado'})
    }

    const { password:_, ...loggedUser } = user

    req.user = loggedUser

    next()
}
