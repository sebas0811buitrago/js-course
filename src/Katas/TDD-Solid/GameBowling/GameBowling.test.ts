import GameV2 from './GameBowlingVersion2';

// prettier-ignore
const fakeRollScoresNoBonuses = [
  5, 3, // Frame 1
  6, 1, // Frame 2 
  6, 0, // Frame 3
  7, 3, // Frame 4
  5, 4, // Frame 5
  7, 2, // Frame 6
  8, 1, // Frame 7
  2, 0, // Frame 8
  7, 1, // Frame 8
  4, 3  // Frame 10
];

// class GameV2 {
//   noFrame = 10;

//   roll(roll: number) {
//     console.log(roll);

//     this.noFrame;
//   }

//   getScore() {
//     return 100;
//   }
// }

describe('GameBowling', () => {
  test('score of the frame should be the sum of the number of PINS knocked down in each roll', () => {
    const rollsScores = fakeRollScoresNoBonuses;
    const game = new GameV2();
    rollsScores.forEach((score) => game.roll(score), []);
    expect(game.getScore()).toBe(
      rollsScores.reduce((acc, num) => acc + num, 0),
    );
  });

  test('Should get the right scores for each frame', () => {
    const rollsScores = fakeRollScoresNoBonuses;
    const game = new GameV2();
    rollsScores.forEach((score) => game.roll(score), []);

    expect(game.getFrameRolls(1)).toEqual([
      fakeRollScoresNoBonuses[0],
      fakeRollScoresNoBonuses[1],
    ]);
    expect(game.getFrameRolls(2)).toEqual([
      fakeRollScoresNoBonuses[2],
      fakeRollScoresNoBonuses[3],
    ]);
  });
  test('Should start a new  frame when user strikes ( knocks down all 10 pins on his first roll) ', () => {
    const game = new GameV2();
    const firstRoll = 10;
    const secondRoll = 3;
    const thirdRoll = 1;
    // frame 1
    game.roll(firstRoll);

    // frame 2
    game.roll(secondRoll);
    game.roll(thirdRoll);

    expect(game.getFrameRolls(1)).toEqual([firstRoll]);
    expect(game.getFrameRolls(2)).toEqual([secondRoll, thirdRoll]);
  });
  test('Should add bonus (value of the next two rolls) in the next frame when strikes (knocks down all 10 pins on his first roll)) ', () => {
    const game = new GameV2();
    const firstRoll = 10;
    const secondRoll = 3;
    const thirdRoll = 1;
    // frame 1 => Strike
    game.roll(firstRoll);
    // frame 2 => Frame with bonus
    game.roll(secondRoll);
    game.roll(thirdRoll);
    expect(game.getScore()).toBe(firstRoll + (secondRoll + thirdRoll) * 2);
  });
  test('Should add bonus (value of the next roll) in the next frame when spare (knocks down all 10 pins in two rolls) ', () => {
    const game = new GameV2();
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
    expect(game.getScore()).toBe(
      firstRoll + secondRoll + (thirdRoll * 2 + FourthRoll),
    );
  });

  // Optional
  // test("shouldn't allow to roll the bowl more than 10 frames ", async () => {
  //   const rollsScores = [...fakeRollScoresNoBonuses, 10];
  //   const game = new GameV2();
  //   expect(() => {
  //     rollsScores.forEach((score) => game.roll(score), []);
  //   }).toThrowError();
  // });
});
