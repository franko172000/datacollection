import { MigrationInterface, QueryRunner } from 'typeorm';

export class otpmigration1618474884768 implements MigrationInterface {
  name = 'otpmigration1618474884768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user_otp` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user_otp`');
  }
}
