const SOUNDS = {
  jump: new Audio("sounds/jump.wav"),
  ring: new Audio("sounds/ring.wav"),
  death: new Audio("sounds/death.wav"),
}

export function playSound(name) {
  const sound = SOUNDS[name]
  if (!sound) return

  sound.currentTime = 0
  sound.play().catch(() => {})
}
