import CPF from '../cpf/cpf';
import Name from '../name/name';

export default class Student {
  private _name: Name;
  private _cpf: CPF;
  constructor(name: string, cpf: string) {
    this._name = new Name(name);
    this._cpf = new CPF(cpf);
  }

  get name() {
    return this._name.value;
  }

  get cpf() {
    return this._cpf.value;
  }
}
