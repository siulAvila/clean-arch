import Classroom from "../../entity/classroom";
import ClassroomRepositoryInteface from "./classroom.repository.interface";

export default class ClassroomRepositoryMemory
  implements ClassroomRepositoryInteface {
  private classes: Classroom[];
  constructor() {
    this.classes = [
      new Classroom({
        level: "EM",
        module: "3",
        code: "A",
        capacity: 5,
        startDate: "2021-07-01",
        endDate: "2025-12-15",
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "B",
        capacity: 5,
        startDate: "2021-05-01",
        endDate: "2025-05-30",
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "C",
        capacity: 5,
        startDate: "2021-06-01",
        endDate: "2022-04-01",
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "E",
        capacity: 5,
        startDate: "2021-01-01",
        endDate: "2021-12-15",
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "F",
        capacity: 2,
        startDate: "2021-01-01",
        endDate: "2025-12-15",
      })
    ];
  }

  getAll(): Classroom[] {
    return this.classes;
  }

  getByCode(code: string): Classroom {
    const classroom = this.classes.find((classroom) => classroom.code === code);
    if (!classroom) {
      throw new Error("class not found");
    }
    return classroom;
  }
}
