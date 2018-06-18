// Update with your config settings.
module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './db/dev.sqlite3'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: './db/test.sqlite3'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/test'
        }
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
