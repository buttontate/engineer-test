const fs = require('fs');
const path = require('path');

const {Server} = require('hapi');
const sinon = require('sinon');
const {expect} = require('chai');
const Chance = require('chance');

const orderController = require('../../src/controllers/order-controller');
const postgresService = require('../../src/postgres-service');
const {createNewOrderQuery} = require('../../src/queries');

describe('order controller', () => {
    let sandbox,
        codeStub,
        replyStub,
        expectedDatabasePool,
        expectedRequest,
        expectedPizzaId;

    const chance = new Chance();

    const createOfflineServerInstance = () => {
        const server = new Server();

        server.connection({
            host: '0.0.0.0',
            port: 5555
        });

        const controllersDirectoryNormalized = path.join(__dirname, '..', '..', 'src', 'controllers') + path.sep;

        fs.readdirSync(controllersDirectoryNormalized).forEach((file) => { // eslint-disable-line no-sync
            const controllerModule = require(controllersDirectoryNormalized + file)(); // eslint-disable-line import/no-dynamic-require

            server.route(controllerModule);
        });

        return server;
    };

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedPizzaId = chance.natural();
        expectedRequest = {
            params: {
                pizzaId: expectedPizzaId
            }
        };

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

    it('should define a route for POST /pizzas/{pizzaId}/order/', () => {
        const pizzaRoute = orderController();

        expect(pizzaRoute.method).to.equal('POST');
        expect(pizzaRoute.path).to.equal('/pizzas/{pizzaId}/orders');
    });

    it('should reply with a 200 if the order was successful', async () => {
        const orderRoute = orderController();

        expectedDatabasePool.query.resolves();

        await orderRoute.handler(expectedRequest, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);

        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, createNewOrderQuery, [expectedPizzaId]);

        sinon.assert.calledOnce(replyStub);

        sinon.assert.calledOnce(codeStub);
        sinon.assert.calledWith(codeStub, 200);
    });

    it('should return an internal server error if getting the pizzas fails', async () => {
        const orderRoute = orderController();

        expectedDatabasePool.query.rejects();

        await orderRoute.handler(expectedRequest, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);
        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, createNewOrderQuery, [expectedPizzaId]);

        sinon.assert.calledOnce(replyStub);

        sinon.assert.calledOnce(codeStub);
        sinon.assert.calledWith(codeStub, 500);
    });

    describe('validation', () => {
        let fakeServer;

        const createExpectedRequest = () => ({
            method: 'POST',
            url: `/pizzas/${expectedPizzaId}/orders`
        });

        beforeEach(() => {
            fakeServer = createOfflineServerInstance();
        });

        it('should respond with a 200 if the request param is valid', async () => {
            expectedRequest = createExpectedRequest();

            expectedDatabasePool.query.resolves();

            const response = await fakeServer.inject(expectedRequest);

            expect(response.statusCode).to.equal(200);
        });

        it('should respond with a 404 if the pizzaId is not provided in the path', async () => {
            expectedRequest = createExpectedRequest();

            expectedRequest.url = '/pizzas/orders';

            const response = await fakeServer.inject(expectedRequest);

            expect(response.statusCode).to.equal(404);
        });

        it('should respond with a 400 if the pizzaId is not a number', async () => {
            expectedRequest = createExpectedRequest();

            expectedRequest.url = `/pizzas/${chance.word()}/orders`;

            const response = await fakeServer.inject(expectedRequest);

            expect(response.statusCode).to.equal(400);
        });
    });
});
