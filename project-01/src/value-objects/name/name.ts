import NameError from './name.error';

export default class Name {
  value: string;
  constructor(value = '') {
    if (!this.nameValidate(value)) {
      throw new NameError();
    }
    this.value = value;
  }

  private nameValidate(name: string) {
    const validNameRegex = new RegExp(/^([A-Za-z]+ )+([A-Za-z])+$/);
    return validNameRegex.test(name);
  }
}
