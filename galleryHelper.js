let currentIndex = 0
let autoPlayInterval = null
const galleryImages = document.querySelectorAll('.screenshots img')
const playPauseOverlay = document.querySelector('.play-pause-overlay')
const dotsContainer = document.querySelector('.dots')

// Funkce pro zobrazení konkrétního obrázku
function showImage (index) {
  galleryImages.forEach((img, i) => {
    img.classList.toggle('active', i === index)
  })
  updateDots(index)
}

// Funkce pro přepnutí na další obrázek
function nextImage () {
  currentIndex = (currentIndex + 1) % galleryImages.length
  showImage(currentIndex)
}

// Spustí automatické přehrávání
function startAutoPlay () {
  if (!autoPlayInterval) {
    autoPlayInterval = setInterval(nextImage, 3000)
    showOverlay('pause')
  }
}

// Pozastaví automatické přehrávání
function stopAutoPlay () {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
    showOverlay('play')
  }
}

// Přepínání mezi přehráváním a pozastavením
function togglePlayPause () {
  if (autoPlayInterval) {
    stopAutoPlay()
  } else {
    // Před spuštěním autoPlay posunout index na další obrázek
    currentIndex = (currentIndex + 1) % galleryImages.length
    showImage(currentIndex) // Ukázat nový obrázek
    startAutoPlay() // Spustit autoPlay po přepnutí
  }
}

function showOverlay (type) {
  const svgPlay = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#fff" d="M8 5v14l11-7z"/></svg>`

  const svgPause = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#fff" d="M6 6h4v12H6zm8 0h4v12h-4z"/></svg>`
  playPauseOverlay.innerHTML = `<span>${
    type === 'pause' ? svgPlay : svgPause
  }</span>`
  playPauseOverlay.className = `play-pause-overlay ${type}`
  playPauseOverlay.style.opacity = '1'

  setTimeout(() => {
    playPauseOverlay.style.opacity = '0'
  }, 1000)
}

// Aktualizace indikátorů (tečky)
function updateDots (index) {
  const dots = document.querySelectorAll('.dot')
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index)
  })
}

// Paticka se zobrazuje při scrollování nebo pokud není co scrollovat
const footer = document.getElementById('footer')

function checkFooterVisibility () {
  const bodyHeight = document.body.offsetHeight
  const windowHeight = window.innerHeight
  if (bodyHeight <= windowHeight) {
    footer.classList.add('show')
  } else if (window.innerHeight + window.scrollY + 10>= bodyHeight) {
    footer.classList.add('show')
  } else {
    footer.classList.remove('show')
  }
}

// Události pro klikání na tečky a obrázky
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', checkFooterVisibility)
  window.addEventListener('resize', checkFooterVisibility)
  checkFooterVisibility()

  // Zobrazení prvního obrázku a teček
  showImage(currentIndex)

  galleryImages.forEach(img => {
    img.addEventListener('click', togglePlayPause)
  })

  galleryImages.forEach((_, i) => {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.addEventListener('click', () => {
      currentIndex = i
      showImage(i)
      stopAutoPlay() // Zastaví přehrávání
    })
    dotsContainer.appendChild(dot)
  })

  updateDots(currentIndex)
  startAutoPlay() // Automatické přehrávání při načtení
})
