const form = document.getElementById('downloadForm')
const urlInput = document.getElementById('url')
const submitBtn = document.getElementById('submitBtn')
const statusDiv = document.getElementById('status')

const API_BASE_URL = '/api'

function showStatus(type, message) {
  statusDiv.className = 'status'
  statusDiv.innerHTML = message
  statusDiv.classList.remove('hidden')
  lucide.createIcons()
}

function clearStatus(delay = 500) {
  setTimeout(() => {
    statusDiv.classList.add('hidden')
    statusDiv.innerHTML = ''
  }, delay)
}

function setButtonLoading(loading) {
  if (loading) {
    submitBtn.disabled = true
    submitBtn.classList.add('progress-bar', 'opacity-70')
    submitBtn.innerHTML = `<span class="flex items-center justify-center"><i data-lucide="loader" class="w-5 h-5 mr-2 animate-spin"></i>${i18n.t(
      'downloading'
    )}</span>`
  } else {
    submitBtn.disabled = false
    submitBtn.classList.remove('progress-bar', 'opacity-70')
    submitBtn.innerHTML = `<span class="flex items-center justify-center"><i data-lucide="download" class="w-5 h-5 mr-2"></i>${i18n.t(
      'downloadButton'
    )}</span>`
  }
  lucide.createIcons()
}

function getLoadingHTML() {
  return `
    <div class="mt-6 space-y-3">
      <div class="flex items-center justify-between text-sm text-blue-800 mb-2">
        <span class="font-medium">${i18n.t('downloadingAudio')}</span>
        <span class="text-blue-600">${i18n.t('processing')}</span>
      </div>
      <div class="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
        <div class="progress-bar bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full w-full"></div>
      </div>
      <p class="text-xs text-blue-600 text-center mt-2">${i18n.t(
        'takesMinutes'
      )}</p>
    </div>
  `
}

function getSuccessHTML(data) {
  return `
    <div class="mt-6 p-5 bg-green-50 border border-green-200 rounded-xl">
      <p class="text-green-800 font-semibold mb-3 flex items-center">
        <i data-lucide="check-circle" class="w-5 h-5 mr-2"></i> 
        ${i18n.t('downloadSuccess')}
      </p>
      <a 
        href="${data.downloadUrl}" 
        class="inline-flex items-center justify-center w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" 
        download 
        id="downloadLink"
      >
        <i data-lucide="download" class="w-5 h-5 mr-2"></i>
        ${i18n.t('downloadFile')} ${data.filename}
      </a>
    </div>
  `
}

function getErrorHTML(errorMessage) {
  return `
    <div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start">
      <i data-lucide="x-circle" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"></i>
      <span>${errorMessage}</span>
    </div>
  `
}

function attachDownloadLinkEvent() {
  setTimeout(() => {
    const downloadLink = document.getElementById('downloadLink')
    if (downloadLink) {
      downloadLink.addEventListener('click', () => {
        clearStatus()
      })
    }
  }, 100)
}

async function downloadAudio(url) {
  setButtonLoading(true)
  showStatus('loading', getLoadingHTML())

  try {
    const response = await fetch(`${API_BASE_URL}/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    const data = await response.json()

    if (response.ok) {
      showStatus('success', getSuccessHTML(data))
      urlInput.value = ''
      attachDownloadLinkEvent()
    } else {
      showStatus(
        'error',
        getErrorHTML(`${i18n.t('errorDownload')}: ${data.details || ''}`)
      )
    }
  } catch (error) {
    showStatus(
      'error',
      getErrorHTML(`${i18n.t('errorServer')}: ${error.message}`)
    )
  } finally {
    setButtonLoading(false)
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const url = urlInput.value.trim()

  if (!url) {
    showStatus('error', getErrorHTML(i18n.t('errorInvalidUrl')))
    return
  }

  await downloadAudio(url)
})

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons()
})
