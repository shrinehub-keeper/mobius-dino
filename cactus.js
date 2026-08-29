window.Cactus = (function () {
  const { setCustomProperty, incrementCustomProperty, getCustomProperty } =
    window.UpdateCustomProperty

  const SPEED = 0.05
  const CACTUS_INTERVAL_MIN = 500
  const CACTUS_INTERVAL_MAX = 2000
  const CACTUS_START_DELAY = 1500
  const WORLD_WIDTH = 100
  const WORLD_HEIGHT = 30
  const CACTUS_HEIGHT_PERCENT = 30 // matches .cactus { height: 30% } in styles.css
  const CACTUS_ASPECT_RATIO = 37 / 37 // cactus.png is 37x37
  const CACTUS_WIDTH_PERCENT =
    (WORLD_HEIGHT / WORLD_WIDTH) * (CACTUS_HEIGHT_PERCENT / 100) * CACTUS_ASPECT_RATIO * 100
  const worldElem = document.querySelector("[data-world]")

  let nextCactusTime

  function setupCactus() {
    nextCactusTime = CACTUS_START_DELAY
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      cactus.remove()
    })
  }

  function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    })

    if (nextCactusTime <= 0) {
      createCactus()
      nextCactusTime =
        randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
  }

  function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }

  function createCactus() {
    const clusterSize = pickClusterSize()
    let left = 100
    for (let i = 0; i < clusterSize; i++) {
      createCactusSprite(left)
      left += CACTUS_WIDTH_PERCENT
    }
  }

  function createCactusSprite(left) {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", left)
    worldElem.append(cactus)
  }

  function pickClusterSize() {
    const roll = Math.random()
    return roll < 0.6 ? 1 : 2
  }

  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return { setupCactus, updateCactus, getCactusRects }
})()
