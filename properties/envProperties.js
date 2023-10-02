exports.isEnv = isEnv;
exports.getEnv = getEnv;
exports.isServer = isServer;
exports.getServer = getServer;

function isEnv(env) {
    return process.env.NODE_ENV == env;
}

function getEnv() {
    return process.env.NODE_ENV;
}

function isServer(server) {
    return process.env.SERVER == server;
}

function getServer() {
    let os = require("os");
    let hostname = os.hostname();
    return hostname;
}

module.exports = { isEnv, getEnv, isServer, getServer };