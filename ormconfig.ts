import config from './src/config';

export default [
    {
        type: "mysql",
        host: config.db.host,
        port: parseInt(config.db.port),
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        synchronize: true,
        logging: false,
        entities: [
            "src/**/*.entity.ts"
        ],
        migrations: [
            "src/migrations/**/*.ts"
        ],
        cli: {
            migrationsDir: "src/migrations"
        },
    }
]