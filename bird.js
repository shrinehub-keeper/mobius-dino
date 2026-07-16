import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const BIRD_INTERVAL_MIN = 1000
const BIRD_INTERVAL_MAX = 3000
const worldElem = document.querySelector("[data-world]")

let nextBirdTime
export function setupBird() {
  nextBirdTime = BIRD_INTERVAL_MIN
  document.querySelectorAll("[data-bird]").forEach(bird => {
    bird.remove()
  })
}

export function updateBird(delta, speedScale) {
  document.querySelectorAll("[data-bird]").forEach(bird => {
    incrementCustomProperty(bird, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(bird, "--left") <= -100) {
      bird.remove()
    }
  })

  if (nextBirdTime <= 0) {
    createBird()
    nextBirdTime =
      randomNumberBetween(BIRD_INTERVAL_MIN, BIRD_INTERVAL_MAX) / speedScale
  }
  nextBirdTime -= delta
}

export function getBirdRects() {
  return [...document.querySelectorAll("[data-bird]")].map(bird => {
    return bird.getBoundingClientRect()
  })
}

function createBird() {
  const bird = document.createElement("img")
  bird.dataset.bird = true
  bird.src = "imgs/bird.png"
  bird.classList.add("bird")
  setCustomProperty(bird, "--left", 100)
  worldElem.append(bird)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
