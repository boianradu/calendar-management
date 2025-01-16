import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { log } from './utils/logger'
import router from "./routes/mero.routes";
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './utils/constants';
var bodyParser = require('body-parser')
import errorMiddleware from './routes/middleware.error';

const app = express();
const PORT = process.env.PORT || 3000;


function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message || 'Internal Server Error',
    });
}

interface ServerOptions {
    port: number;
    apiPrefix: string;
}

export class Server {
    private readonly app = express();
    private readonly port: number;

    constructor(options: ServerOptions) {
        const { port } = options;
        this.port = port;
        this.initializeRoutes()
        // this.seedDB()F
    }

    private seedDB() {
        // seedDatabase().catch((error) => log(error));
    }
    private initializeRoutes() {
        this.app.use(errorHandler);
        this.app.use(bodyParser.json());
        this.app.use(router);
        this.app.use(errorHandler);
    }

    async start(): Promise<void> {
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());

        //  limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );


        this.app.listen(this.port, () => {
            log(`Server running on http://localhost:${this.port}`);
        });
    }
}

app.get('/', (req: Request, res: Response) => {
    res.send('Calendar Management Server');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});