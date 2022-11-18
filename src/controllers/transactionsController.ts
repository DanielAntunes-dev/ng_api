import { userRepository } from './../repositories/userRepository';
import { accountRepository } from './../repositories/accountRepository';
import { transactionsRepository } from '../repositories/transactionsRepository';
import { Request, Response } from 'express'
import { Between } from 'typeorm';
import dayjs from 'dayjs';


export class AccountsController {

  // transferencia entre contas (CASHOUT E CASHIN)
    async AccountTransfer(req: Request, res: Response) {
      const { value, username } = req.body


      if(username === req.user.username ) {
        return res.status(400).json({message: 'você não pode transferir pra si mesmo'})
      }

      if(value < 1) {
        return res.status(400).json({message: 'valor tem que ser superior a 1'})
      }

      const checkUsername = await userRepository.findOne({where: { username: username }})
      if(!checkUsername) { return res.status(400).json({message: 'usuario não existe'})}


        const account = await accountRepository.findOneByOrFail({ id: req.user.account!.id })
        if (account.balance < value) {
          return res.status(400).json({message: 'Não possue fundo suficiente'})
        }

        await accountRepository.decrement({
          id: account.id
        },
        'balance', value)

        const userCashIn = await userRepository.findOneOrFail({ where:{username: username}, relations: {account: true}  })

        await accountRepository.increment({
          id: userCashIn.account.id
        },
        'balance', value)

        await transactionsRepository.save({
          debitedAccountId: {id: account.id},
          creditedAccountId: {id: userCashIn.account.id},
          value: value
        })

      res.status(200).end()
}


  async transfers(req: Request, res: Response) {
    const query = req.query as any

// select * from tranfers where debitedAccountId = 1 or creditedAccountId = 1
    const transfer = await transactionsRepository.find({where: [

      {
        createdAt: Between(dayjs(query.date).startOf('day').toDate(), dayjs(query.date).endOf('day').toDate()),
        debitedAccountId: {id: req.user.account!.id},
      },
      {
        createdAt: Between(dayjs(query.date).startOf('day').toDate(), dayjs(query.date).endOf('day').toDate()),
        creditedAccountId: {id: req.user.account!.id}
      }
    ], relations: {debitedAccountId: true}})

    // cashOut = debitedAccount - cashIn = creditedAccount
    // Só foi feita a relação pra saber se foi cashOut ou cashIn
    const mapTransfers = transfer.map((value) => {
      const { debitedAccountId, ...rest } = value
      return {...rest, type: debitedAccountId.id === req.user.account!.id ? 'CashOut' : 'CashIn'}
    })
    console.log(req.query.type)

    // filtro para saber o tipo de transação
    const mapFilters = mapTransfers.filter((value) => {
      if(!req.query.type){ return true }
      if(value.type === req.query.type) { return true }

      return false

    })
    res.status(200).json(mapFilters)
  }



}


