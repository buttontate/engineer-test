const fs = require('fs');
const path = require('path');

const {Server} = require('hapi');

const {getDatabasePool} = require('./postgres-service');

const applyControllers = (server) => {
    const controllersDirectoryNormalized = path.join(__dirname, './controllers/');

    fs.readdirSync(controllersDirectoryNormalized).forEach((file) => { // eslint-disable-line no-sync
        const controllerModule = require(controllersDirectoryNormalized + file); // eslint-disable-line import/no-dynamic-require

        server.route(controllerModule());
    });
};

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
    applyControllers,
    configureGracefulShutdown,
    createServer
};
