import { CalendarService } from "./calendar.service";
import { Request, Response, NextFunction } from 'express';
// import validator from 'validator';


export class CalendarController {
    public calendarService: CalendarService
    constructor(calendarService: CalendarService) {
        this.calendarService = calendarService
    }

    createCalendar = (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name
        const date = new Date();
        const isoString = date.toISOString();
        const dateWithTz = new Date(isoString);
        this.calendarService.createCalendar(name, dateWithTz)
            .then((result) => {
                return res.send(201).json(result);
            })
            .catch((error) => {
                return next(error);
            });
    }

    getCalendar = (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        // TODO: sanitize 

        this.calendarService.getCalendar(calendarId)
            .then((result) => {
                res.send(201).json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    updateCalendarName = (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        const calendarName = req.body.name
        // TODO: sanitize 
        this.calendarService.updateCalendarName(calendarId, calendarName)
            .then((result) => {
                res.send(201).send(result);
            })
            .catch((error) => {
                next(error);
            });

    }

    deleteCalendar = (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        // TODO: sanitize 
        this.calendarService.deleteCalendar(calendarId)
            .then((result) => {
                res.send(201).send(result);
            })
            .catch((error) => {
                next(error);
            });;
    }
}