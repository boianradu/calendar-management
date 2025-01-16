import CalendarEntryService from './calendar-entry.controller';

class CalendarEntryController {
    private calendarEntry: CalendarEntryService

    constructor(calendarEntry) {
        this.calendarEntry = calendarEntry;
    }

    createCalendarEntry = (calendarEntry) => {
        if (this.calendarEntry) {

        }
    };

    getCalendarEntries = (_, res) => res.status(200).send();


}

export default CalendarEntryController;