const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

function validate(str = '') {
  let cpf = extractDigits(str);
  if (invalidLength(cpf) || isInBlackList(cpf)) {
    return false;
  }
  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
  let calculatedCheckDigit = `${digit1}${digit2}`;
  return getCheckDigit(cpf) == calculatedCheckDigit;
}

function isInBlackList(cpf: string) {
  const firstDigit = cpf[0];
  return cpf.split('').every((c) => c === firstDigit);
}

function invalidLength(cpf: string) {
  return cpf.length !== 11;
}

function extractDigits(cpf: string) {
  return cpf.replace(/\D/g, '');
}

function calculateDigit(cpf: string, factor: number, max: number) {
  let total = 0;
  for (const digit of convertToNumberArray(cpf).slice(0, max)) {
    total += digit * factor--;
  }
  return total % 11 < 2 ? 0 : 11 - (total % 11);
}

function convertToNumberArray(digits: string) {
  return [...digits].map((digit) => parseInt(digit));
}

function getCheckDigit(cpf: string) {
  return cpf.slice(9);
}

console.log(validate('00000000000'));
console.log(validate('86446422784'));
console.log(validate('864.464.227-84'));
console.log(validate('91720489726'));
console.log(validate('344858610-23'));
