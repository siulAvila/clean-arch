import Enrollment from "../../entity/enrollment";

export default interface EnrollmentRepositoryInterface {
  save(enrollment: Enrollment): void;
  findAll(): Enrollment[];
  findByCpf(cpf: string): any;
  findAllByClass(module: string, classroom: string, level: string): Enrollment[];
  count(): number;
}
