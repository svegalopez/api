import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const config: MysqlConnectionOptions = {
    type: "mysql",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    timezone: 'Z',
    entities: ['dist/data/entities/*.js'],
    migrations: ['dist/data/migrations/*.js'],
    cli: {
        migrationsDir: 'src/data/migrations'
    },
    extra : { connectionLimit: 10 }
}