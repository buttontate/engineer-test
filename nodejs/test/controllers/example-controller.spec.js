const sinon = require('sinon');
const {expect} = require('chai');
const Chance = require('chance');
const boom = require('boom');

const exampleController = require('../../src/controllers/example-controller');
const postgresService = require('../../src/postgres-service');
const {getCurrentTimestampQuery} = require('../../src/queries');

describe('example controller', () => {
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

    it('should define a route for POST /pizzas/{pizzaId}/order/', () => {
        const exampleRoute = exampleController();

        expect(exampleRoute.method).to.equal('GET');
        expect(exampleRoute.path).to.equal('/time');
    });

    it('should reply with the timestamp', async () => {
        const exampleRoute = exampleController();
        const expectedTime = chance.timestamp();
        const expectedQueryResult = {
            rows: [expectedTime]
        };

        expectedDatabasePool.query.resolves(expectedQueryResult);

        await exampleRoute.handler(undefined, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);

        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, getCurrentTimestampQuery);

        sinon.assert.calledOnce(replyStub);
        sinon.assert.calledWith(replyStub, expectedTime);

        sinon.assert.calledOnce(codeStub);
        sinon.assert.calledWith(codeStub, 200);
    });

    it('should return an internal server error if getting the pizzas fails', async () => {
        const orderRoute = exampleController();

        expectedDatabasePool.query.rejects();

        await orderRoute.handler(undefined, replyStub);

        sinon.assert.calledOnce(postgresService.getDatabasePool);
        sinon.assert.calledOnce(expectedDatabasePool.query);
        sinon.assert.calledWith(expectedDatabasePool.query, getCurrentTimestampQuery);

        sinon.assert.calledOnce(replyStub);

        const expectedError = boom.internal();
        const actualError = replyStub.firstCall.args[0];

        expect(actualError.toString()).to.deep.equal(expectedError.toString());
    });
});
