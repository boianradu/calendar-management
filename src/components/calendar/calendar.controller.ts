import { CalendarService } from "./calendar.service";
import { Request, Response, NextFunction } from 'express';


export class CalendarController {
    public calendarService: CalendarService
    constructor(calendarService: CalendarService) {
        this.calendarService = calendarService
    }

    createCalendar = (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name
        // TODO: sanitize  
        this.calendarService.createCalendar(name)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    getCalendar = (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        // TODO: sanitize 

        this.calendarService.getCalendar(calendarId)
            .then((result) => {
                res.status(201).send(result);
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
                res.status(201).send(result);
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
                res.status(201).send(result);
            })
            .catch((error) => {
                next(error);
            });;
    }
}