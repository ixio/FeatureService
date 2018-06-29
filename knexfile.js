// Update with your config settings.
module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'postgres',
            user: 'postgres',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        },
        useNullAsDefault: true
    },

    test: {
        client: 'postgresql',
        connection: {
            database: 'test',
            user: 'test',
            password: 'password',
            port: 5433
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/test'
        },
        useNullAsDefault: true
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user:         'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    }
};
