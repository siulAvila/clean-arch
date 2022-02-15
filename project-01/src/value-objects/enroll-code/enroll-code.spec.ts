import { EnrollCode } from "./enroll-code";

it('should return enroll code', () => {
    const date = new Date();
    const expectedValue = `${date.getFullYear()}1230002`
    expect(new EnrollCode('1', '2', '3', date, 2).value).toEqual(expectedValue);
});
