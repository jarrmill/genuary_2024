import '../style.css'
import { Noise } from 'noisejs'

var noise = new Noise(Math.random())
let svgDom = document.getElementsByTagName('svg')[0]

const faceElems = document.querySelectorAll('#face .cls-1')
const bodyElems = document.querySelectorAll('#body .cls-1')
const overlay = document.getElementById('overlay')
const subtitle = document.getElementById('subtitle')
const homelink = document.getElementById('homelink')
const speed = 0.0003

const resize = function () {
  svgDom.style.width = window.innerWidth * 0.7 + 'px'
}

const rgb = function (r, g, b) {
  r = Math.floor(r)
  g = Math.floor(g)
  b = Math.floor(b)
  return ['rgb(', r, ',', g, ',', b, ')'].join('')
}

const getNoise = function (delta) {
  return (noise.simplex2(1, delta * speed) + 1) / 2
}

const getColor = function (delta) {
  const r = 255 * getNoise(delta + 1000)
  const g = 255 * getNoise(delta)
  const b = 255 * getNoise(delta - 1000)

  return rgb(r, g, b)
}
const draw = function (delta) {
  const colorOne = getColor(delta)
  const colorTwo = getColor(delta + 2000)
  const colorThree = getColor(delta + 4000)
  faceElems.forEach((elem) => {
    elem.setAttribute('fill', colorTwo)
  })
  bodyElems.forEach((elem) => {
    elem.setAttribute('fill', colorOne)
  })
  document.body.style.background = colorThree
  overlay.style.color = colorTwo
  homelink.style.color = colorTwo
  subtitle.style.color = colorOne
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)
addEventListener('resize', resize)
resize()
