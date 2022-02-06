import Student from "./student";

export default class Enrollment {
  student: Student;
  level: string;
  module: string;
  clazz: string;
  code: string;
  invoices: any[]

  constructor(
    { student,
      level,
      module,
      clazz,
      code,
      invoices,
    }: {
      student: Student,
      level: string,
      module: string,
      clazz: string,
      code: string,
      invoices: any[]
    }
  ) {
    this.student = student;
    this.level = level;
    this.module = module;
    this.clazz = clazz;
    this.code = code;
    this.invoices = invoices
  }
}
