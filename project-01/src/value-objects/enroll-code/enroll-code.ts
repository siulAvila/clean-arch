

export class EnrollCode {
    value: string;
    constructor(level: string, module: string, classroom: string, date: Date, sequence: number) {
        const enrollmentSequence = `${sequence}`.padStart(4, "0");
        this.value = `${date.getFullYear()}${level}${module}${classroom}${enrollmentSequence}`;

    }
}