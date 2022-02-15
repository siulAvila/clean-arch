import Enrollment from "../../entity/enrollment";

export default interface EnrollmentRepositoryInterface {
  save(enrollment: Enrollment): void;
  findAll(): Enrollment[];
  findByCpf(cpf: string): Enrollment | undefined;
  findAllByClass(module: string, classroom: string, level: string): Enrollment[];
  count(): number;
}
