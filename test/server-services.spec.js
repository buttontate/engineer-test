const Chance = require('chance');
const proxyquire = require('proxyquire');
const {expect} = require('chai');
const hapi = require('hapi');
const sinon = require('sinon');

const postgresService = require('../src/postgres-service');

describe('server services', () => {
    const chance = new Chance();
    const importServerService = () => proxyquire('../src/server-services', {});

    let sandbox,
        expectedServer,
        serverServices,
        expectedDatabasePool;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedServer  = {
            [chance.string()]: chance.string(),
            connection: sandbox.stub(),
            stop: sandbox.stub()
        };

        expectedDatabasePool = {
            end: sandbox.stub().resolves()
        };

        sandbox.stub(postgresService, 'getDatabasePool').returns(expectedDatabasePool);

        sandbox.stub(hapi, 'Server').returns(expectedServer);

        serverServices = importServerService();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createServer', () => {
        it('should create the server with the appropriate connection settings', () => {
            const actualServer = serverServices.createServer();

            sinon.assert.calledWithNew(hapi.Server);

            sinon.assert.calledOnce(expectedServer.connection);
            sinon.assert.calledWith(expectedServer.connection, {
                host: '0.0.0.0',
                port: 5555
            });

            expect(expectedServer).to.deep.equal(actualServer);
        });
    });

    describe('configureGracefulShutdown', () => {
        beforeEach(() => {
            sandbox.stub(process, 'on');
            sandbox.stub(process, 'exit');

            serverServices.configureGracefulShutdown(expectedServer);
        });

        it('should listen for SIGTERM and SIGINT', () => {
            sinon.assert.calledTwice(process.on);
            sinon.assert.calledWith(process.on, 'SIGTERM', sinon.match.func);
            sinon.assert.calledWith(process.on, 'SIGINT', sinon.match.func);
        });

        it('should terminate the database pool and exit with a clean exit code', async () => {
            const [, sigtermCallback] = chance.pickone([
                process.on.firstCall.args,
                process.on.secondCall.args
            ]);

            await sigtermCallback();

            sinon.assert.calledOnce(expectedDatabasePool.end);
            sinon.assert.calledOnce(expectedServer.stop);

            sinon.assert.calledOnce(process.exit);
            sinon.assert.calledWith(process.exit, 0);

            sinon.assert.callOrder(expectedDatabasePool.end, process.exit);
        });

        it('should not exit with a clean exit code if terminating the database pool fails', async () => {
            const [, sigtermCallback] = chance.pickone([
                process.on.firstCall.args,
                process.on.secondCall.args
            ]);

            expectedDatabasePool.end.resetBehavior();
            expectedDatabasePool.end.rejects();

            try {
                await sigtermCallback();
            } catch (error) {}

            sinon.assert.calledOnce(expectedDatabasePool.end);

            sinon.assert.calledOnce(process.exit);
            sinon.assert.calledWith(process.exit, 1);

            sinon.assert.callOrder(expectedDatabasePool.end, process.exit);
        });
    });
});
