export class Frame {
  private rolls: number[] = [];
  private previousFrame;
  private maxRollRetries = 2;

  constructor(previousFrame?: Frame) {
    this.previousFrame = previousFrame;
  }

  roll(pins: number) {
    this.rolls.push(pins);
  }

  hasFrameFinished() {
    const isFirstRoll = this.rolls.length === 1;
    if (isFirstRoll && this.isStrike(this.rolls.at(0) ?? 0)) {
      return true;
    }

    const maxRetriesReached = this.rolls.length === this.maxRollRetries;
    if (maxRetriesReached) return true;

    return false;
  }

  isStrike(pins: number) {
    return pins === 10;
  }

  isSpare(pinsFirsRoll: number, pinsSecondRoll: number) {
    return pinsFirsRoll + pinsSecondRoll === 10;
  }

  haveStrikeBonus() {
    if (!this.previousFrame) return;

    const firstRoll = this.previousFrame.getRolls()?.[0];
    if (this.isStrike(firstRoll)) return true;

    return false;
  }

  haveSpareBonus() {
    if (!this.previousFrame) return;

    const firstRoll = this.previousFrame.getRolls()?.[0];
    const secondRoll = this.previousFrame.getRolls()?.[1];
    if (this.isSpare(firstRoll, secondRoll)) return true;

    return false;
  }

  getBonus() {
    const firstRoll = this.getRolls()?.[0];
    const secondRoll = this.getRolls()?.[1];
    if (this.haveStrikeBonus()) {
      return firstRoll + secondRoll;
    }

    if (this.haveSpareBonus()) {
      return firstRoll;
    }

    return 0;
  }

  getRolls() {
    return this.rolls;
  }

  getScore() {
    const bareScore = this.rolls.reduce(
      (totalScore, rollScore) => (totalScore = totalScore + rollScore),
      0,
    );

    return bareScore + this.getBonus();
  }
}

class GameV2 {
  private frames: Frame[] = [];
  private maxFramesLenght = 10;

  roll(pins: number) {
    const lastFrame = this.frames.at(-1);

    const shouldCreateNewFrame =
      this.frames.length === 0 || lastFrame?.hasFrameFinished();

    if (shouldCreateNewFrame && this.frames.length === this.maxFramesLenght)
      throw Error('10 max allowed frames');

    if (shouldCreateNewFrame) {
      const newFrame = new Frame(lastFrame);
      this.frames.push(newFrame);

      newFrame.roll(pins);
      return;
    }

    lastFrame?.roll(pins);
  }

  getScore() {
    return this.frames.reduce(
      (totalScore, frame) => (totalScore = totalScore + frame.getScore()),
      0,
    );
  }

  getFrameRolls(frameNumber: number) {
    return this.frames.at(frameNumber - 1)?.getRolls();
  }
}

export default GameV2;
