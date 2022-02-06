import Classroom from "./entity/classroom";
import Enrollment from "./entity/enrollment";
import Module from "./entity/modules";
import Student from "./entity/student";
import ClassroomRepositoryInteface from "./repository/classroom/classroom.repository.interface";
import EnrollmentRepositoryInterface from "./repository/enrollment/enrollment.repository.interface";
import LevelRepositoryInterface from "./repository/level/level.repository.interface";
import ModuleRepositoryInteface from "./repository/module/module.repository.interface";

export default class EnrollStudent {
  constructor(
    private levelRepository: LevelRepositoryInterface,
    private classroomRepository: ClassroomRepositoryInteface,
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

  private checkStudentHasMinimiumAge(module: Module, student: Student) {
    const studentAge = student.getAge();
    const minimumAge = module.minimumAge;

    if (studentAge < minimumAge) {
      throw new Error("Student below minimum age");
    }
  }

  private checkOverCapacity(clazz: Classroom, level: any, module: Module) {
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

  private checkIfClassIsAlreadyFinished(clazz: Classroom): boolean {
    const today = new Date().getTime();
    const classEndDate = new Date(clazz.endDate).getTime()
    if (today > classEndDate) {
      throw new Error("Class is already finished");
    }
    return false;
  }

  private checkIfClassIsAlreadyStarted(clazz: Classroom): boolean {
    const MILISECONDS_PER_SECOND = 1000;
    const SECONDS_PER_HOUR = 3600;
    const HOURS_PER_DAY = 24;
    const MILISECONDS_PER_DAY = MILISECONDS_PER_SECOND * SECONDS_PER_HOUR * HOURS_PER_DAY
    const todayInTime = new Date().getTime();
    const classEndDateInTime = new Date(clazz.endDate).getTime()
    const classStartDateInTime = new Date(clazz.startDate).getTime()

    const classTotalOfDays = (classEndDateInTime - classStartDateInTime) / MILISECONDS_PER_DAY;
    const daysBetweenEnrollAndStartOfClass = (todayInTime - classStartDateInTime) / MILISECONDS_PER_DAY;
    const checkPercentageOfClass = (daysBetweenEnrollAndStartOfClass * 100) / classTotalOfDays

    if (checkPercentageOfClass > 25) {
      throw new Error("Class is already started");
    }
    return false;
  }

  private generateInvoices({ price }: Module, installments: number): any {

    const invoceValue = price / installments;
    const roundedValue = Math.floor(invoceValue);
    const rest = price - (roundedValue * installments);

    const invoices = new Array(installments).fill(null).map((_, index) => {
      const instalment = index + 1;
      return {
        instalment,
        value: instalment === installments ? roundedValue + rest : roundedValue
      }
    });
    return invoices
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
    const clazz = this.classroomRepository.getByCode(enrollmentRequest.class);
    const level = this.levelRepository.getByCode(enrollmentRequest.level);
    const module = this.moduleRepository.getByCode(
      enrollmentRequest.module,
      level.code
    );
    this.checkStudentHasMinimiumAge(module, student);
    this.checkOverCapacity(clazz, level, module);
    this.checkStudentAlreadyEnrolled(student);
    this.checkIfClassIsAlreadyFinished(clazz);
    this.checkIfClassIsAlreadyStarted(clazz);
    const enrollCode = this.generateEnrollCode(enrollmentRequest);
    const invoices = this.generateInvoices(module, enrollmentRequest.installments)
    const enrollment = new Enrollment(
      {
        student,
        level: enrollmentRequest.level,
        module: enrollmentRequest.module,
        clazz: enrollmentRequest.class,
        code: enrollCode,
        invoices
      }
    );

    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
