// calendar.controller.ts
import { Calendar } from "./calendar.model";
import { prisma } from "../../../db";


export class CalendarService {

    constructor() {
    }

    async createCalendar(name: string, created_at: Date): Promise<number | null> {
        try {
            const calendarResult = await prisma.calendar.create({
                data: {
                    name: name,
                    created_at: created_at
                }
            });
            if (calendarResult != null) {
                return calendarResult.id;
            }
            return null;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to create calendar:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        }
    }

    async getCalendar(calendarId: number): Promise<Calendar | null> {
        try {
            const calendarResult = await prisma.calendar.findUnique({
                where: { id: calendarId }
            });

            if (calendarResult != null) {
                let c = new Calendar(calendarResult.name)
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

    async updateCalendarName(calendarId: number, newName: string): Promise<number | null> {
        try {
            let calendar = await this.getCalendar(calendarId)
            if (calendar == null) {
                console.log("Calendar doesn't exist")
                return null
            }
            const calendarResult = await prisma.calendar.update({
                where: {
                    id: calendarId,
                },
                data: {
                    name: newName
                }
            });
            return calendarResult.id;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to update calendar name:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        }
    }


    async deleteCalendar(calendarId: number): Promise<boolean> {
        try {
            let calendar = await this.getCalendar(calendarId)
            if (calendar == null) {
                console.log("Calendar doesn't exist")
                return false
            }
            const calendarResult = await prisma.calendar.delete({
                where: {
                    id: calendarId,
                }
            });
            const calendarEntryResult = await prisma.calendarEntry.deleteMany({
                where: {
                    id_calendar: calendarId,
                }
            });
            return calendarResult != null && calendarEntryResult.count > 0;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to delete calendar ", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return false;
        }
    }
}