import EnrollStudent from "./EnrollStudent";
import ClassRepositoryMemory from "./repository/class/class.repository.memory";
import EnrollmentRepositoryMemory from "./repository/enrollment/enrollment.repository.memory";
import LevelRepositoryMemory from "./repository/level/level.repository.memory";
import ModuleRepositoryMemory from "./repository/module/module.repository.memory";
import CPFError from "./value-objects/cpf/cpf.error";
import NameError from "./value-objects/name/name.error";

let enrollStudent: EnrollStudent;
beforeEach(() => {
  const levelRepository = new LevelRepositoryMemory();
  const classRepository = new ClassRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const enrollmentRepository = new EnrollmentRepositoryMemory();

  enrollStudent = new EnrollStudent(
    levelRepository,
    classRepository,
    moduleRepository,
    enrollmentRepository
  );
});

it("Should not enroll without valid student name", () => {
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

  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code).toEqual("2021EM3A0001");
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
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Student below minimum age")
  );
});

it("Should not enroll student over class capacity", () => {
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
  enrollStudent.execute(studentEnrollRequestA);
  enrollStudent.execute(studentEnrollRequestB);
  expect(() => enrollStudent.execute(studentEnrollRequestC)).toThrow(
    new Error("Class is over capacity")
  );
});
