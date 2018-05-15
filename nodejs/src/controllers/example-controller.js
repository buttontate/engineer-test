const boom = require('boom');

const postgresService = require('../postgres-service');
const {getCurrentTimestampQuery} = require('../queries');

const exampleController = () => ({
    handler: async (request, reply) => {
        try {
            const pool = await postgresService.getDatabasePool();

            const result = await pool.query(getCurrentTimestampQuery);

            reply(result.rows[0]).code(200);
        } catch (error) {
            reply(boom.internal());
        }
    },
    method: 'GET',
    path: '/time'
});

module.exports = exampleController;
