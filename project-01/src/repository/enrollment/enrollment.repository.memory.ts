import Enrollment from "../../entity/enrollment";
import EnrollmentRepositoryInterface from "./enrollment.repository.interface";

export default class EnrollmentRepositoryMemory
  implements EnrollmentRepositoryInterface {
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

  findByCpf(cpf: string): Enrollment | undefined {
    return this.enrolledStudents.find(
      (enrolledStudent) => enrolledStudent.student?.cpf === cpf
    );
  }

  findAllByClass(enrollModuleCode: string, enrollClassroomCode: string, enrollLevelCode: string): Enrollment[] {
    return this.enrolledStudents.filter(
      ({ module, classroom, level }) =>
        module.code === enrollModuleCode &&
        classroom.code === enrollClassroomCode &&
        level.code === enrollLevelCode
    );
  }

  count(): number {
    return this.enrolledStudents.length;
  }
}
