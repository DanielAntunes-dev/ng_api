import { Accounts } from './Accounts'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('transactions')
export class Transactions {

  @PrimaryGeneratedColumn()
      id: number

  @Column()
      value: number

  @CreateDateColumn()
      createdAt: Date

  @ManyToOne(() => Accounts, (accounts) => accounts.debitedAccountId, {cascade: true})
  @JoinColumn({ name: 'debitedAccountId' })
      debitedAccountId: Accounts

  @ManyToOne(() => Accounts, (accounts) => accounts.creditedAccountId, {cascade: true})
  @JoinColumn({ name: 'creditedAccountId' })
      creditedAccountId: Accounts
}
