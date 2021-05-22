import { EnrollmentRequest } from './models/enrollment-request';
import { Student } from './models/student';
import { cpfValidate } from './utils/cpf-validator';
export default class EnrollStudent {
  enrolledStudents: Student[] = [];

  execute(enrollmentRequest: EnrollmentRequest) {
    if (!this.isValidName(enrollmentRequest.student.name)) {
      throw new Error('Invalid student name');
    }
    if (!cpfValidate(enrollmentRequest.student.cpf)) {
      throw new Error('Invalid student cpf');
    }
    if (this.hasStudentAlreadyEnrolled(enrollmentRequest.student)) {
      throw new Error('Enrollment with duplicated student is not allowed');
    }
    this.enrolledStudents.push(enrollmentRequest.student);
  }

  isValidName(name: string) {
    const validNameRegex = new RegExp(/^([A-Za-z]+ )+([A-Za-z])+$/);
    return validNameRegex.test(name);
  }

  hasStudentAlreadyEnrolled(student: Student) {
    return this.enrolledStudents.some(
      (enrolledStudent) => enrolledStudent.cpf === student.cpf
    );
  }
}
