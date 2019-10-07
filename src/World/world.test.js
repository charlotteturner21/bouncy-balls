import World from './World';
import Ball from '../Ball';

const mockBallTick = jest.fn();

jest.mock('../Ball', () => {
  return jest.fn().mockImplementation((gravity, coefficientOfRestitution, x) => {
    return {
      radius: 1,
      x: x,
      tick: mockBallTick,
    };
  });
});

const mockContext = {
  clearRect: jest.fn(() => {}),
};

const mockCanvas = {
  getContext: () => mockContext,
  width: 200,
  height: 200,
};

afterEach(() => {
  jest.clearAllMocks();
});

test('world initialises with correct values', () => {
  const world = new World();

  expect(world.balls.length).toBe(0);
  expect(world.gravity).toBe(0.05);
  expect(world.coefficientOfRestitution).toBe(0.8);
});

test('world.addBall() creates a ball with correct values', () => {
  const world = new World();

  world.addBall(1, 2, 3, 4);

  expect(world.balls.length).toBe(1);
  expect(Ball).toHaveBeenCalledWith(0.05, 0.8, 1, 2, 3, 4);
});

test('world.tick() ticks all balls and clears canvas', () => {
  const world = new World();

  world.addBall(1, 2, 3, 4);
  world.addBall(1, 2, 3, 4);
  world.addBall(1, 2, 3, 4);

  world.tick(mockCanvas);

  expect(mockContext.clearRect).toHaveBeenCalledTimes(1);
  expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 200, 200);
  expect(mockBallTick).toHaveBeenCalledTimes(3);
});

test('world.tick() removes all balls outside of canvas', () => {
  const world = new World();

  // Negative x + radius of 1 leaves ball outside of canvas
  world.addBall(-2, 2, 3, 4);
  // x - radius of 1 greater than test canvas width of 200 leaves ball outside of canvas
  world.addBall(202, 2, 3, 4);
  world.addBall(1, 2, 3, 4);

  world.tick(mockCanvas);

  expect(world.balls.length).toBe(1);
});
