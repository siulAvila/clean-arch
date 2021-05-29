import CPF from './cpf';
import CPFError from './cpf.error';

it('should throw a error for a invalid name', () => {
  expect(() => new CPF('123.456.789-10')).toThrow(new CPFError().message);
});
