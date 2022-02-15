import Classroom from "./classroom";
import Level from "./level";
import Module from "./modules";
import Student from "./student";
import { EnrollCode } from "../value-objects/enroll-code/enroll-code";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  sequence: number;
  code: EnrollCode;
  issueDate: Date;
  invoices: any[]

  constructor(
    { student,
      level,
      module,
      classroom,
      sequence,
      date,
      invoices,
    }: {
      student: Student,
      level: Level,
      module: Module,
      classroom: Classroom,
      sequence: number,
      date: Date,
      invoices: any[]
    }
  ) {
    this.checkStudentHasMinimiumAge(module, student)
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.sequence = sequence;
    this.invoices = invoices
    this.issueDate = date;
    this.code = new EnrollCode(level.code, module.code, classroom.code, date, sequence)
  }

  private checkStudentHasMinimiumAge(module: Module, student: Student) {
    const studentAge = student.getAge();
    const minimumAge = module.minimumAge;

    if (studentAge < minimumAge) {
      throw new Error("Student below minimum age");
    }
  }


}
