import { ENVS } from './env.js';
import { Server } from './server.js';
import { log } from './utils/logger.js';
(() => {
    main();
})();

function main(): void {
    log("Starting MERO")
    const server = new Server({
        port: ENVS.PORT,
        apiPrefix: ENVS.API_PREFIX
    });
    void server.start();
}

