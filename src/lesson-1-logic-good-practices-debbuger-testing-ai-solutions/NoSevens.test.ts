import { noSevens } from './NoSevens';

// The Kingdom of Zumbania recently banned the number 7.
//  Please print all the numbers from 1 to 50 but skip all multiples of 7.
//  Also, skip any number that has a 7 in it, such as 27.

function holaMundo() {
  console.log('holaMundo');
}

holaMundo();

for (let i = 1; i <= 50; i++) {
  const number = noSevens(i);
  if (number === null) continue;
  console.log(number);
}

describe('NoSevens', () => {
  test('Should return 0 if 0 is provided', () => {
    expect(noSevens(0)).toBe(0);
  });

  test('Should return null if the number is multiple of 7', () => {
    expect(noSevens(7)).toBe(null);
    expect(noSevens(14)).toBe(null);
  });

  test('Should return null if the number is has a 7 in it', () => {
    expect(noSevens(37)).toBe(null);
    expect(noSevens(71)).toBe(null);
  });

  test('Should return the number if is not multiple or doesnt contain 7', () => {
    expect(noSevens(1)).toBe(1);
    expect(noSevens(2)).toBe(2);
  });
  test('Should return also work with negative numbers', () => {
    expect(noSevens(-2)).toBe(-2);
    expect(noSevens(-7)).toBe(null);
    expect(noSevens(-72)).toBe(null);
  });
});
