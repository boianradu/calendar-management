export class CalendarEntry {
    public id!: number;
    public title: string;
    public start: Date;
    public end: Date;
    public duration: number;
    public id_calendar!: number

    constructor(title: string, start: Date, duration: number) {
        this.title = title;
        this.start = start;
        this.duration = duration;
        this.end = new Date(start.getTime() + duration * 60000)
    }


    public setId(id: number) {
        this.id = id
    }

    public setCalendarId(calendarId: number) {
        this.id_calendar = calendarId
    }

    public updateTitle(title: string): void {
        this.title = title;
    }

    public updateStart(start: Date): void {
        this.start = start;
    }

    public updateDuration(duration: number): void {
        this.duration = duration;
    }

    public toJSON(): { id: number; title: string; start: string; duration: number, id_calendar: number } {
        return {
            id: this.id,
            title: this.title,
            start: this.start.toISOString(),
            duration: this.duration,
            id_calendar: this.id_calendar
        };
    }
}
