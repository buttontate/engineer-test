const {getDatabasePool} = require('./postgres-service');
const {createServer, configureGracefulShutdown} = require('./server-services');

/* eslint-disable consistent-return */
(async () => {
    const server = createServer();

    try {
        await getDatabasePool();
    } catch (error) {
        console.error(error);

        return process.exit(1);
    }

    configureGracefulShutdown(server);

    server.start((error) => {
        if (error) {
            console.error(error);

            return process.exit(1);
        }

        console.log(`Server running at: ${server.info.uri}`);
    });
})();
/* eslint-enable */
