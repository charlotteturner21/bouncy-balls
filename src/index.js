import World from './World';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    // this.canvas = document.createElement('canvas');

    this.world = new World(this.canvas);
    this.click = this.click.bind(this);
    this.tick = this.tick.bind(this);

    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight - 50;
    this.canvas.addEventListener('click', this.click, false);
    setInterval(this.tick, 10);
  }

  tick() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.world.tick(this.canvas);
  }

  click(event) {
    this.world.addBall(event.clientX, event.clientY, Math.random() * 10 - 5, Math.random() * 10 - 5);
  }
}

new App();
