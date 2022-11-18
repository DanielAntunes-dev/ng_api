import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1668552191792 implements MigrationInterface {
    name = 'default1668552191792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "acountId" integer, CONSTRAINT "REL_901d7b69d79023d486811b744f" UNIQUE ("acountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountId" integer, "creditedAccountId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_901d7b69d79023d486811b744f1" FOREIGN KEY ("acountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_90970e74d61cc1e18df1564e3be" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_90970e74d61cc1e18df1564e3be"')
        await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8"')
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_901d7b69d79023d486811b744f1"')
        await queryRunner.query('DROP TABLE "transactions"')
        await queryRunner.query('DROP TABLE "accounts"')
        await queryRunner.query('DROP TABLE "users"')
    }

}
