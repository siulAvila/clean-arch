import Enrollment from "../../entity/enrollment/enrollment";

export default interface EnrollmentRepositoryInterface {
  save(enrollment: Enrollment): void;
  findAll(): Enrollment[];
  findByCpf(cpf: string): any;
  findAllByClass(module: string, clazz: string, level: string): Enrollment[];
  count(): number;
}
