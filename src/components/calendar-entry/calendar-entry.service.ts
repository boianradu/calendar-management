// calendar.controller.ts
import { CalendarEntry } from "./calendar-entry.model";
import { prisma } from "../../db/db";


export class CalendarEntryService {

    constructor() {
    }

    async createCalendarEntry(title: string, start: Date, duration: String, calendarId: number): Promise<number> {
        try {
            const calendarEntryResult = await prisma.calendarEntry.create({
                data: {
                    title: title,
                    start: start,
                    duration: duration,
                    calendarId: calendarId
                }
            });
            if (calendarEntryResult != null) {
                return calendarEntryResult.id;
            }
            return -1;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to create calendar:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return -1;
        }
    }

    async getCalendarEntries(calendarId: number): Promise<CalendarEntry | null> {
        try {
            const ceRes = await prisma.calendarEntry.find({
                where: { id: calendarId }
            });

            if (ceRes != null) {
                let c = new CalendarEntry(ceRes.title, ceRes.start, ceRes.duration)
                c.setId(calendarId)
                return c
            }
            return null;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Calendar not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        }
    }

}