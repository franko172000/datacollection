import { MigrationInterface, QueryRunner } from 'typeorm';

export class agentMigration1625563604011 implements MigrationInterface {
  name = 'agentMigration1625563604011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `agents` (`id` varchar(36) NOT NULL, `user_id` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `photo` varchar(255) NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `is_activated` tinyint NOT NULL DEFAULT '0', `last_logged_in` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_5fdef501c63984b1b98abb1e68` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `form_data` ADD CONSTRAINT `FK_c00de11a16b644e9384139eb8bc` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `agents` ADD CONSTRAINT `FK_57ee94c84a8e570e362af59dcea` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `agents` DROP FOREIGN KEY `FK_57ee94c84a8e570e362af59dcea`');
    await queryRunner.query('ALTER TABLE `form_data` DROP FOREIGN KEY `FK_c00de11a16b644e9384139eb8bc`');
    await queryRunner.query('DROP INDEX `IDX_5fdef501c63984b1b98abb1e68` ON `agents`');
    await queryRunner.query('DROP TABLE `agents`');
  }
}
