import express from 'express';
import { CalendarController } from './calendar.controller';

class CalendarRouter {
    public calendarController: CalendarController
    constructor(calendarController: CalendarController) {
        this.calendarController = calendarController;
    }

    public getRouter() {
        const router = express.Router();
        router.route('/calendars').post(this.calendarController.createCalendar);
        router.route('/calendars:/calendarId').get(this.calendarController.getCalendar);
        router.route('/calendars:/calendarId').put(this.calendarController.updateCalendarName);
        router.route('/calendars:/calendarId').delete(this.calendarController.deleteCalendar);
        return router;
    }
}

export default CalendarRouter;