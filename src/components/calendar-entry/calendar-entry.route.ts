// src/components/user/user.router.js
import express from 'express';
import CalendarEntryController from './calendar-entry.controller';

class CalendarEntryRouter {
    public calendarEntryController: CalendarEntryController
    constructor(calendarEntryController) {
        this.calendarEntryController = calendarEntryController;
    }

    getRouter() {
        const router = express.Router();
        router.route('/calendars/:calendarId/entries').post(this.calendarEntryController.createCalendarEntry);
        router.route('/calendars/:calendarId/entries').get(this.calendarEntryController.getCalendarEntries);
        router.route('/calendars/:calendarId/entries/:entrtyId').put(this.calendarEntryController.getCalendarEntries);
        return router;
    }
}

export default CalendarEntryRouter;