const joi = require('joi');

const postgresService = require('../postgres-service');
const {createNewOrderQuery} = require('../queries');

const orderController = () => ({
    config: {
        validate: {
            params: {
                pizzaId: joi.number().integer().required()
            }
        }
    },
    handler: async (request, reply) => {
        try {
            const pool = await postgresService.getDatabasePool();

            await pool.query(createNewOrderQuery, [request.params.pizzaId]);

            reply().code(200);
        } catch (error) {
            reply().code(500);
        }
    },
    method: 'POST',
    path: '/pizzas/{pizzaId}/orders'
});

module.exports = orderController;
