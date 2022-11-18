import * as bcrypt from 'bcryptjs'
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Length } from 'class-validator'

import { Accounts } from './Accounts'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
      id: number

  @Column()
  @Length(3, 20)
      username: string

  @Column()
  @Length(8, 20)
      password: string

  @OneToOne(() => Accounts, (accounts) => accounts.user, {cascade: true} )
  @JoinColumn({ name: 'account' })
      account: Accounts



  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;


  hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8)
  }

  checkPasswordIsValid(unencripytedPassword: string) {
      return bcrypt.compareSync(unencripytedPassword, this.password)
  }

}

