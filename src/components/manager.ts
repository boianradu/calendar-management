import { CalendarService } from './calendar/calendar.service';
import { CalendarController } from './calendar/calendar.controller';

import { CalendarEntryService } from './calendar-entry/calendar-entry.service';
import { CalendarEntryController } from './calendar-entry/calendar-entry.controller'

export function createCalendarController(): CalendarController {
    const calendarService = new CalendarService();
    return new CalendarController(calendarService);
}
export function createCalendarEntryController(): CalendarEntryController {
    const calendarEntryService = new CalendarEntryService();
    return new CalendarEntryController(calendarEntryService);
}