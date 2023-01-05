import { c } from "../core/Engine.js";
import GameObject from "./GameObject.js";

export default class Sprite {
  /**
   * @param {GameObject} go
   */
  constructor(go) {
    this.go = go;

    this.isLoaded = false;

    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesBetween = this.go.framesBetween;

    this.image = new Image();
    this.image.src = this.go.src;
    this.image.onload = () => {
      this.isLoaded = true;
      this.imageWidth = this.image.width;
      this.imageHeight = this.image.height;
    };
  }

  UpdateAnimation() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesBetween === 0) {
      if (this.currentFrame < this.go.frames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }

  Render() {
    //BUGFIX: Update the imageWidth and imageHeight var to be equal to the new image (in case of a animation) width and height
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;

    c.save();

    this.UpdateAnimation();

    c.drawImage(
      this.image,
      this.currentFrame * (this.imageWidth / this.go.frames),
      0,
      this.imageWidth / this.go.frames,
      this.imageHeight,
      this.go.vector.x - this.go.offset.x,
      this.go.vector.y - this.go.offset.y,
      (this.imageWidth / this.go.frames) * this.go.scale,
      this.imageHeight * this.go.scale
    );

    c.restore();
  }
}
