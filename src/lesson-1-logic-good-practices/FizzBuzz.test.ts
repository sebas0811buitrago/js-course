import fizzBuzz from './FizzBuzz';

describe('fizzBuzz', () => {
  it("should return 'Fizz' for multiples of 3", () => {
    expect(fizzBuzz(3)).toBe('Fizz');
    expect(fizzBuzz(6)).toBe('Fizz');
    expect(fizzBuzz(9)).toBe('Fizz');
  });

  it("should return 'Buzz' for multiples of 5", () => {
    expect(fizzBuzz(5)).toBe('Buzz');
    expect(fizzBuzz(10)).toBe('Buzz');
    expect(fizzBuzz(20)).toBe('Buzz');
  });

  it("should return 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
    expect(fizzBuzz(30)).toBe('FizzBuzz');
    expect(fizzBuzz(45)).toBe('FizzBuzz');
  });

  it('should return the number itself for numbers not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe(1);
    expect(fizzBuzz(2)).toBe(2);
    expect(fizzBuzz(4)).toBe(4);
    expect(fizzBuzz(7)).toBe(7);
  });

  it('should handle negative numbers', () => {
    expect(fizzBuzz(-3)).toBe('Fizz');
    expect(fizzBuzz(-5)).toBe('Buzz');
    expect(fizzBuzz(-15)).toBe('FizzBuzz');
    expect(fizzBuzz(-1)).toBe(-1);
  });

  it('should handle zero', () => {
    expect(fizzBuzz(0)).toBe(0);
  });
});
