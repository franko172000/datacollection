import {MigrationInterface, QueryRunner} from "typeorm";

export class sqliteMigrations1622542824258 implements MigrationInterface {
    name = 'sqliteMigrations1622542824258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users_profile` (`user_id` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `telephone` varchar(255) NULL, `company_name` varchar(255) NULL, `industry` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `REL_3b54c423c063e833e0c1d88a1b` (`user_id`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `is_activated` tinyint NOT NULL DEFAULT '0', `account_status` enum ('suspended', 'pending', 'deactivated', 'active', 'deleted') NOT NULL DEFAULT 'pending', `last_logged_in` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `form_elements` (`id` int NOT NULL AUTO_INCREMENT, `form_id` int NOT NULL, `label` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `type` enum ('text', 'number', 'email', 'tel', 'select', 'checkbox', 'radio', 'password', 'datetime', 'date', 'time') NOT NULL, `is_required` tinyint NOT NULL, `place_holder` varchar(255) NOT NULL, `validation_message` varchar(255) NOT NULL DEFAULT 'Field is required', `option_values` longtext NOT NULL, `other_properties` json NOT NULL, `page_no` int NOT NULL, `sort_no` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `forms` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` text NOT NULL, `page_count` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `form_data` (`id` int NOT NULL AUTO_INCREMENT, `element_id` int NOT NULL, `form_id` int NOT NULL, `agent_id` varchar(255) NOT NULL, `input_value` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_otp` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_blacklisted_token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(350) NOT NULL, `expire_at` datetime NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users_profile` ADD CONSTRAINT `FK_3b54c423c063e833e0c1d88a1ba` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `form_elements` ADD CONSTRAINT `FK_2d867daebf9b4b7b0c2d36d79a5` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `forms` ADD CONSTRAINT `FK_33572ad4e6763159442d599a7cc` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `form_data` ADD CONSTRAINT `FK_e9585b6ac67964494ae4313a36e` FOREIGN KEY (`element_id`) REFERENCES `form_elements`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `form_data` ADD CONSTRAINT `FK_af6ff08e08b422ec96876776c57` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `form_data` DROP FOREIGN KEY `FK_af6ff08e08b422ec96876776c57`");
        await queryRunner.query("ALTER TABLE `form_data` DROP FOREIGN KEY `FK_e9585b6ac67964494ae4313a36e`");
        await queryRunner.query("ALTER TABLE `forms` DROP FOREIGN KEY `FK_33572ad4e6763159442d599a7cc`");
        await queryRunner.query("ALTER TABLE `form_elements` DROP FOREIGN KEY `FK_2d867daebf9b4b7b0c2d36d79a5`");
        await queryRunner.query("ALTER TABLE `users_profile` DROP FOREIGN KEY `FK_3b54c423c063e833e0c1d88a1ba`");
        await queryRunner.query("DROP TABLE `users_blacklisted_token`");
        await queryRunner.query("DROP TABLE `user_otp`");
        await queryRunner.query("DROP TABLE `form_data`");
        await queryRunner.query("DROP TABLE `forms`");
        await queryRunner.query("DROP TABLE `form_elements`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `REL_3b54c423c063e833e0c1d88a1b` ON `users_profile`");
        await queryRunner.query("DROP TABLE `users_profile`");
    }

}
