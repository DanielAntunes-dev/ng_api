import { Accounts } from './../entities/Accounts'
import { AppDataSource } from '../data-source'

export const accountRepository = AppDataSource.getRepository(Accounts)