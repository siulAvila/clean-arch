import Enrollment from "./entity/enrollment";
import Student from "./entity/student";
import ClassRepositoryInteface from "./repository/class/class.repository.interface";
import EnrollmentRepositoryInterface from "./repository/enrollment/enrollment.repository.interface";
import LevelRepositoryInterface from "./repository/level/level.repository.interface";
import ModuleRepositoryInteface from "./repository/module/module.repository.interface";

export default class EnrollStudent {
  constructor(
    private levelRepository: LevelRepositoryInterface,
    private classRepository: ClassRepositoryInteface,
    private moduleRepository: ModuleRepositoryInteface,
    private enrollmentRepository: EnrollmentRepositoryInterface
  ) { }

  private checkStudentAlreadyEnrolled(student: Student) {
    const hasAlreadyEnrolled = this.enrollmentRepository.findByCpf(student.cpf);
    if (hasAlreadyEnrolled) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }
  }

  private generateEnrollCode({ level, module, class: className }: any) {
    const currentYear = new Date().getFullYear();
    const count = this.enrollmentRepository.count();
    const sequence = `${count + 1}`.padStart(4, "0");
    return `${currentYear}${level}${module}${className}${sequence}`;
  }

  private checkStudentHasMinimiumAge(module: any, student: Student) {
    const studentAge = student.getAge();
    const minimumAge = module.minimumAge;

    if (studentAge < minimumAge) {
      throw new Error("Student below minimum age");
    }
  }

  private checkOverCapacity(clazz: any, level: any, module: any) {
    const classCapacity = clazz.capacity;

    const studentEnrolledInClass = this.enrollmentRepository.findAllByClass(
      module.code,
      clazz.code,
      level.code
    ).length;
    if (studentEnrolledInClass === classCapacity) {
      throw new Error("Class is over capacity");
    }
  }

  execute(enrollmentRequest: any) {
    const { name, cpf, birthDate } = enrollmentRequest.student;
    const student = new Student(
      {
        name,
        cpf,
        birthDate
      }
    );
    const clazz = this.classRepository.getByCode(enrollmentRequest.class);
    const level = this.levelRepository.getByCode(enrollmentRequest.level);
    const module = this.moduleRepository.getByCode(
      enrollmentRequest.module,
      level.code
    );
    this.checkStudentHasMinimiumAge(module, student);
    this.checkOverCapacity(clazz, level, module);
    this.checkStudentAlreadyEnrolled(student);
    const enrollCode = this.generateEnrollCode(enrollmentRequest);
    const enrollment = new Enrollment(
      {
        student,
        level: enrollmentRequest.level,
        module: enrollmentRequest.module,
        clazz: enrollmentRequest.class,
        code: enrollCode
      }
    );

    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
