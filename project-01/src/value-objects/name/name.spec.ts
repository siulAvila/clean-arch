import Name from './name';
import NameError from './name.error';

it('should throw a error for a invalid name', () => {
  expect(() => new Name('Jose')).toThrow(new NameError().message);
});

it('should throw a error for a invalid name', () => {
  expect(() => new Name('Ana Silva')).not.toThrow(new NameError().message);
});