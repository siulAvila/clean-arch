import CPF from "../../value-objects/cpf/cpf";
import Name from "../../value-objects/name/name";

export default class Student {
  name: Name;
  cpf: CPF;
  birthDate: string;
  constructor(name: string, cpf: string, birthDate: string) {
    this.name = new Name(name);
    this.cpf = new CPF(cpf);
    this.birthDate = birthDate;
  }
}
