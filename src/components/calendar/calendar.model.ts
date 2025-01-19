export class Calendar {
    private id!: number;
    private name: string;
    private created_at: Date;


    constructor(name: string) {
        this.name = name;
        this.created_at = new Date();
        const currentDate = new Date()
        const isoString: string = currentDate.toISOString();
        const dateWithTz: Date = new Date(isoString);
        this.created_at = dateWithTz
    }

    public setId(id: number) {
        this.id = id
    }

    public getId() {
        return this.id
    }

    public setDate(currentDate: Date) {
        this
    }
    public setName(name: string) {
        this.name = name
    }

    public updateName(name: string): void {
        this.name = name;
    }

    public toJSON(): { id: number; name: string } {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
