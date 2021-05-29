import EnrollStudent from './EnrollStudent';
import CPFError from './value-objects/cpf/cpf.error';
import NameError from './value-objects/name/name.error';

it('Should not enroll without valid student name', () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: { name: 'Ana' },
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new NameError().message
  );
});

it('Should not enroll without valid student cpf', () => {
  const enrollmentRequest = {
    student: { name: 'Ana Silva', cpf: '123.456.789-99' },
  };
  const enrollStudent = new EnrollStudent();
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new CPFError().message
  );
});

it('Should not enroll duplicated student', () => {
  const enrollmentRequest = {
    student: { name: 'Ana Silva', cpf: '832.081.519-34' },
  };
  const enrollStudent = new EnrollStudent();
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error('Enrollment with duplicated student is not allowed')
  );
});
