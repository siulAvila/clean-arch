import { Student } from './student';

export class EnrollmentRequest {
  student: Student;
  constructor(student: Student) {
    this.student = student;
  }
}
