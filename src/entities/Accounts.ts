import { Transactions } from './Transactions'
import { User } from './User'
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export class Accounts{

  @PrimaryGeneratedColumn()
      id: number

  @Column({ default: 100, type: 'decimal' })
      balance: number

  @OneToOne(() => User, (users) => users.account)
      user: User

  @OneToMany(() => Transactions, (transactions) => transactions.debitedAccountId)
      debitedAccountId: Transactions

  @OneToMany(() => Transactions, (transactions) => transactions.creditedAccountId)
      creditedAccountId: Transactions
}