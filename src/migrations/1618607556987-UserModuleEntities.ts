import {MigrationInterface, QueryRunner} from "typeorm";

export class UserModuleEntities1618607556987 implements MigrationInterface {
    name = 'UserModuleEntities1618607556987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_otp` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_blacklisted_token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(350) NOT NULL, `expire_at` datetime NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `is_activated` tinyint NOT NULL DEFAULT '0', `account_status` enum ('suspended', 'pending', 'deactivated', 'active', 'deleted') NOT NULL DEFAULT 'pending', `last_logged_in` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_profile` (`user_id` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `telephone` varchar(255) NULL, `company_name` varchar(255) NULL, `industry` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `REL_3b54c423c063e833e0c1d88a1b` (`user_id`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users_profile` ADD CONSTRAINT `FK_3b54c423c063e833e0c1d88a1ba` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_profile` DROP FOREIGN KEY `FK_3b54c423c063e833e0c1d88a1ba`");
        await queryRunner.query("DROP INDEX `REL_3b54c423c063e833e0c1d88a1b` ON `users_profile`");
        await queryRunner.query("DROP TABLE `users_profile`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `users_blacklisted_token`");
        await queryRunner.query("DROP TABLE `user_otp`");
    }

}
