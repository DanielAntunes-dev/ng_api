import { Transactions } from './../entities/Transactions';
import { AppDataSource } from '../data-source'

export const transactionsRepository = AppDataSource.getRepository(Transactions)
