window.Dino = (function () {
  const { incrementCustomProperty, setCustomProperty, getCustomProperty } =
    window.UpdateCustomProperty
  const { playSound } = window.Sound

  const dinoElem = document.querySelector("[data-dino]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const DINO_FRAME_COUNT = 2
  const FRAME_TIME = 100
  const RUN_SRCS = ["imgs/dino-run-0.png", "imgs/dino-run-1.png"]
  const BALL_SRC = "imgs/dino-ball.png"
  const LOSE_SRC = "imgs/dino-lose.png"
  const JUMP_KEYS = ["Space", "ArrowUp", "KeyW"]

  let isJumping
  let isDucking
  let dinoFrame
  let currentFrameTime
  let yVelocity

  function setupDino() {
    isJumping = false
    isDucking = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    dinoElem.classList.remove("ducking")
    document.removeEventListener("keydown", onJump)
    document.removeEventListener("keydown", onDuckStart)
    document.removeEventListener("keyup", onDuckEnd)
    document.addEventListener("keydown", onJump)
    document.addEventListener("keydown", onDuckStart)
    document.addEventListener("keyup", onDuckEnd)
  }

  function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }

  function getDinoRect() {
    return dinoElem.getBoundingClientRect()
  }

  function setDinoLose() {
    dinoElem.src = LOSE_SRC
  }

  function handleRun(delta, speedScale) {
    if (isJumping || isDucking) {
      dinoElem.src = BALL_SRC
      return
    }

    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoElem.src = RUN_SRCS[dinoFrame]
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }

  function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
      setCustomProperty(dinoElem, "--bottom", 0)
      isJumping = false
    }

    yVelocity -= GRAVITY * delta
  }

  function onJump(e) {
    if (!JUMP_KEYS.includes(e.code) || isJumping || isDucking) return

    yVelocity = JUMP_SPEED
    isJumping = true
    playSound("jump")
  }

  function onDuckStart(e) {
    if (e.code !== "ArrowDown" && e.code !== "KeyS") return
    if (isJumping || isDucking) return

    isDucking = true
    dinoElem.classList.add("ducking")
  }

  function onDuckEnd(e) {
    if (e.code !== "ArrowDown" && e.code !== "KeyS") return
    if (!isDucking) return

    isDucking = false
    dinoElem.classList.remove("ducking")
  }

  return { setupDino, updateDino, getDinoRect, setDinoLose }
})()
