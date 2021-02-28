import {MigrationInterface, QueryRunner} from "typeorm";

export class userTable1613782321724 implements MigrationInterface {
    name = 'userTable1613782321724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `is_activated` tinyint NULL, `account_status` enum ('suspended', 'pending', 'deactivated', 'active', 'deleted') NOT NULL DEFAULT 'pending', `last_logged_in` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_profile` (`user_id` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `telephone` varchar(255) NULL, `company_name` varchar(255) NULL, `industry` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `REL_3b54c423c063e833e0c1d88a1b` (`user_id`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users_profile` ADD CONSTRAINT `FK_3b54c423c063e833e0c1d88a1ba` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_profile` DROP FOREIGN KEY `FK_3b54c423c063e833e0c1d88a1ba`");
        await queryRunner.query("DROP INDEX `REL_3b54c423c063e833e0c1d88a1b` ON `users_profile`");
        await queryRunner.query("DROP TABLE `users_profile`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
