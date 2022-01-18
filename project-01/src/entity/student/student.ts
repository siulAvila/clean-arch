import CPF from "../../value-objects/cpf/cpf";
import Name from "../../value-objects/name/name";

export default class Student {
  private _name: Name;
  private _cpf: CPF;
  birthDate: Date;
  constructor({ name, cpf, birthDate }: { name: string, cpf: string, birthDate: string }) {
    this._name = new Name(name);
    this._cpf = new CPF(cpf);
    this.birthDate = new Date(birthDate);
  }

  getAge() {
    return new Date().getFullYear() - this.birthDate.getFullYear();
  }

  get name(): string {
    return this._name.value
  }

  get cpf(): string {
    return this._cpf.value
  }
}
