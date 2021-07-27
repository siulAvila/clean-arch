import Enrollment from "../../entity/enrollment/enrollment";
import CPF from "../../value-objects/cpf/cpf";

export default interface EnrollmentRepositoryInterface {
  save(enrollment: Enrollment): void;
  findAll(): Enrollment[];
  findByCpf(cpf: CPF): any;
  findAllByClass(module: string, clazz: string, level: string): Enrollment[];
  count(): number;
}
