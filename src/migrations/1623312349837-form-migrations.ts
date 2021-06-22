import {MigrationInterface, QueryRunner} from "typeorm";

export class formMigrations1623312349837 implements MigrationInterface {
    name = 'formMigrations1623312349837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `form_elements` (`id` int NOT NULL AUTO_INCREMENT, `form_id` int NOT NULL, `label` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `type` enum ('text', 'number', 'email', 'tel', 'select', 'checkbox', 'radio', 'password', 'datetime', 'date', 'time') NOT NULL, `is_required` tinyint NOT NULL, `place_holder` varchar(255) NOT NULL, `validation_message` varchar(255) NOT NULL DEFAULT 'Field is required', `option_values` longtext NOT NULL, `other_properties` json NOT NULL, `page_no` int NOT NULL, `sort_no` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `forms` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` text NOT NULL, `page_count` int NOT NULL DEFAULT '1', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `form_data` (`id` int NOT NULL AUTO_INCREMENT, `element_id` int NOT NULL, `form_id` int NOT NULL, `agent_id` varchar(255) NOT NULL, `input_value` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
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
        await queryRunner.query("DROP TABLE `form_data`");
        await queryRunner.query("DROP TABLE `forms`");
        await queryRunner.query("DROP TABLE `form_elements`");
    }

}
