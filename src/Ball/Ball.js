export default class Ball {
  constructor(gravity, coefficientOfRestitution, initX, initY, initXVelocity, initYVelocity) {
    this.radius = 10;
    this.gravity = gravity;
    this.coefficientOfRestitution = coefficientOfRestitution;
    this.x = initX;
    this.y = initY;
    this.xVelocity = initXVelocity;
    this.yVelocity = initYVelocity;
  }

  draw(canvas) {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'blue';
    context.fill();
  }

  calculateNewPosition(maxHeight) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.y + this.radius > maxHeight) {
      this.bounce(maxHeight);
    }
  }

  applyGravity() {
    this.yVelocity += this.gravity;
  }

  bounce(maxHeight) {
    this.yVelocity = - (this.yVelocity * this.coefficientOfRestitution);

    // fix the y position to be above the bottom of the canvas
    const distanceBelowBottom = this.y + this.radius - maxHeight;
    this.y = maxHeight - this.radius - distanceBelowBottom;
  }

  tick(canvas) {
    this.applyGravity();
    this.calculateNewPosition(canvas.height);
    this.draw(canvas);
  }
}
