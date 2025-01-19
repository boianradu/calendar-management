import { CalendarService } from "./calendar.service";
import { Request, Response, NextFunction } from 'express';
import { isAlphanumericAndSpaces, isISOString } from '../../utils/utils';
import { HttpCode } from '../../utils/constants';

export class CalendarController {
    public calendarService: CalendarService
    constructor(calendarService: CalendarService) {
        this.calendarService = calendarService
    }

    createCalendar = async (req: Request, res: Response, next: NextFunction) => {
        const name: string = req.body.name;
        if (!isAlphanumericAndSpaces(name)) {
            return next(new Error("Invalid name"));
        }

        // date
        const date: Date = new Date();
        if (isNaN(date.getTime())) {
            return next(new Error("Invalid date"));
        }

        // isoString
        const isoString: string = date.toISOString();
        if (!isISOString(isoString)) {
            return next(new Error("Invalid ISO string"));
        }

        // dateWithTz
        const dateWithTz: Date = new Date(isoString);
        if (isNaN(dateWithTz.getTime())) {
            return next(new Error("Invalid date with timezone"));
        }

        const calendarCreated = await this.calendarService.createCalendar(name, dateWithTz)
        if (calendarCreated === null) {
            return next(new Error("Invalid calendar id"));
        } else {
            return res.status(HttpCode.CREATED).json(calendarCreated);
        }
    }

    getCalendar = async (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        if (isNaN(calendarId)) {
            return next(new Error("Invalid calendar id"));
        }
        const calendar = await this.calendarService.getCalendar(calendarId)

        if (calendar === null) {
            return res.status(500).json("Calendar couldn't be retrieved");
        } else if (calendar) {
            return res.status(HttpCode.CREATED).json(calendar);
        }
    }

    updateCalendarName = async (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        const calendarName = req.body.name

        if (isNaN(calendarId)) {
            return next(new Error("Invalid calendar id"));
        }

        if (!isAlphanumericAndSpaces(calendarName)) {
            return next(new Error("Invalid calendarName"));
        }

        const updatedCalendar = await this.calendarService.updateCalendarName(calendarId, calendarName)

        if (updatedCalendar === null) {
            return res.status(500).json("Calendar couldn't be updated");
        }
        return res.status(HttpCode.CREATED).json(updatedCalendar);
    }

    deleteCalendar = async (req: Request, res: Response, next: NextFunction) => {
        const calendarId = req.body.calendarId
        if (isNaN(calendarId)) {
            return next(new Error("Invalid calendar id"));
        }
        const calendarDeleted = await this.calendarService.deleteCalendar(calendarId)

        if (calendarDeleted === false) {
            return res.status(500).json("Calendar couldn't be deleted");
        }
        return res.status(HttpCode.CREATED).json(calendarDeleted);
    }
}