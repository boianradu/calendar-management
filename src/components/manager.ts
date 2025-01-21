import { CalendarService } from './calendar/calendar.service.js';
import { CalendarController } from './calendar/calendar.controller.js';

import { CalendarEntryService } from './calendar-entry/calendar-entry.service.js';
import { CalendarEntryController } from './calendar-entry/calendar-entry.controller.js'

export function createCalendarController(): CalendarController {
    const calendarService = new CalendarService();
    return new CalendarController(calendarService);
}
export function createCalendarEntryController(): CalendarEntryController {
    const calendarEntryService = new CalendarEntryService();
    return new CalendarEntryController(calendarEntryService);
}