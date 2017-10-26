const Chance = require('chance');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const postgresService = require('../src/postgres-service');
const serverServices = require('../src/server-services');

describe('server', () => {
    const chance = new Chance();
    const importServer = () => proxyquire('../src/server', {});

    let sandbox,
        expectedServer;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedServer = {
            info: {
                uri: chance.string()
            },
            start: sandbox.stub()
        };

        sandbox.stub(console, 'error');
        sandbox.stub(console, 'log');
        sandbox.stub(process, 'exit');
        sandbox.stub(postgresService, 'getDatabasePool');
        sandbox.stub(serverServices, 'createServer').returns(expectedServer);
        sandbox.stub(serverServices, 'configureGracefulShutdown');
        sandbox.stub(serverServices, 'applyControllers');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create server', () => {
        importServer();

        sinon.assert.calledOnce(serverServices.createServer);
    });

    it('should get database pool', () => {
        importServer();

        sinon.assert.calledOnce(postgresService.getDatabasePool);
    });

    it('should configure a graceful shutdown', (done) => {
        serverServices.configureGracefulShutdown.resetHistory();

        serverServices.configureGracefulShutdown.callsFake(() => {
            sinon.assert.calledOnce(serverServices.configureGracefulShutdown);
            sinon.assert.calledWith(serverServices.configureGracefulShutdown, expectedServer);

            done();
        });

        importServer();
    });

    it('should call server services to configure the controllers', (done) => {
        serverServices.applyControllers.callsFake(() => {
            sinon.assert.calledOnce(serverServices.applyControllers);
            sinon.assert.calledWith(serverServices.applyControllers, expectedServer);

            done();
        });

        importServer();
    });

    it('should start the server', (done) => {
        expectedServer.start.callsFake(() => {
            sinon.assert.calledOnce(expectedServer.start);

            const [startHandler] = expectedServer.start.firstCall.args;

            startHandler();

            sinon.assert.calledOnce(console.log);
            sinon.assert.calledWith(console.log, `Server running at: ${expectedServer.info.uri}`);

            done();
        });

        importServer();
    });

    it('should do everything in the correct order', (done) => {
        expectedServer.start.callsFake(() => {
            const [startHandler] = expectedServer.start.firstCall.args;

            startHandler();

            sinon.assert.callOrder(
                serverServices.createServer,
                postgresService.getDatabasePool,
                serverServices.configureGracefulShutdown,
                expectedServer.start,
                console.log
            );

            done();
        });

        importServer();
    });

    it('should not start the server if there is an error', (done) => {
        expectedServer.start.callsFake(() => {
            const expectedErrorMessage = chance.string();
            const expectedError = new Error(expectedErrorMessage);
            const [startHandler] = expectedServer.start.firstCall.args;

            startHandler(expectedError);

            sinon.assert.notCalled(console.log);

            sinon.assert.calledOnce(console.error);
            sinon.assert.calledWith(console.error, expectedError);

            sinon.assert.calledOnce(process.exit);
            sinon.assert.calledWith(process.exit, 1);

            done();
        });

        importServer();
    });
});
