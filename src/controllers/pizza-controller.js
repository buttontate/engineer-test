const postgresService = require('../postgres-service');

const pizzaController = () => ({
    handler: async (request, reply) => {
        try {
            const databasePool = await postgresService.getDatabasePool();
            const pizzas = await databasePool.query('select * from pizza');

            reply(pizzas.rows).code(200);
        } catch (error) {
            reply().code(500);
        }
    },
    method: 'GET',
    path: '/pizzas'
});

module.exports = pizzaController;
