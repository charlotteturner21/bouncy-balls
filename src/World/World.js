import Ball from "../Ball";

export default class World {
  constructor() {
    this.balls = [];
    this.gravity = 0.05; // Arbitrary value based on natural feeling
    this.coefficientOfRestitution = 0.8; // Arbitrary value to ensure many bounces
  }

  tick(canvas) {
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    this.balls.forEach((ball) => {
      ball.tick(canvas);
    });
    this.balls = this.balls.filter((ball) => ball.x + ball.radius >= 0 && ball.x - ball.radius < canvas.width);
  };

  addBall(x, y, xVelocity, yVelocity) {
    this.balls.push(new Ball(this.gravity, this.coefficientOfRestitution, x, y, xVelocity, yVelocity));
  }
}
