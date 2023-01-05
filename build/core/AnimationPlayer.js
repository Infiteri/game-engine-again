export default class AnimationPlayer {
  constructor(animations = {}) {
    this.animations = animations;
  }

  UpdateAnimationsVars() {
    for (const a in this.animations) {
      const animation = this.animations[a];

      animation.image = new Image();
      animation.image.src = animation.src;
    }
  }

  Play(name, sprite) {
    const animation = this.animations[name];

    if (animation) {
      if (sprite.image !== animation.image) {
        sprite.image = animation.image;
        sprite.go.frames = animation.frames;
        sprite.currentFrame = 0;
      }
    } else throw new Error("Undefined animation: " + name);
  }
}
