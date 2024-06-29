interface LocationRover {
  x: number;
  y: number;
}

type Direction = 'N' | 'S' | 'E' | 'W';

type Movement = 'f' | 'b' | 'r' | 'l';

class MarsRover {
  private location;
  private direction;
  constructor(location: LocationRover, direction: Direction) {
    this.location = location;
    this.direction = direction;
  }

  getLocation() {
    return this.location;
  }

  getDirection() {
    return this.direction;
  }

  movement(movements: Array<Movement>) {
    movements.forEach((movement) => {
      if (movement === 'f') {
        this.location.y--;
      }
    });
  }
}

describe('MarsRover', () => {
  test('Rover Should initialize with an starting point (x, y) and with a direction (N,S,E,W)', () => {
    const location = {
      x: 2,
      y: 3,
    };
    const direction = 'N';
    const rover = new MarsRover(location, direction);

    expect(rover.getLocation()).toEqual(location);
    expect(rover.getDirection()).toBe(direction);
  });

  test("The rover receives an array of commands. for example = ['f'] and Implement commands that move the rover forward (f).", () => {
    const movements = ['f'] as Movement[];
    const location = {
      x: 2,
      y: 3,
    };
    const direction = 'N';

    const rover = new MarsRover(location, direction);
    rover.movement(movements);

    expect(rover.getLocation()).toEqual({
      x: 2,
      y: 2,
    });
  });

  test("The rover receives an array of commands. for example = ['f'] and Implement commands that move the rover forward (f).", () => {
    const movements = ['f'] as Movement[];
    const location = {
      x: 2,
      y: 3,
    };

    const direction = 'E';

    const rover = new MarsRover(location, direction);
    rover.movement(movements);

    expect(rover.getLocation()).toEqual({
      x: 3,
      y: 3,
    });
  });
});
