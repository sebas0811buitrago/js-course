const FIRST_FRAME = 1;

// class Frame {
//   private firstScore = null;
//   private secondScore = null;
//   private bonusStrike = null;
//   private bonusSpare = null;

//   score() {
//     return (
//       (this.firstScore ?? 0) +
//       (this.secondScore ?? 0) +
//       (this.bonusSpare ?? 0) +
//       (this.bonusStrike ?? 0)
//     );
//   }
// }

class Game {
  private pins = 10;
  private frames = 10;
  private scoreGame = new Map<number, [number, number | null, number]>();
  private frame = 0;

  spare(firstScore: number, secondScore: number) {
    if (firstScore === this.pins) return false;
    if (firstScore + secondScore === this.pins) return true;
    return false;
  }

  strike(frameScore: number) {
    return frameScore === this.pins;
  }

  getBonusSpare(frameScore: number) {
    const previousFrameFirstRollScore = this.scoreGame.get(this.frame - 1)?.[0];
    const previousFrameSecondRollScore = this.scoreGame.get(
      this.frame - 1,
    )?.[1];

    if (
      this.spare(
        previousFrameFirstRollScore ?? 0,
        previousFrameSecondRollScore ?? 0,
      )
    ) {
      return frameScore;
    }

    return 0;
  }

  getBonusStrike(frameScore: number) {
    if (this.frame === FIRST_FRAME) return 0;

    const previousFrameFirstRollScore = this.scoreGame.get(this.frame - 1)?.[0];

    if (this.strike(previousFrameFirstRollScore ?? 0)) return frameScore;

    return 0;
  }

  startNewframe(frameScore: number) {
    this.frame++;

    this.scoreGame.set(this.frame, [
      frameScore,
      this.strike(frameScore) ? 0 : null,
      (this.strike(frameScore) ? this.getBonusStrike(frameScore) : 0) +
        this.getBonusSpare(frameScore),
    ]);
  }

  secondChanceScore(scoreSecondChance: number) {
    const scoreFirstChance = this.scoreGame.get(this.frame)?.[0] ?? 0;
    const bonusFirstChance = this.scoreGame.get(this.frame)?.[2] ?? 0;
    this.scoreGame.set(this.frame, [
      scoreFirstChance,
      scoreSecondChance,
      this.getBonusStrike(scoreFirstChance + scoreSecondChance) +
        bonusFirstChance,
    ]);
  }

  roll(frameScore: number) {
    const hasframeFinished = this.scoreGame.get(this.frame)?.[1] !== null;

    const isFinalframe = this.frame == this.frames;
    if (isFinalframe && hasframeFinished) throw new Error('max frames reached');

    if (hasframeFinished) {
      this.startNewframe(frameScore);
      return;
    }

    this.secondChanceScore(frameScore);
  }

  score() {
    const values = Array.from(this.scoreGame.values());
    return values.reduce(
      (totalScore, [scoreFirstChance, secondChanceScore, bonus]) =>
        totalScore + bonus + scoreFirstChance + (secondChanceScore ?? 0),
      0,
    );
  }

  getFrameScore(frame: number) {
    return this.scoreGame.get(frame);
  }

  getAllScores() {
    return this.scoreGame;
  }
}

export default Game;
