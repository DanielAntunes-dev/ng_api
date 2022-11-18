import { authMiddleware } from './middleware/authMiddleware'
import { Router } from 'express'
import { AccountsController } from './controllers/transactionsController'
import { LoginController } from './controllers/LoginController'
import { UserController } from './controllers/UserController'

const routes = Router()

// criar usuario e conta
routes.post('/create', new UserController().createUser)

// logar no sistema
routes.post('/', LoginController.login)

// saldo(balance) em conta
routes.get('/balance', authMiddleware, new UserController().getBalance)

// middleware de autenticação e transferencias cashOut e cashIn
routes.post('/transfer', authMiddleware, new AccountsController().AccountTransfer)

// middleware de autenticação e todas as tranferêcias(cashOunt e cashIn) registradas no banco de dados
// filtrar por tipo http://localhost:3000/transfer?type=CashOut ou http://localhost:3000/transfer?type=CashIn
// filtrar por data http://localhost:3000/transfer?date=(data das transações que deseja no formato aaaa/mm/dd)
// filtrar por tipo e data http://localhost:3000/transfer?type=CashOut&date=aaaa-mm-dd ou http://localhost:3000/transfer?type=CashIn&date=aaaa-mm-dd
routes.get('/transfer', authMiddleware, new AccountsController().transfers)


export default routes
