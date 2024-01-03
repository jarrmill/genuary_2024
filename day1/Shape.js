import { Graphics } from 'pixi.js'
import Vector from './Vector.js'
import { easeOutCubic } from './utils.js'

export default class Shape extends Graphics {
  constructor(x, y, radius, color) {
    super()
    this.pos = new Vector(x, y)
    this.radius = radius
    this.color = color
    this.acceleration = new Vector(0.001, 0.001)
    this.vel = new Vector(0.001, 0.001)
    this.velocityLimit = 4
  }

  followMouse = (mouseX, mouseY) => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let mouse = new Vector(mouseX, mouseY)
    let dir = new Vector(this.pos.x, this.pos.y)

    dir.sub(mouse)

    // when closer the ball is to the mouse, the closer to 0.00 this will be. Farther is closer to 1
    let normalizedDiff = new Vector(
      easeOutCubic(Math.abs(dir.x / windowWidth)) * -1,
      easeOutCubic(Math.abs(dir.y / windowHeight)) * -1
    )
    normalizedDiff.mult(Math.random())

    dir.normalize()
    dir.multVector(normalizedDiff)

    this.acceleration.set(dir)

    this.vel.add(this.acceleration)
    this.vel.limit(this.velocityLimit)

    this.pos.add(this.vel)
  }

  move({ mouseX, mouseY }) {
    this.followMouse(mouseX, mouseY)

    this.x = this.pos.x
    this.y = this.pos.y
  }

  checkBounds() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0
    }
  }

  init() {
    this.beginFill(this.color)
    this.drawCircle(this.x, this.y, this.radius)
    this.endFill()
  }
}
