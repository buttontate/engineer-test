const pg = require('pg');
const proxyquire = require('proxyquire');
const {expect} = require('chai');
const sinon = require('sinon');

describe('postgres service', () => {
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
            query: sandbox.stub(),
            user: 'postgres'
        };

        sandbox.stub(pg, 'Pool').returns(expectedPool);

        postgresService = importPostgresService();
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

    it('should throw an error if query fails', async () => {
        expectedPool.query.rejects();

        try {
            await postgresService.getDatabasePool();
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('Unable to connect to PostgreSQL database.  App will restart and try again');

            return;
        }

        throw new Error('Expected query to reject');
    });
});
