import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProductsTable1606811000968 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }
}
