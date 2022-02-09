import Classroom from "./classroom";
import Level from "./level";
import Module from "./modules";
import Student from "./student";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  code: string;
  invoices: any[]

  constructor(
    { student,
      level,
      module,
      classroom,
      code,
      invoices,
    }: {
      student: Student,
      level: Level,
      module: Module,
      classroom: Classroom,
      code: string,
      invoices: any[]
    }
  ) {
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.code = code;
    this.invoices = invoices
  }
}
