import { CalendarEntryService } from './calendar-entry.service';

class CalendarEntryController {
    public ceService: CalendarEntryService
    constructor(ceService) {
        this.ceService = ceService;
    }

    createCalendarEntry = (req, res) => {
        const title = req.body.title
        const start = req.body.start
        const duration = req.body.duration
        const calendarId = req.body.calendarId
        // TODO: sanitize 
        return res.status(201).send(this.ceService.createCalendarEntry(title, start, duration, calendarId));
    };

    getCalendarEntries = (req, res) => {
        const calendarId = req.body.calendarId
        res.status(200).send(this.ceService.getCalendarEntries(calendarId));
    }


    updateCalendarEntries = (req, res) => {
        const title = req.body.title
        const start = req.body.start
        const duration = req.body.duration
        const calendarId = req.body.calendarId

        res.status(200).send(this.ceService.update(calendarId));
    }


    deleteCalendarEntry = (req, res) => {
        const calendarEntryId = req.body.calendarId

        res.status(200).send(this.ceService.getCalendarEntries(calendarEntryId));
    }

}

export default CalendarEntryController;