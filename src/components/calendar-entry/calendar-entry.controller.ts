import { CalendarEntryService } from './calendar-entry.service';
import { Request, Response, NextFunction } from 'express';

export class CalendarEntryController {
    public ceService: CalendarEntryService
    constructor(ceService: CalendarEntryService) {
        this.ceService = ceService;
    }

    createCalendarEntry = (req: Request, res: Response, next: NextFunction) => {
        const title: string = req.body.title;
        const start: Date = req.body.start;
        const duration: number = req.body.duration;
        const calendarId: number = req.body.calendarId;
        // TODO: sanitize 
        this.ceService.createCalendarEntry(title, start, duration, calendarId)
            .then((result) => {
                res.sendStatus(201).send(result);
            })
            .catch((error) => {
                next(error);
            });
    };

    getCalendarEntries = (req: Request, res: Response) => {
        const calendarId = req.body.calendarId
        res.sendStatus(200).send(this.ceService.getCalendarEntries(calendarId));
    }


    updateCalendarEntries = (req: Request, res: Response) => {
        const title = req.body.title
        const start = req.body.start
        const duration = req.body.duration
        const calendarId = req.body.calendarId

        res.sendStatus(200).send(this.ceService.updateCalendarEntry(calendarId, title));
    }


    deleteCalendarEntry = (req: Request, res: Response) => {
        const calendarEntryId = req.body.calendarId

        res.sendStatus(200).send(this.ceService.getCalendarEntries(calendarEntryId));
    }

}
