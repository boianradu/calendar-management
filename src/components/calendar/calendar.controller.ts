// calendar.controller.ts
import { Calendar } from "./calendar.model";
import { prisma } from "../../db/db";


export class ControllerCalendar {

    constructor() {
    }

    async createCalendar(name: string): Promise<number> {
        try {
            const calendarResult = await prisma.calendar.create({
                data: {
                    name: name
                }
            });
            if (calendarResult != null) {
                return calendarResult.id;
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

    async updateCalendarName(calendarId: number, newName: string): Promise<Calendar | null> {
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
            return null;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to update calendar name:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        }
    }
}