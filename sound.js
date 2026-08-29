const SOUNDS = {
  jump: new Audio("sounds/jump.mp3"),
  ring: new Audio("sounds/ring.mp3"),
  death: new Audio("sounds/death.mp3"),
}

export function playSound(name) {
  const sound = SOUNDS[name]
  if (!sound) return

  sound.currentTime = 0
  sound.play().catch(() => {})
}
