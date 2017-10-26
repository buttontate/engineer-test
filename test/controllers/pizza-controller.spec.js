const sinon = require('sinon');
const {expect} = require('chai');
const Chance = require('chance');

const pizzaController = require('../../src/controllers/pizza-controller');
const postgresService = require('../../src/postgres-service');

describe('pizza controller', () => {
    let sandbox,
        codeStub,
        replyStub,
        expectedDatabasePool;

    const chance = new Chance();

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedDatabasePool = {
            query: sinon.stub()
        };

        codeStub = sandbox.stub();
        replyStub = sandbox.stub().returns({
            code: codeStub
        });

        sandbox.stub(postgresService, 'getDatabasePool').resolves(expectedDatabasePool);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should define a route for GET /pizzas', () => {
        const pizzaRoute = pizzaController();

        expect(pizzaRoute.method).to.equal('GET');
        expect(pizzaRoute.path).to.equal('/pizzas');
    });

    it('should reply with a list of pizzas', async () => {
        const pizzaRoute = pizzaController();
        const expectedPizzas = {
            rows: chance.n(chance.word, chance.d6())
        };

        expectedDatabasePool.query.resolves(expectedPizzas);

        await pizzaRoute.handler(undefined, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);
        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, 'select * from pizza');

        sinon.assert.calledOnce(replyStub);
        sinon.assert.calledWith(replyStub, expectedPizzas.rows);

        sinon.assert.calledOnce(codeStub);
        sinon.assert.calledWith(codeStub, 200);
    });

    it('should return an internal server error if getting the pizzas fails', async () => {
        const pizzaRoute = pizzaController();

        expectedDatabasePool.query.rejects();

        await pizzaRoute.handler(undefined, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);
        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, 'select * from pizza');

        sinon.assert.calledOnce(replyStub);

        sinon.assert.calledOnce(codeStub);
        sinon.assert.calledWith(codeStub, 500);
    });
});
