// calendar.controller.ts
import { Calendar } from "./calendar.model";
import { prisma } from "../../db/db";
import { CalendarService } from "./calendar.service";


export class ControllerCalendar {
    public calendarService: CalendarService
    constructor(calendarService: CalendarService) {
        this.calendarService = calendarService
    }

    createCalendar = (req, res) => {
        const name = req.body.name
        // TODO: sanitize 
        return res.status(201).send(this.calendarService.createCalendar(name));
    }

    getCalendar = (req, res) => {
        const calendarId = req.body.calendarId
        // TODO: sanitize 
        return res.status(201).send(this.calendarService.getCalendar(calendarId));

    }

    updateCalendarName = (req, res) => {
        const calendarId = req.body.calendarId
        const calendarName = req.body.name
        // TODO: sanitize 
        return res.status(201).send(this.calendarService.updateCalendarName(calendarId, calendarName));

    }

    deleteCalendar = (req, res) => {
        const calendarId = req.body.calendarId
        // TODO: sanitize 
        const calendarDeleted = this.calendarService.deleteCalendar(calendarId)
        return res.status(201).send(calendarDeleted);
    }
}