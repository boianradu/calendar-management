import { CalendarEntryService } from './calendar-entry.service';
import { Request, Response, NextFunction } from 'express';
import { isAlphanumericAndSpaces } from '../../utils/utils';
import { CalendarEntry } from '@prisma/client';
import { HttpCode } from '../../utils/constants';

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
            return res.status(HttpCode.CREATED).json(result);

        } catch (error) {
            return next(new Error("Error creating calendar"));
        }
    };


    getCalendarEntries = async (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId

        if (isNaN(calendarId)) {
            return next(new Error("Invalid calendar id"));
        }
        let calendarEntry: CalendarEntry[] | null = await this.ceService.getCalendarEntries(calendarId);
        if (calendarEntry == null) {
            res.status(404).send("Calendar entry not found");
        }
        res.status(200).json(calendarEntry);
    }


    updateCalendarEntry = async (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId

        if (isNaN(calendarId)) {
            return next(new Error("Invalid calendar id"));
        }

        const entryId = req.body.entryId

        if (isNaN(entryId.getTime())) {
            return next(new Error("Invalid calendar id"));
        }


        const title = req.body.title
        if (!isAlphanumericAndSpaces(title)) {
            return next(new Error("Invalid title"));
        }


        const calendarEntryUpdated: CalendarEntry | null = await this.ceService.updateCalendarEntry(calendarId, { title: "" }, false);

        if (calendarEntryUpdated == null) {
            res.status(404).send("Calendar update not working");
        }
        res.status(200).json(calendarEntryUpdated);
    }


    deleteCalendarEntry = async (req: Request, res: Response, next: NextFunction) => {
        const calendarEntryId = req.body.calendarId

        if (isNaN(calendarEntryId.getTime())) {
            return next(new Error("Invalid calendar id"));
        }

        const calendarEntryDeleted: CalendarEntry | null = await this.ceService.deleteCalendarEntry(calendarEntryId);

        if (calendarEntryDeleted == null) {
            res.status(404).send("Calendar entry not found");
        }

        res.send(200).send(calendarEntryDeleted);
    }

}
