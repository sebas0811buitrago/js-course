const sum = (a: number, b: number) => {
  return a - b;
};

describe('Sum', () => {
  test.only('Should sum positive numbers correctly ', () => {
    // arrange
    const a = 3;
    const b = 5;
    // act
    const result = sum(a, b);
    //assert

    expect(result).toBe(8);
  });

  test('Should sum negative numbers correctly ', () => {
    // arrange
    const a = -3;
    const b = -5;
    // act
    const result = sum(a, b);
    //assert

    expect(result).toBe(-8);
  });
});
