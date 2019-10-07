import Ball from './Ball';

const mockContext = {
  beginPath: jest.fn(() => {}),
  arc: jest.fn(() => {}),
  fill: jest.fn(() => {}),
};

const mockCanvas = {
  getContext: () => mockContext,
  width: 200,
  height: 200,
};

afterEach(() => {
  jest.clearAllMocks();
});

test('ball.tick() updates position and yVelocity', () => {
  const ball = new Ball(0.5, 0.5, 100, 100, 2, 2);
  ball.tick(mockCanvas);

  expect(ball.x).toBe(102);
  expect(ball.y).toBe(102.5);
  expect(ball.xVelocity).toBe(2);
  expect(ball.yVelocity).toBe(2.5);
});

test('ball.tick() draws ball at correct position', () => {
  const ball = new Ball(0.5, 0.5, 100, 100, 2, 2);
  ball.tick (mockCanvas);

  expect(mockContext.beginPath).toHaveBeenCalledTimes(1);
  expect(mockContext.arc).toHaveBeenCalledTimes(1);
  // with gravity, y position should be 0.5 further down than just using yVelocity
  expect(mockContext.arc).toHaveBeenCalledWith(102, 102.5, ball.radius, 0, 2 * Math.PI, false);
  expect(mockContext.fill).toHaveBeenCalledTimes(1);

  expect(mockContext.fillStyle).toBe('blue');
});

test('ball.tick() when ball should bounce updates yVelocity and position', () => {
  // 189 with a velocity of 2 will put the edge of the ball outside of the 200x200 test area (radius 10)
  const ball = new Ball(0.5, 0.5, 100, 189, 2, 2);
  ball.tick(mockCanvas);

  expect(ball.x).toBe(102);
  expect(ball.y).toBe(188.5); // 191 is 1 pixel lower than the bottom so should be left 1 pixel above the bottom
  expect(ball.xVelocity).toBe(2);
  expect(ball.yVelocity).toBe(-1.25); // coefficient of restitution of 0.5 should halve the velocity after the bounce
});
