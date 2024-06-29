// import fizzBuzz from './FizzBuzz';

const fizzBuzzConditions = [
  {
    name: 'Fizz',
    module: 3,
  },
  {
    name: 'Buzz',
    module: 5,
  },
  {
    name: 'Wazz',
    module: 7,
  },
  {
    name: 'XYZ',
    module: 9,
  },
];

const fizzBuzz = (number: number) => {
  if (number === 0) return 0;
  // if (number % 3 === 0 && number % 5 === 0) return 'FizzBuzz';
  // if (number % 3 === 0) return 'Fizz';
  // if (number % 5 === 0) return 'Buzz';

  const result = fizzBuzzConditions.reduce((result, { module, name }) => {
    return number % module === 0 ? (result = result + name) : result;
    // total = total + current;
  }, '');

  return result ? result : number;
};

// Wazz  => 7
// XYZ => 9

describe('fizzBuzz', () => {
  it('should handle zero', () => {
    expect(fizzBuzz(0)).toBe(0);
  });
  it("should return 'Fizz' for multiples of 3", () => {
    expect(fizzBuzz(3)).toBe('Fizz');
    expect(fizzBuzz(6)).toBe('Fizz');
  });

  it("should return 'Buzz' for multiples of 5", () => {
    expect(fizzBuzz(5)).toBe('Buzz');
    expect(fizzBuzz(10)).toBe('Buzz');
    expect(fizzBuzz(20)).toBe('Buzz');
  });

  it("should return 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
    expect(fizzBuzz(30)).toBe('FizzBuzz');
  });

  it('should return the number itself for numbers not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe(1);
    expect(fizzBuzz(2)).toBe(2);
    expect(fizzBuzz(4)).toBe(4);
  });

  it('should handle negative numbers', () => {
    expect(fizzBuzz(-3)).toBe('Fizz');
    expect(fizzBuzz(-5)).toBe('Buzz');
    expect(fizzBuzz(-15)).toBe('FizzBuzz');
    expect(fizzBuzz(-1)).toBe(-1);
  });

  it("should return 'BuzzWazz' for multiples of 5 and 7", () => {
    expect(fizzBuzz(35)).toBe('BuzzWazz');
  });

  it("should return 'FizzBuzzXYZ' for multiples of 5 and 7", () => {
    expect(fizzBuzz(45)).toBe('FizzBuzzXYZ');
  });
});
