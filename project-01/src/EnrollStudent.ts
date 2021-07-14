import Student from "./entity/student/student";
export default class EnrollStudent {
  enrolledStudents: Array<any>;

  constructor() {
    this.enrolledStudents = [];
  }

  private hasStudentAlreadyEnrolled(student: Student) {
    return this.enrolledStudents.some(
      (enrolledStudent) => enrolledStudent.student?.cpf === student.cpf.value
    );
  }

  private generateEnrollCode({ level, module, class: className }: any) {
    const currentYear = new Date().getFullYear();
    const sequence = `${this.enrolledStudents.length}`.padStart(4, "0");
    return `${currentYear}${level}${module}${className}${sequence}`;
  }

  private hasStudentBelowMinimiumAge(enrollmentRequest: any) {
    const studentAge =
      new Date().getFullYear() -
      new Date(enrollmentRequest.student.birthDate).getFullYear();
    const studentModule = this.getStudentModule(enrollmentRequest);
    const minimumAge = studentModule?.minimumAge || 0;

    if (studentAge < minimumAge) {
      return true;
    }
    return false;
  }

  private getStudentModule(enrollmentRequest: any) {
    return this.data.modules.find(
      (module) =>
        module.level === enrollmentRequest?.level &&
        module.code === enrollmentRequest?.module
    );
  }

  private getStudentClass({ level, module, class: className }: any) {
    return this.data.classes.find(
      (clazz) =>
        clazz.level === level &&
        clazz.module === module &&
        clazz.code === className
    );
  }

  private hasOverCapacity(enrollmentRequest: any) {
    const studentClass = this.getStudentClass(enrollmentRequest);

    const classCapacity = studentClass?.capacity || 0;

    const classEnrolledStudents = this.enrolledStudents.filter(
      (enrolledStudent) =>
        enrolledStudent.module === enrollmentRequest.module &&
        enrolledStudent.class === enrollmentRequest.class
    ).length;

    if (classEnrolledStudents >= classCapacity) {
      return true;
    }
    return false;
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    );

    if (this.hasStudentAlreadyEnrolled(student)) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }
    if (this.hasStudentBelowMinimiumAge(enrollmentRequest)) {
      throw new Error("Student below minimum age");
    }
    if (this.hasOverCapacity(enrollmentRequest)) {
      throw new Error("Class is over capacity");
    }

    this.enrolledStudents.push(enrollmentRequest);

    return this.generateEnrollCode(enrollmentRequest);
  }

  data = {
    levels: [
      {
        code: "EF1",
        description: "Ensino Fundamental I",
      },
      {
        code: "EF2",
        description: "Ensino Fundamental II",
      },
      {
        code: "EM",
        description: "Ensino Médio",
      },
    ],
    modules: [
      {
        level: "EF1",
        code: "1",
        description: "1o Ano",
        minimumAge: 6,
        price: 15000,
      },
      {
        level: "EF1",
        code: "2",
        description: "2o Ano",
        minimumAge: 7,
        price: 15000,
      },
      {
        level: "EF1",
        code: "3",
        description: "3o Ano",
        minimumAge: 8,
        price: 15000,
      },
      {
        level: "EF1",
        code: "4",
        description: "4o Ano",
        minimumAge: 9,
        price: 15000,
      },
      {
        level: "EF1",
        code: "5",
        description: "5o Ano",
        minimumAge: 10,
        price: 15000,
      },
      {
        level: "EF2",
        code: "6",
        description: "6o Ano",
        minimumAge: 11,
        price: 14000,
      },
      {
        level: "EF2",
        code: "7",
        description: "7o Ano",
        minimumAge: 12,
        price: 14000,
      },
      {
        level: "EF2",
        code: "8",
        description: "8o Ano",
        minimumAge: 13,
        price: 14000,
      },
      {
        level: "EF2",
        code: "9",
        description: "9o Ano",
        minimumAge: 14,
        price: 14000,
      },
      {
        level: "EM",
        code: "1",
        description: "1o Ano",
        minimumAge: 15,
        price: 17000,
      },
      {
        level: "EM",
        code: "2",
        description: "2o Ano",
        minimumAge: 16,
        price: 17000,
      },
      {
        level: "EM",
        code: "3",
        description: "3o Ano",
        minimumAge: 17,
        price: 17000,
      },
    ],
    classes: [
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
      },
    ],
  };
}
