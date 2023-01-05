import { c } from "../core/Engine.js";
import Vector2 from "../utils/Vector2.js";

export default class Particle {
  constructor({
    vector = Vector2.ONE,
    radius = 5,
    color = `hsl(${Math.random() * 360}, 75%, 50%)`,
    velocity = Vector2.ZERO,
    alpha = 1,
    alphaUpdate = 0.01,
    gravity = 0.09,
    friction = 0.99,
    extraSpeed = 1,
  }) {
    this.vector = vector;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;

    this.gravity = gravity;
    this.friction = friction;
    this.extraSpeed = extraSpeed;

    //Fading
    this.alpha = alpha;
    this.alphaUpdate = alphaUpdate;
  }

  Update() {
    this.alpha -= this.alphaUpdate;

    this.velocity.y += this.gravity;
    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;
    this.vector.x += this.velocity.x * this.extraSpeed;
    this.vector.y += this.velocity.y * this.extraSpeed;
  }

  Render() {
    c.save();

    c.beginPath();
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;
    c.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2, false);
    c.fill();

    c.closePath();
    c.restore();
  }
}
