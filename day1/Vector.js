export default class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add = (vector) => {
    if (!vector.x || !vector.y) {

    }
    this.x += vector.x;
    this.y += vector.y;
  }

  sub = (vector) => {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  multVector(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  normalize() {
    const length = Math.sqrt((this.x * this.x) + (this.y * this.y));
    this.x = this.x / length;
    this.y = this.y / length;
  }

  set(vector) {
    if (!vector.x || !vector.y) {
        return;
    }
    this.x = vector.x;
    this.y = vector.y;
  }

  limit(max) {
    if (this.x > max) {
      this.x = max;
    }
    if (this.y > max) {
      this.y = max;
    }
    if (this.x < -max) {
      this.x = -max;
    }
    if (this.y < -max) {
      this.y = -max;
    }
  }
}