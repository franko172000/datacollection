import {MigrationInterface, QueryRunner} from "typeorm";

export class blacklistedToken1618564374048 implements MigrationInterface {
    name = 'blacklistedToken1618564374048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users_blacklisted_token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(350) NOT NULL, `expire_at` datetime NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users_blacklisted_token`");
    }
}
