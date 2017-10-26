const pg = require('pg');
const proxyquire = require('proxyquire');
const {expect} = require('chai');
const sinon = require('sinon');
const Chance = require('chance');

describe('postgres service', () => {
    const chance = new Chance();
    const importPostgresService = () => proxyquire('../src/postgres-service', {});

    let sandbox,
        expectedPool,
        postgresService;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedPool = {
            database: 'postgres',
            host: 'db',
            password: 'password',
            port: 5432,
            query: sandbox.stub().resolves(),
            user: 'postgres'
        };

        sandbox.stub(pg, 'Pool').returns(expectedPool);

        postgresService = importPostgresService();

        sandbox.stub(global, 'setInterval').callsArg(0);
        sandbox.stub(console, 'error');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a new database pool and call query', async () => {
        const actualPool = await postgresService.getDatabasePool();

        sinon.assert.calledOnce(expectedPool.query);
        sinon.assert.calledWith(expectedPool.query, 'select * from information_schema.tables');

        delete expectedPool.query;

        sinon.assert.calledOnce(pg.Pool);
        sinon.assert.calledWith(pg.Pool, expectedPool);

        sinon.assert.calledWithNew(pg.Pool);

        expect(expectedPool).to.deep.equal(actualPool);
    });

    it('should only instantiate the database pool once', async () => {
        await postgresService.getDatabasePool();

        const actualPool = await postgresService.getDatabasePool();

        sinon.assert.calledOnce(pg.Pool);

        expect(expectedPool).to.deep.equal(actualPool);
    });

    describe('retry logic', () => {
        it('should try to connect to the database every second', async () => {
            await postgresService.getDatabasePool();

            sinon.assert.calledOnce(global.setInterval);
            sinon.assert.calledWith(global.setInterval, sinon.match.func, 1000);
        });

        it('should retry failed database connection attempts', (done) => {
            expectedPool.query.resetBehavior();
            global.setInterval.restore();

            const clock = sinon.useFakeTimers();
            const getDatabasePoolPromise = postgresService.getDatabasePool();
            const randomNumberOfFailures = chance.d4();

            // Query should fail until we've tried it randomNumberOfFailures + 1 times
            expectedPool.query.rejects();
            expectedPool.query.onCall(randomNumberOfFailures).resolves();

            // Every time an error is printed (because a query failed), advance time by one second
            console.error.callsFake(() => {
                clock.tick(1000);
            });

            // Kick off the initial interval
            clock.tick(1000);

            // When the query is finally successful, run our assertions
            getDatabasePoolPromise.then(() => {
                sinon.assert.callCount(console.error, randomNumberOfFailures);
                sinon.assert.calledWith(console.error, 'Failed connecting to database.  Will retry in one second...');

                done();
            });
        });
    });
});
