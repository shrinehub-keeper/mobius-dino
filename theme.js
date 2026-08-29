const THEMES = ["latte", "frappe", "macchiato", "mocha"]
const STORAGE_KEY = "mobius-dino-theme"
const DEFAULT_THEME = "mocha"

export function setupTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY)
  const theme = THEMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME
  applyTheme(theme)

  document.querySelectorAll("[data-theme-radio]").forEach(radio => {
    radio.checked = radio.value === theme
    radio.addEventListener("change", () => {
      if (radio.checked) applyTheme(radio.value)
    })
  })

  const themePickerElem = document.querySelector("[data-theme-picker]")
  themePickerElem.addEventListener("keydown", e => e.stopPropagation())
}

function applyTheme(theme) {
  document.body.dataset.theme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}
