import CPFError from "./cpf.error";

export default class CPF {
  private FACTOR_DIGIT_1 = 10;
  private FACTOR_DIGIT_2 = 11;
  private MAX_DIGITS_1 = 9;
  private MAX_DIGITS_2 = 10;

  value: string;

  constructor(value = "") {
    if (!this.cpfValidate(value)) {
      throw new CPFError();
    }
    this.value = value;
  }

  private cpfValidate(str = "") {
    let cpf = this.extractDigits(str);
    if (this.invalidLength(cpf) || this.isInBlackList(cpf)) {
      return false;
    }
    const digit1 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_1,
      this.MAX_DIGITS_1
    );
    const digit2 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_2,
      this.MAX_DIGITS_2
    );
    let calculatedCheckDigit = `${digit1}${digit2}`;
    return this.getCheckDigit(cpf) == calculatedCheckDigit;
  }

  private isInBlackList(cpf: string) {
    const firstDigit = cpf[0];
    return cpf.split("").every((c) => c === firstDigit);
  }

  private invalidLength(cpf: string) {
    return cpf.length !== 11;
  }

  private extractDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  private calculateDigit(cpf: string, factor: number, max: number) {
    let total = 0;
    for (const digit of this.convertToNumberArray(cpf).slice(0, max)) {
      total += digit * factor--;
    }
    return total % 11 < 2 ? 0 : 11 - (total % 11);
  }

  private convertToNumberArray(digits: string) {
    return [...digits].map((digit) => parseInt(digit));
  }

  private getCheckDigit(cpf: string) {
    return cpf.slice(9);
  }
}
