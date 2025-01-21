// calendar.controller.ts
import { CalendarEntry } from "./calendar-entry.model.js";
import { prisma } from "../../db.js";


export class CalendarEntryService {

    constructor() {
    }

    async createCalendarEntry(title: string, start: Date, duration: number, calendarId: number): Promise<number> {

        try {
            if (!(start instanceof Date) || isNaN(start.getTime())) {
                throw new Error("Invalid start date");
            }
            const calendarEntryResult = await prisma.calendarEntry.create({
                data: {
                    title: title,
                    start: start,
                    duration: duration,
                    end: new Date(start.getTime() + duration * 60000),
                    id_calendar: calendarId
                }
            });
            if (calendarEntryResult != null) {
                return calendarEntryResult.id;
            }
            return -1;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to create calendar entry:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return -1;
        }
    }

    async getCalendarEntries(calendarId: number): Promise<CalendarEntry[] | null> {
        try {
            const ceRes = await prisma.calendarEntry.findMany({
                where: {
                    id_calendar: parseInt(calendarId.toString())
                }
            });

            if (ceRes.length > 0) {
                return ceRes.map((entry: { id: number; title: string; start: Date; duration: number; end: Date; id_calendar: number; }) => {
                    let c = new CalendarEntry(entry.title, entry.start, entry.duration);
                    c.setId(entry.id);
                    return c;
                });
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

    async updateCalendarEntry(
        entryId: number,
        updates: { title?: string },
        forceOverlap: boolean = false
    ): Promise<CalendarEntry | null> {
        try {
            const existingEntry = await prisma.calendarEntry.findUnique({
                where: { id: entryId },
            });

            if (!existingEntry) {
                throw new Error("Calendar entry not found");
            }

            // check for overlapping events (if forceOverlap is false)
            if (!forceOverlap) {
                const overlappingEvents = await prisma.calendarEntry.findMany({
                    where: {
                        id_calendar: existingEntry.id_calendar,
                        id: { not: entryId },
                        start: { lt: existingEntry.end },
                        end: { gt: existingEntry.start },
                    },
                });

                if (overlappingEvents.length > 0) {
                    throw new Error("Event overlaps with another event");
                }
            }

            // update the calendar entry
            const updatedEntry = await prisma.calendarEntry.update({
                where: { id: entryId },
                data: {
                    title: updates.title || existingEntry.title, // if empty keep the title
                },
            });

            // Step 5: Return the updated entry as a CalendarEntry object
            const calendarEntry = new CalendarEntry(
                updatedEntry.title,
                updatedEntry.start,
                updatedEntry.duration
            );
            calendarEntry.setId(updatedEntry.id);
            return calendarEntry;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to update calendar entry:", error.message);
                throw error;
            } else {
                console.error("An unknown error occurred");
                throw new Error("An unknown error occurred");
            }
        }
    }
    async deleteCalendarEntry(
        entryId: number,
    ): Promise<CalendarEntry | null> {
        try {
            const ceRes = await prisma.calendarEntry.delete({
                where: { id: entryId },
            });
            if (ceRes) {

                const calendarEntry = new CalendarEntry(
                    ceRes.title,
                    ceRes.start,
                    ceRes.duration
                );
                return calendarEntry;
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Calendar entry not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        }
    }

}