import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1668565330110 implements MigrationInterface {
    name = 'default1668565330110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"')
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "createdAt"')
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updatedAt"')
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "REL_901d7b69d79023d486811b744f"')
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "accountId"')
        await queryRunner.query('ALTER TABLE "users" ADD "account" integer')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_dd44b05034165835d6dcc18d684" UNIQUE ("account")')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_dd44b05034165835d6dcc18d684" FOREIGN KEY ("account") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_dd44b05034165835d6dcc18d684"')
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_dd44b05034165835d6dcc18d684"')
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "account"')
        await queryRunner.query('ALTER TABLE "users" ADD "accountId" integer')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "REL_901d7b69d79023d486811b744f" UNIQUE ("accountId")')
        await queryRunner.query('ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()')
        await queryRunner.query('ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

}
