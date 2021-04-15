import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateprofile1616115675096 implements MigrationInterface {
  name = 'updateprofile1616115675096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` CHANGE `is_activated` `is_activated` tinyint NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `last_logged_in` `last_logged_in` datetime NULL');
    await queryRunner.query('ALTER TABLE `users_profile` CHANGE `telephone` `telephone` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `users_profile` CHANGE `company_name` `company_name` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `users_profile` CHANGE `industry` `industry` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `users_profile` CHANGE `industry` `industry` varchar(255) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `users_profile` CHANGE `company_name` `company_name` varchar(255) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `users_profile` CHANGE `telephone` `telephone` varchar(255) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `users` CHANGE `last_logged_in` `last_logged_in` datetime NULL DEFAULT 'NULL'",
    );
    await queryRunner.query("ALTER TABLE `users` CHANGE `is_activated` `is_activated` tinyint NULL DEFAULT 'NULL'");
  }
}
