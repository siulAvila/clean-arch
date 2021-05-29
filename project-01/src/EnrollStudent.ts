import Student from './models/student/student';
export default class EnrollStudent {
  enrolledStudents: Array<any>;

  constructor() {
    this.enrolledStudents = [];
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf
    );
    if (this.hasStudentAlreadyEnrolled(student)) {
      throw new Error('Enrollment with duplicated student is not allowed');
    }
    const enrollement = { student };
    this.enrolledStudents.push(enrollement);
  }

  hasStudentAlreadyEnrolled(student: Student) {
    return this.enrolledStudents.some(
      (enrolledStudent) => enrolledStudent.student?.cpf === student.cpf
    );
  }
}
