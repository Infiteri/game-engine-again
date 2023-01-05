export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  AddX(value) {
    this.x += value;
  }

  AddY(value) {
    this.y += value;
  }

  Add(value) {
    this.x += value;
    this.y += value;
  }

  SubX(value) {
    this.x -= value;
  }

  SubY(value) {
    this.y -= value;
  }

  Sub(value) {
    this.x -= value;
    this.y -= value;
  }

  /**
   * @param {Vector2} vector
   */
  AddVector(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  /**
   * @param {Vector2} vector
   */
  SubVector(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  SetX(value) {
    this.x = value;
  }

  SetY(value) {
    this.y = value;
  }

  Set(vector) {
    this.x = vector.x;
    this.y = vector.y;
  }

  MultiplyX(value) {
    this.x *= value;
  }

  static ZERO = new Vector2(0, 0);
  static ONE = new Vector2(100, 100);

  static Random(from, to) {
    return new Vector2(
      Math.random() * (from - to) + to,
      Math.random() * (from - to) + to
    );
  }
}
