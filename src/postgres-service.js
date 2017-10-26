const {Pool} = require('pg');

let pool;

const getDatabasePool = () => new Promise((resolve) => {
    if (pool) {
        resolve(pool);
    } else {
        const interval = setInterval(async () => {
            try {
                pool = new Pool({
                    database: 'postgres',
                    host: 'db',
                    password: 'password',
                    port: 5432,
                    user: 'postgres'
                });

                await pool.query('select * from information_schema.tables');

                clearInterval(interval);

                resolve(pool);
            } catch (error) {
                console.error('Failed connecting to database.  Will retry in one second...');
            }
        }, 1000);
    }
});

module.exports = {
    getDatabasePool
};
