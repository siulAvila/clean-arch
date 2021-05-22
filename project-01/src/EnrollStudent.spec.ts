import EnrollStudent from './EnrollStudent';
import { EnrollmentRequest } from './models/enrollment-request';
import { Student } from './models/student';

it('Should not enroll without valid student name', () => {
  const student = new Student('Ana', '');
  const enrollmentRequest = new EnrollmentRequest(student);
  const enrollStudent = new EnrollStudent();

  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error('Invalid student name')
  );
});

it('Should not enroll without valid student cpf', () => {
  const student = new Student('Ana Silva', '123.456.789-99');
  const enrollmentRequest = new EnrollmentRequest(student);
  const enrollStudent = new EnrollStudent();
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error('Invalid student cpf')
  );
});

it('Should not enroll duplicated student', () => {
  const student = new Student('Ana Silva', '832.081.519-34');
  const enrollmentRequest = new EnrollmentRequest(student);
  const enrollStudent = new EnrollStudent();
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error('Enrollment with duplicated student is not allowed')
  );
});
