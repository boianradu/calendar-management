export class Calendar {
    private id!: number;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public setId(id: number) {
        this.id = id
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
