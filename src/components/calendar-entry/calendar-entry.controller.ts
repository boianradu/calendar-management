import { CalendarEntryService } from './calendar-entry.service';
import { Request, Response, NextFunction } from 'express';
import { isAlphanumericAndSpaces } from '../../utils/utils';
import { CalendarEntry } from '@prisma/client';

export class CalendarEntryController {
    public ceService: CalendarEntryService
    constructor(ceService: CalendarEntryService) {
        this.ceService = ceService;
    }

    createCalendarEntry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // title
            const title: string = req.body.title;
            if (!isAlphanumericAndSpaces(title)) {
                return next(new Error("Invalid title"));
            }

            // date
            const start: Date = new Date(req.body.start);
            if (isNaN(start.getTime())) {
                return next(new Error("Invalid date"));
            }

            // duration
            const duration: number = parseInt(req.body.duration, 10);
            if (isNaN(duration)) {
                return next(new Error("Invalid duration"));
            }

            // calendar id
            const calendarId: number = parseInt(req.params.calendarId, 10);
            if (isNaN(calendarId)) {
                return next(new Error("Invalid calendar ID"));
            }

            // Check for overlapping events
            let entryExists: boolean = false
            const calendarEntries = await this.ceService.getCalendarEntries(calendarId);
            if (calendarEntries == null) {
                console.log("No calendar entries found");
            } else {

                entryExists = calendarEntries.some(entry =>
                (entry.start.getTime() <= start.getTime() + duration * 60000 &&
                    entry.end.getTime() >= start.getTime())
                );
            }

            if (entryExists) {
                return res.status(409).send("Overlapping event");
            }

            // Create the calendar entry
            const result = await this.ceService.createCalendarEntry(title, start, duration, calendarId);
            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    };


    getCalendarEntries = (req: Request, res: Response) => {
        const calendarId = req.body.calendarId
        res.status(200).json(this.ceService.getCalendarEntries(calendarId));
    }


    updateCalendarEntries = (req: Request, res: Response) => {
        const title = req.body.title
        const start = req.body.start
        const duration = req.body.duration
        const calendarId = req.body.calendarId

        res.send(200).json(this.ceService.updateCalendarEntry(calendarId, title));
    }


    deleteCalendarEntry = (req: Request, res: Response) => {
        const calendarEntryId = req.body.calendarId

        res.send(200).send(this.ceService.getCalendarEntries(calendarEntryId));
    }

}
