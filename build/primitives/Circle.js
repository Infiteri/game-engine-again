import { c } from "../core/Engine.js";
import Vector2 from "../utils/Vector2.js";

export default class Circle {
  constructor({
    vector,
    radius = 10,
    velocity = new Vector2(0, 0),
    color = "blue",
    gravity = 0.7,
    friction = 0.5,
  }) {
    this.type = "circle";

    this.friction = friction;
    this.vector = vector;
    this.radius = radius;
    this.color = color;
    this.gravity = gravity;
    this.velocity = velocity;
  }

  BounceOffGround() {
    this.velocity.y = -this.velocity.y * this.friction;
  }

  //TODO: ADD TO SQUARE
  _set_velocity(vector) {
    this.velocity.Set(vector);
  }

  _set_velocity_x(value) {
    this.velocity.Set(new Vector2(value, this.velocity.y));
  }

  _set_velocity_y(value) {
    this.velocity.Set(new Vector2(this.velocity.x, value));
  }

  _stop_velocity_y() {
    this.velocity.SetY(0);
  }

  _on_ground_hit() {}

  Update() {
    const canvas = document.querySelector("canvas");

    this.vector.AddVector(this.velocity);

    if (this.vector.y + this.radius + this.velocity.y <= canvas.height) {
      this.velocity.AddY(this.gravity);
    } else {
      this._on_ground_hit();
    }
  }

  Render() {
    c.beginPath();

    c.fillStyle = this.color;
    c.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2, false);
    c.fill();

    c.closePath();
  }
}
