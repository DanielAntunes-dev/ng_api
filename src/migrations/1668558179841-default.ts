import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1668558179841 implements MigrationInterface {
    name = 'default1668558179841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_901d7b69d79023d486811b744f1"')
        await queryRunner.query('ALTER TABLE "users" RENAME COLUMN "acountId" TO "accountId"')
        await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "balance"')
        await queryRunner.query('ALTER TABLE "accounts" ADD "balance" numeric NOT NULL DEFAULT \'100\'')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"')
        await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "balance"')
        await queryRunner.query('ALTER TABLE "accounts" ADD "balance" integer NOT NULL')
        await queryRunner.query('ALTER TABLE "users" RENAME COLUMN "accountId" TO "acountId"')
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_901d7b69d79023d486811b744f1" FOREIGN KEY ("acountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

}
