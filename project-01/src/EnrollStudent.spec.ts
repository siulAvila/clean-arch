import EnrollStudent from "./EnrollStudent";
import Student from "./entity/student";
import ClassroomRepositoryMemory from "./repository/classroom/classroom.repository.memory";
import EnrollmentRepositoryMemory from "./repository/enrollment/enrollment.repository.memory";
import LevelRepositoryMemory from "./repository/level/level.repository.memory";
import ModuleRepositoryMemory from "./repository/module/module.repository.memory";
import CPFError from "./value-objects/cpf/cpf.error";
import NameError from "./value-objects/name/name.error";

let enrollStudent: EnrollStudent;
beforeEach(() => {
  const levelRepository = new LevelRepositoryMemory();
  const classRepository = new ClassroomRepositoryMemory();
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
      cpf: "236.449.510-48",
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
    student: new Student({
      name: "Ana Silva",
      cpf: "269.056.560-97",
      birthDate: "2002-03-12",
    }),
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
    student: new Student({
      name: "Maria Carolina Fonseca",
      cpf: "037.974.540-23",
      birthDate: "2002-03-12",
    }),
    level: "EM",
    module: "3",
    class: "A",
  };

  const enrollment = enrollStudent.execute(enrollmentRequest);
  const enrollCodeExpected = `${new Date().getFullYear()}EM3A0001`
  expect(enrollment.code).toEqual(enrollCodeExpected);
});

it("Should not enroll student below minimum age", () => {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "681.845.980-33",
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
      cpf: "114.662.760-29",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "F",
  };
  const studentEnrollRequestB = {
    student: {
      name: "Liz Maria",
      cpf: "059.136.590-15",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "F",
  };

  const studentEnrollRequestC = {
    student: {
      name: "Paulo Jose",
      cpf: "465.386.700-32",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "F",
  };
  enrollStudent.execute(studentEnrollRequestA);
  enrollStudent.execute(studentEnrollRequestB);
  expect(() => enrollStudent.execute(studentEnrollRequestC)).toThrow(
    new Error("Class is over capacity")
  );
});
it("Should not enroll after que end of the class", () => {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "681.845.980-33",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "3",
    class: "E",
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Class is already finished")
  );
});

it("Should not enroll after 25% of the start of the class", () => {
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12"
    },
    level: "EM",
    module: "1",
    class: "C",
  }
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Class is already started")
  );
});

it.only("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", () => {
  const invoicesMock = [
    {
      instalment: 1,
      value: 1416
    },
    {
      instalment: 2,
      value: 1416
    },
    {
      instalment: 3,
      value: 1416
    },
    {
      instalment: 4,
      value: 1416
    },
    {
      instalment: 5,
      value: 1416
    },
    {
      instalment: 6,
      value: 1416
    },
    {
      instalment: 7,
      value: 1416
    },
    {
      instalment: 8,
      value: 1416
    },
    {
      instalment: 9,
      value: 1416
    },
    {
      instalment: 10,
      value: 1416
    },
    {
      instalment: 11,
      value: 1416
    },
    {
      instalment: 12,
      value: 1424
    },
  ]

  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12"
    },
    level: "EM",
    module: "1",
    class: "A",
    installments: 12
  }
  expect(enrollStudent.execute(enrollmentRequest).invoices).toStrictEqual(invoicesMock)
});