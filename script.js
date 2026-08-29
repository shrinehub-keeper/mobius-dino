import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateBird, setupBird, getBirdRects } from "./bird.js"
import { setupTheme } from "./theme.js"
import { playSound } from "./sound.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const WORLD_MAX_WIDTH = 800
const SPEED_SCALE_INCREASE = 0.00001
const DINO_HITBOX_INSET = 0.2
const OBSTACLE_HITBOX_INSET = 0.1
const MILESTONE_SCORE = 100
const MILESTONE_SPEED_BUMP = 0.1

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
setupTheme()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
let lastMilestone
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateBird(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = shrinkRect(getDinoRect(), DINO_HITBOX_INSET)
  return [...getCactusRects(), ...getBirdRects()]
    .map(rect => shrinkRect(rect, OBSTACLE_HITBOX_INSET))
    .some(rect => isCollision(rect, dinoRect))
}

function shrinkRect(rect, insetRatio) {
  const insetX = rect.width * insetRatio
  const insetY = rect.height * insetRatio
  return {
    left: rect.left + insetX,
    right: rect.right - insetX,
    top: rect.top + insetY,
    bottom: rect.bottom - insetY,
  }
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)

  const milestone = Math.floor(score / MILESTONE_SCORE)
  while (milestone > lastMilestone) {
    lastMilestone++
    speedScale += MILESTONE_SPEED_BUMP
    playSound("ring")
  }
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  lastMilestone = 0
  setupGround()
  setupDino()
  setupCactus()
  setupBird()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setDinoLose()
  playSound("death")
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  const width = Math.min(WORLD_WIDTH * worldToPixelScale, WORLD_MAX_WIDTH)
  const height = (width * WORLD_HEIGHT) / WORLD_WIDTH

  worldElem.style.width = `${width}px`
  worldElem.style.height = `${height}px`
}
