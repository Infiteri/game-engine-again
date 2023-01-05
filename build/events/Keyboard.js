export default class Keyboard {
  static OnKey(code, callback, keyUpCallBack = () => {}) {
    addEventListener("keydown", e => {
      if (e.code === code) {
        callback(e);
      } else {
        return;
      }
    });

    addEventListener("keyup", e => {
      if (e.code === code) {
        keyUpCallBack(e);
      } else {
        return;
      }
    });
  }
}
