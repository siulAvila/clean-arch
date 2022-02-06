import Student from "./student";

export default class Enrollment {
  student: Student;
  level: string;
  module: string;
  clazz: string;
  code: string;

  constructor(
    { student,
      level,
      module,
      clazz,
      code,
    }: {
      student: Student,
      level: string,
      module: string,
      clazz: string,
      code: string,
    }
  ) {
    this.student = student;
    this.level = level;
    this.module = module;
    this.clazz = clazz;
    this.code = code;
  }
}
