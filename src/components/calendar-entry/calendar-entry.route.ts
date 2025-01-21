import { Router } from 'express';
import { CalendarEntryController } from './calendar-entry.controller.js';

class CalendarEntryRouter {
    private router: Router;
    private calendarEntryController: CalendarEntryController;
    constructor(calendarEntryController: CalendarEntryController) {
        this.router = Router();
        this.calendarEntryController = calendarEntryController;
    }

    getRouter() {
        this.router.route('/calendars/:calendarId/entries').post(this.calendarEntryController.createCalendarEntry);
        this.router.route('/calendars/:calendarId/entries').get(this.calendarEntryController.getCalendarEntries);
        this.router.route('/calendars/:calendarId/entries/:entrtyId').put(this.calendarEntryController.getCalendarEntries);
        this.router.route('/calendars/:calendarId/entries/:entrtyId').delete(this.calendarEntryController.deleteCalendarEntry);
        return this.router;
    }
}

export default CalendarEntryRouter;