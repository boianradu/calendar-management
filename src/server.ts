import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { log } from './utils/logger.js'
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './utils/constants.js';
import bodyParser from 'body-parser';
import CalendarRouter from './components/calendar/calendar.route.js'
import { createCalendarController, createCalendarEntryController } from './components/manager.js'
import CalendarEntryRouter from './components/calendar-entry/calendar-entry.route.js';
import { CalendarController } from './components/calendar/calendar.controller.js';
import { CalendarEntryController } from './components/calendar-entry/calendar-entry.controller.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err); // Dacă headerele au fost trimise, delegă eroarea următorului middleware.
    }
    console.log('Something went wrong!' + err.message)
    res.status(500).send('Something went wrong!' + err.message);
};

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
        this.calendarController = createCalendarController();
        this.calendarRouter = new CalendarRouter(this.calendarController);

        this.calendarEntryController = createCalendarEntryController();
        this.calendarEntryRouter = new CalendarEntryRouter(this.calendarEntryController);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded());
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
