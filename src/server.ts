import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { log } from './utils/logger'
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './utils/constants';
var bodyParser = require('body-parser')
import CalendarRouter from './components/calendar/calendar.route'
import { createCalendarController, createCalendarEntryController } from './components/manager'
import CalendarEntryRouter from './components/calendar-entry/calendar-entry.route';
import { CalendarController } from './components/calendar/calendar.controller';
import { CalendarEntryController } from './components/calendar-entry/calendar-entry.controller';

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
    private calendarController: CalendarController
    private calendarRouter: CalendarRouter
    private calendarEntryController: CalendarEntryController
    private calendarEntryRouter: CalendarEntryRouter

    constructor(options: ServerOptions) {
        const { port } = options;
        this.port = port;
        this.initializeRoutes();
        this.calendarController = createCalendarController();
        this.calendarRouter = new CalendarRouter(this.calendarController);

        this.calendarEntryController = createCalendarEntryController();
        this.calendarEntryRouter = new CalendarEntryRouter(this.calendarEntryController);
    }

    private initializeRoutes() {
        this.app.use(bodyParser.json());
        this.app.use(this.calendarRouter.getRouter());
        this.app.use(this.calendarEntryRouter.getRouter());
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