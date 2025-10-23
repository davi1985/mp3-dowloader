class ThemeManager {
  constructor() {
    this.currentTheme = this.detectTheme()
    this.init()
  }

  detectTheme() {
    const saved = localStorage.getItem('theme')
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    }

    return 'light'
  }

  init() {
    this.applyTheme(this.currentTheme)
    this.setupThemeToggle()
    this.watchSystemTheme()
  }

  applyTheme(theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    this.updateToggleIcon()
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.applyTheme(newTheme)
  }

  updateToggleIcon() {
    const toggleCheckbox = document.getElementById('themeToggle')
    const themeIcon = document.getElementById('themeIcon')

    if (!toggleCheckbox || !themeIcon) return

    toggleCheckbox.checked = this.currentTheme === 'dark'

    const iconName = this.currentTheme === 'light' ? 'moon' : 'sun'
    themeIcon.innerHTML = `<i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>`

    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }

  setupThemeToggle() {
    const toggleCheckbox = document.getElementById('themeToggle')
    if (toggleCheckbox) {
      toggleCheckbox.addEventListener('change', () => this.toggleTheme())
    }
  }

  watchSystemTheme() {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.applyTheme(e.matches ? 'dark' : 'light')
          }
        })
    }
  }
}

let themeManager

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager()
  })
} else {
  themeManager = new ThemeManager()
}
