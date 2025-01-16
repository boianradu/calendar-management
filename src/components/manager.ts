
import STATUSES from "../utils/statuses"
import { ControllerCalendar } from "./calendar/calendar.controller";
export class WalletManager {
    private calendarController: ControllerCalendar;

    constructor() {
        this.calendarController = new ControllerCalendar();
    }

    async createCalendar(name: string): Promise<[string]> {
        const result = await this.calendarController.createCalendar(name);
        if (result) {
            return [STATUSES.CREATED];
        } else {
            return [STATUSES.CANNOT_CREATE]
        }
    }
    async getCalendar(calendarId: string): Promise<[string]> {
        const calendar = await this.calendarController.getCalendar(calendarId);
        if (!calendar) {
            return Promise.reject(new Error('Calendar not found'));
        }
        return [calendar.name]
    }
}
