// calendar-entry.ts

import { Duration } from 'luxon';

export class CalendarEntry {
    public id: number;
    public title: string;
    public start: Date;
    public duration: Duration;
    public id_calendar: number
    public name_calendar: string

    constructor(title: string, start: Date, duration: Duration) {
        this.title = title;
        this.start = start;
        this.duration = duration;
    }


    public setId(id: number) {
        this.id = id
    }

    public updateTitle(title: string): void {
        this.title = title;
    }

    public updateStart(start: Date): void {
        this.start = start;
    }

    public updateDuration(duration: Duration): void {
        this.duration = duration;
    }

    public toJSON(): { id: number; title: string; start: string; duration: string, id_calendar: number } {
        return {
            id: this.id,
            title: this.title,
            start: this.start.toISOString(),
            duration: this.duration.toISO(),
            id_calendar: this.id_calendar
        };
    }
}
