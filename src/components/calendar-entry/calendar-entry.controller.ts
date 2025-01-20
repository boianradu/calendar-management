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

    createCalendarEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // title
            const title: string = req.body.title;
            if (!title || !isAlphanumericAndSpaces(title)) {
                return next({ status: 400, message: "Invalid title" });
            }

            // date
            const start: Date = new Date(req.body.start);
            if (!start || isNaN(start.getTime())) {
                return next({ status: 400, message: "Invalid date" });
            }

            // duration
            const duration: number = parseInt(req.body.duration, 10);
            if (!duration || isNaN(duration)) {
                return next({ status: 400, message: "Invalid duration" });
            }

            // calendar id
            const calendarId: number = parseInt(req.params.calendarId, 10);
            if (!calendarId || isNaN(calendarId)) {
                return next({ status: 400, message: "Invalid calendar id" });

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
                res.status(409).send("Overlapping event");
            }
            // Create the calendar entry
            const result = await this.ceService.createCalendarEntry(title, start, duration, calendarId);
            res.status(HttpCode.CREATED).json(result);

        } catch (error) {
            return next({ status: 500, message: "Internal server error" });
        } finally {
            return Promise.resolve();
        }
    };


    getCalendarEntries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const calendarId = req.body.calendarId

            if (!calendarId || isNaN(calendarId)) {
                return next({ status: 400, message: "Invalid calendar id" });
            }
            let calendarEntry: CalendarEntry[] | null = await this.ceService.getCalendarEntries(calendarId);
            if (calendarEntry == null) {
                res.status(404).send("Calendar entry not found");
            }
            res.status(200).json(calendarEntry);
        } catch (error) {

            return next({ status: 500, message: "Internal server error" });
        }
    }


    updateCalendarEntry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const calendarId = req.body.calendarId

            if (!calendarId || isNaN(calendarId)) {
                return next({ status: 400, message: "Invalid calendar id" });
            }

            const entryId = req.body.entryId

            if (!entryId || isNaN(entryId)) {
                return next({ status: 400, message: "Invalid calendar entry id" });
            }


            const title = req.body.title
            if (!title || !isAlphanumericAndSpaces(title)) {
                return next({ status: 400, message: "Invalid title" });
            }

            const calendarEntryUpdated: CalendarEntry | null = await this.ceService.updateCalendarEntry(entryId, { title: title }, false);

            if (calendarEntryUpdated == null) {
                res.status(404).send("Calendar update not working");
            }
            res.status(200).json(calendarEntryUpdated);
        } catch (error) {
            return next({ status: 500, message: "Internal server error" + error });
        }
    }


    deleteCalendarEntry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const calendarEntryId = req.body.entryId

            if (!calendarEntryId || isNaN(calendarEntryId)) {
                return next({ status: 400, message: "Invalid calendar entry id" });
            }

            const calendarEntryDeleted: CalendarEntry | null = await this.ceService.deleteCalendarEntry(calendarEntryId);

            if (calendarEntryDeleted == null) {
                res.status(404).send("Calendar entry not found");
            }

            res.status(204).send(calendarEntryDeleted);
        } catch (error) {
            return next({ status: 500, message: "Internal server error" });
        }
    }

}
