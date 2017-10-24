const {Server} = require('hapi');

const {getDatabasePool} = require('./postgres-service');

const createServer = () => {
    const server = new Server();

    server.connection({
        host: '0.0.0.0',
        port: 5555
    });

    return server;
};

const onExit = async (server) => {
    try {
        await getDatabasePool().end();
        await server.stop();
    } catch (error) {
        return process.exit(1);
    }

    return process.exit(0);
};

const configureGracefulShutdown = (server) => {
    process.on('SIGTERM', () => onExit(server));
    process.on('SIGINT', () => onExit(server));
};

module.exports = {
    createServer,
    configureGracefulShutdown
};
