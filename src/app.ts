import { ENVS } from '../env';
import { Server } from './server';
import { log } from './utils/logger';
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

