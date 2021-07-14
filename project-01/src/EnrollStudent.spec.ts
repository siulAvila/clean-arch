import EnrollStudent from "./EnrollStudent";
import CPFError from "./value-objects/cpf/cpf.error";
import NameError from "./value-objects/name/name.error";

it("Should not enroll without valid student name", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: { name: "Ana" },
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new NameError().message
  );
});

it("Should not enroll without valid student cpf", () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "123.456.789-99",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };
  const enrollStudent = new EnrollStudent();
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new CPFError().message
  );
});

it("Should not enroll duplicated student", () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };
  const enrollStudent = new EnrollStudent();
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});

it("Should generate enrollment code", () => {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };

  const enrollStudent = new EnrollStudent();
  const enrollCode = enrollStudent.execute(enrollmentRequest);
  expect(enrollCode).toEqual("2021EM3A0001");
});

it("Should not enroll student below minimum age", () => {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2012-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };
  const enrollStudent = new EnrollStudent();
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Student below minimum age")
  );
});

it.only("Should not enroll student over class capacity", () => {
  const studentEnrollRequestA = {
    student: {
      name: "Luigi Henrique",
      cpf: "538.657.420-50",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };
  const studentEnrollRequestB = {
    student: {
      name: "Liz Maria",
      cpf: "293.605.980-11",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };

  const studentEnrollRequestC = {
    student: {
      name: "Paulo Jose",
      cpf: "720.423.440-52",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "A",
  };
  const enrollStudent = new EnrollStudent();
  enrollStudent.execute(studentEnrollRequestA);
  enrollStudent.execute(studentEnrollRequestB);
  expect(() => enrollStudent.execute(studentEnrollRequestC)).toThrow(
    new Error("Class is over capacity")
  );
});
