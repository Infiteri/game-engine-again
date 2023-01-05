export default class Mouse {
  static x = 0;
  static y = 0;

  static mouse = {
    x: this.x,
    y: this.y,
  };

  static MoveUpdate() {
    addEventListener("mousemove", ({ clientX, clientY }) => {
      this.x = clientX;
      this.y = clientY;

      this.mouse.x = this.x;
      this.mouse.y = this.y;
    });
  }

  static ClickUpdate() {
    addEventListener("click", ({ clientX, clientY }) => {
      this.x = clientX;
      this.y = clientY;

      this.mouse.x = this.x;
      this.mouse.y = this.y;
    });
  }

  /**
   * @argument {Function} callBack : takes as argument the click event
   */
  static ClickCallback(callBack) {
    addEventListener("click", event => {
      callBack(event);
    });
  }

  static MoveCallback(callBack) {
    addEventListener("mousemove", event => {
      callBack(event);
    });
  }
}
