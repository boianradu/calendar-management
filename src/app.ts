import { envs } from './db/env.db';
import { Server } from './server';
import { log } from './utils/logger';

(() => {
    main();
})();

function main(): void {
    log("Starting MERO")
    const server = new Server({
        port: envs.DB_PORT,
        apiPrefix: envs.API_PREFIX
    });
    void server.start();
}

