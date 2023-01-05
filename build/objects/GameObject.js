import AnimationPlayer from "../core/AnimationPlayer.js";
import { c } from "../core/Engine.js";
import Mouse from "../events/Mouse.js";
import Vector2 from "../utils/Vector2.js";
import Sprite from "./Sprite.js";

export default class GameObject {
  static id = -1;
  constructor({
    vector = Vector2.ONE,
    offset = new Vector2(0, 0),
    velocity = new Vector2(0, 0),
    src,
    scale = 1,
    width = 100,
    height = 100,
    frames = 1,
    framesBetween = 10,
    gravity = 0.7,
    speed = 10,
    jumpPower = 10, //Negative
    animationPlayer = new AnimationPlayer(),
  }) {
    GameObject.id++; //Id

    this.vector = vector;
    this.src = src;
    this.scale = scale;
    this.offset = offset;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.framesBetween = framesBetween;
    this.gravity = gravity;
    this.velocity = velocity;

    this.animationPlayer = animationPlayer;
    this.animations = animationPlayer.animations;

    this.speed = speed;
    this.jumpPower = jumpPower;

    this.sprite = new Sprite(this);

    //Update and (maybe) Init
    this.animationPlayer.UpdateAnimationsVars();
  }

  /**
   * @function UpdateAnimationsVars inner function
   */

  //Shortcuts
  BounceOffGround() {
    this.velocity.y = -this.velocity.y * 0.2; //TODO Add friction
  }

  _jump() {
    this.velocity.SetY(-this.jumpPower);
  }

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

  get_velocity() {
    return this.velocity;
  }

  //On
  _on_ground_hit() {}

  _move_left() {
    this.velocity.SetX(-this.speed);
  }

  _move_right() {
    this.velocity.SetX(this.speed);
  }

  //Internal
  Update() {
    const canvas = document.querySelector("canvas");

    this.vector.AddVector(this.velocity);

    if (this.vector.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.AddY(this.gravity);
    } else {
      this._on_ground_hit();
      // this.velocity.SetY(0);
    }
  }

  OnClick(callback) {
    Mouse.ClickUpdate();
    Mouse.ClickCallback(() => {
      if (
        Mouse.x >= this.vector.x &&
        Mouse.x <= this.vector.x + this.width &&
        Mouse.y >= this.vector.y &&
        Mouse.y <= this.vector.y + this.height
      ) {
        callback();
      }
    });
  }

  RenderHitbox() {
    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fillRect(this.vector.x, this.vector.y, this.width, this.height);
  }

  Render() {
    this.RenderHitbox();

    this.sprite.Render();
  }

  PlayAnimation(name) {
    this.animationPlayer.Play(name, this.sprite);
  }
}
