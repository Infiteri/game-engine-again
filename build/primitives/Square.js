import { c } from "../core/Engine.js";
import Vector2 from "../utils/Vector2.js";

export default class Square {
  constructor({
    vector,
    width = 50,
    height = 50,
    velocity = new Vector2(0, 0),
    gravity = 0.2,
    color = "blue",
  }) {
    this.type = "square";

    this.vector = vector;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gravity = gravity;
    this.velocity = velocity;
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

  _stop_velocity_x() {
    this.velocity.SetX(0);
  }

  _on_ground_hit() {}

  Update() {
    const canvas = document.querySelector("canvas");

    this.vector.AddVector(this.velocity);

    if (this.vector.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.AddY(this.gravity);
    } else this.velocity.SetY(0);
  }

  Render() {
    c.fillStyle = this.color;
    c.fillRect(this.vector.x, this.vector.y, this.width, this.height);
  }
}
