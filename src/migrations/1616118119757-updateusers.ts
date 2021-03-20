import {MigrationInterface, QueryRunner} from "typeorm";

export class updateusers1616118119757 implements MigrationInterface {
    name = 'updateusers1616118119757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `last_logged_in` `last_logged_in` datetime NULL");
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `telephone` `telephone` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `company_name` `company_name` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `industry` `industry` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `industry` `industry` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `company_name` `company_name` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users_profile` CHANGE `telephone` `telephone` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `last_logged_in` `last_logged_in` datetime NULL DEFAULT 'NULL'");
    }

}
