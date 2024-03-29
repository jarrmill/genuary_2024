import '../style.css'
import { Application, Container } from 'pixi.js'
import Shape from './Shape.js'

const app = new Application({
  background: '#dfe6e9',
  antialias: true,
  resizeTo: window
})

const dotContainer = new Container()

document.body.appendChild(app.view)

let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let handleMousemove = (event) => {
  mouseX = event.x
  mouseY = event.y
}

document.addEventListener('mousemove', handleMousemove)

const rgb = function (r, g, b) {
  r = Math.floor(r)
  g = Math.floor(g)
  b = Math.floor(b)
  return ['rgb(', r, ',', g, ',', b, ')'].join('')
}

// setup will be called once, before draw is called
const setup = () => {
  app.stage.addChild(dotContainer)
  const numCols = 40
  const numRows = 40
  for (let x = 0; x < numCols; x++) {
    let cX = (window.innerWidth / numCols) * x
    for (let y = 0; y < numRows; y++) {
      let cY = (window.innerHeight / numRows) * y
      const r = 0xff * Math.random()
      let rand = Math.min(255 * Math.random(), 200)
      let dot = new Shape(cX, cY, 5, rgb(rand, rand, 255))
      dotContainer.addChild(dot)
    }
  }

  dotContainer.children.forEach((child) => {
    child.init()
  })
}
// draw will be called on every frame
const draw = (delta) => {
  dotContainer.children.forEach((child) => {
    child.move({ delta, mouseX, mouseY })
  })
}

setup()
app.ticker.add(draw)
