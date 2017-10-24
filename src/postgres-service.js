const {Pool} = require('pg');

let pool;

const getDatabasePool = async () => {
    if (pool) {
        return pool;
    }

    try {
        pool = new Pool({
            database: 'postgres',
            host: 'db',
            password: 'password',
            port: 5432,
            user: 'postgres'
        });

        await pool.query('select * from information_schema.tables');

    } catch (error) {
        throw new Error('Unable to connect to PostgreSQL database.  App will restart and try again');
    }
};

module.exports = {
    getDatabasePool
};
