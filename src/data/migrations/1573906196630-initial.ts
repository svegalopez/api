import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1573906196630 implements MigrationInterface {
    name = 'initial1573906196630'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `stories` (`id` int NOT NULL AUTO_INCREMENT, `launch_date` date NOT NULL, `title` varchar(1024) NOT NULL, `privacy` varchar(32) NOT NULL, `likes` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `stories`", undefined);
    }
}
