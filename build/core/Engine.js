export const c = document.querySelector("canvas").getContext("2d");

export default class Engine {
  constructor(width = innerWidth, height = innerHeight) {
    this.canvas = document.querySelector("canvas");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    //Delta stuff

    this.gameObjects = [];
    this.updatableObjects = [];
    this.extraLoopCode = () => {};

    this.color = "#fff";

    this.RAF = null; //requestAnimationFrame
  }

  UpdateGameObject(obj) {
    this.updatableObjects.push(obj);
  }

  Render() {
    this.Loop();
  }

  AddLoopCode(code) {
    this.extraLoopCode = code;
  }

  AddGameObject(object) {
    this.gameObjects.push(object);
  }

  Loop() {
    c.fillStyle = this.color;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.gameObjects.length; i++) {
      const obj = this.gameObjects[i];

      if (obj && obj.Render) obj.Render();
    }

    for (let i = 0; i < this.updatableObjects.length; i++) {
      const obj = this.updatableObjects[i];

      if (obj && obj.Update) obj.Update();
    }

    this.extraLoopCode();

    this.RAF = requestAnimationFrame(this.Loop.bind(this));
  }
}
