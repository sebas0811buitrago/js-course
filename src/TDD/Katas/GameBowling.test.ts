import Game from './GameBowling';

const fakeRollScoresNoBonuses = [
  8, 1, 6, 1, 6, 0, 6, 1, 5, 4, 7, 2, 8, 1, 2, 0, 7, 1, 4, 3
];

describe('GameBowling', () => {
  test('score of the frame should be the sum of the number of PINS knocked down in each roll', () => {
    const rollsScores = fakeRollScoresNoBonuses;

    const game = new Game();

    rollsScores.forEach((score) => game.roll(score), []);

    expect(game.score()).toBe(rollsScores.reduce((acc, num) => acc + num, 0));
  });
  test("shouldn't allow to roll the bowl more than 10 frames ", async () => {
    const rollsScores = [...fakeRollScoresNoBonuses, 10];

    const game = new Game();

    expect(() => {
      rollsScores.forEach((score) => game.roll(score), []);
    }).toThrowError();
  });
  test('Should get the right scores for each round', () => {
    const rollsScores = fakeRollScoresNoBonuses;

    const game = new Game();

    rollsScores.forEach((score) => game.roll(score), []);

    expect(game.getFrameScore(1)).toEqual([
      fakeRollScoresNoBonuses[0],
      fakeRollScoresNoBonuses[1],
      0
    ]);
    expect(game.getFrameScore(2)).toEqual([
      fakeRollScoresNoBonuses[2],
      fakeRollScoresNoBonuses[3],
      0
    ]);
  });
  test('Should start a new  frame when user strikes ( knocks down all 10 pins on his first roll) ', () => {
    const game = new Game();

    const firstRoll = 10;
    const secondRoll = 3;
    const thirdRoll = 1;

    // frame 1
    game.roll(firstRoll);
    // frame 2
    game.roll(secondRoll);
    game.roll(thirdRoll);

    expect(game.getFrameScore(1)).toEqual([firstRoll, 0, 0]);
    expect(game.getFrameScore(2)).toEqual([
      secondRoll,
      thirdRoll,
      secondRoll + thirdRoll
    ]);
  });

  test('Should add bonus (value of the next two rolls) in the next frame when strikes (knocks down all 10 pins on his first roll)) ', () => {
    const game = new Game();
    const firstRoll = 10;
    const secondRoll = 3;
    const thirdRoll = 1;

    // frame 1
    game.roll(firstRoll);
    // frame 2
    game.roll(secondRoll);
    game.roll(thirdRoll);

    expect(game.score()).toBe(firstRoll + (secondRoll + thirdRoll) * 2);
  });

  test('Should add bonus (value of the next roll) in the next frame when spare (knocks down all 10 pins in two rolls) ', () => {
    const game = new Game();
    const firstRoll = 2;
    const secondRoll = 8;
    const thirdRoll = 7;
    const FourthRoll = 1;

    // frame 1

    game.roll(firstRoll);
    game.roll(secondRoll);

    // frame 2
    game.roll(thirdRoll);
    game.roll(FourthRoll);

    expect(game.score()).toBe(
      firstRoll + secondRoll + (thirdRoll * 2 + FourthRoll)
    );
  });
});
