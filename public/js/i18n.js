const translations = {
  pt: {
    title: 'MP3 Download',
    subtitle: 'Baixe áudio de vídeos em alta qualidade',
    urlLabel: 'URL do Vídeo',
    urlPlaceholder: 'https://www.youtube.com/watch?v=...',
    downloadButton: 'Baixar Áudio',
    downloading: 'Baixando...',
    downloadingAudio: 'Baixando áudio...',
    processing: 'Processando',
    takesMinutes: 'Isso pode levar alguns minutos',
    downloadSuccess: 'Download concluído com sucesso!',
    downloadFile: 'Baixar',
    platformsTitle: 'Plataformas Suportadas',
    youtube: 'YouTube',
    soundcloud: 'SoundCloud',
    vimeo: 'Vimeo',
    others: 'E muitas outras',
    footer: 'Download rápido e seguro • Sem armazenamento no servidor',
    errorInvalidUrl: 'Por favor, insira uma URL válida',
    errorDownload: 'Erro ao baixar áudio',
    errorServer: 'Erro ao conectar com o servidor',
    fileNotFound: 'Arquivo não encontrado',
  },
  en: {
    title: 'MP3 Download',
    subtitle: 'Download audio from videos in high quality',
    urlLabel: 'Video URL',
    urlPlaceholder: 'https://www.youtube.com/watch?v=...',
    downloadButton: 'Download Audio',
    downloading: 'Downloading...',
    downloadingAudio: 'Downloading audio...',
    processing: 'Processing',
    takesMinutes: 'This may take a few minutes',
    downloadSuccess: 'Download completed successfully!',
    downloadFile: 'Download',
    platformsTitle: 'Supported Platforms',
    youtube: 'YouTube',
    soundcloud: 'SoundCloud',
    vimeo: 'Vimeo',
    others: 'And many others',
    footer: 'Fast and secure download • No server storage',
    errorInvalidUrl: 'Please enter a valid URL',
    errorDownload: 'Error downloading audio',
    errorServer: 'Error connecting to server',
    fileNotFound: 'File not found',
  },
}

class I18n {
  constructor() {
    this.currentLang = this.detectLanguage()
    this.init()
  }

  detectLanguage() {
    const saved = localStorage.getItem('language')
    if (saved && translations[saved]) {
      return saved
    }

    const browserLang = navigator.language.split('-')[0]
    return translations[browserLang] ? browserLang : 'en'
  }

  init() {
    this.updateUI()
    this.setupLanguageSelector()
  }

  setLanguage(lang) {
    if (!translations[lang]) return

    this.currentLang = lang
    localStorage.setItem('language', lang)
    this.updateUI()
  }

  translate(key) {
    return translations[this.currentLang][key] || key
  }

  t(key) {
    return this.translate(key)
  }

  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n')
      element.textContent = this.t(key)
    })

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder')
      element.placeholder = this.t(key)
    })

    const langSelector = document.getElementById('languageSelector')
    if (langSelector) {
      langSelector.value = this.currentLang
    }
  }

  setupLanguageSelector() {
    const langSelector = document.getElementById('languageSelector')

    if (langSelector) {
      langSelector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value)
      })
    }
  }
}

const i18n = new I18n()
