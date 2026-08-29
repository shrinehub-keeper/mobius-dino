window.Ground = (function () {
  const { getCustomProperty, incrementCustomProperty, setCustomProperty } =
    window.UpdateCustomProperty

  const SPEED = 0.05
  const groundElems = document.querySelectorAll("[data-ground]")

  function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
  }

  function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
      incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

      if (getCustomProperty(ground, "--left") <= -300) {
        incrementCustomProperty(ground, "--left", 600)
      }
    })
  }

  return { setupGround, updateGround }
})()
