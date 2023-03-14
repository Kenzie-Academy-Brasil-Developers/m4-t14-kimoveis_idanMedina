import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1678770498592 implements MigrationInterface {
    name = 'InitialMigration1678770498592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" TIME NOT NULL`);
    }

}
