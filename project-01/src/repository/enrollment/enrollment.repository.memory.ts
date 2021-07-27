import Enrollment from "../../entity/enrollment/enrollment";
import CPF from "../../value-objects/cpf/cpf";
import EnrollmentRepositoryInterface from "./enrollment.repository.interface";

export default class EnrollmentRepositoryMemory
  implements EnrollmentRepositoryInterface
{
  enrolledStudents: Enrollment[];

  constructor() {
    this.enrolledStudents = [];
  }

  save(enrollment: Enrollment): void {
    this.enrolledStudents.push(enrollment);
  }

  findAll(): Enrollment[] {
    return this.enrolledStudents;
  }

  findByCpf(cpf: CPF): any {
    return this.enrolledStudents.find(
      (enrolledStudent) => enrolledStudent.student?.cpf.value === cpf.value
    );
  }

  findAllByClass(module: string, clazz: string, level: string): Enrollment[] {
    return this.enrolledStudents.filter(
      (enrolledStudent) =>
        enrolledStudent.module === module &&
        enrolledStudent.clazz === clazz &&
        enrolledStudent.level === level
    );
  }

  count(): number {
    return this.enrolledStudents.length;
  }
}
