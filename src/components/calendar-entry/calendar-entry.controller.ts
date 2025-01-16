import CalendarEntryController from './calendar-entry.service';
import { CalendarEntry } from './calendar-entry.model';

class CalendarEntryService {
    public calendarEntryController: CalendarEntryController
    constructor(calendarEntryController) {
        this.calendarEntryController = calendarEntryController;
    }

    createCalendarEntry = (req, res) => {
        const title = req.body.title
        const start = req.body.start
        const duration = req.body.duration
        // TODO: sanitize
        const calendarEntry = new CalendarEntry(title, start, duration);
        return res.status(201).send(this.calendarEntryController.createCalendarEntry(calendarEntry));
    };

    getCalendarEntries = (_, res) => res.status(200).send();

    getCalendar = (req, res) => {
        const { id } = req.params;
        return res.status(200).send();
    };

}

export default CalendarEntryService;