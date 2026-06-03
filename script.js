// Mobile drawer
const menuToggle = document.getElementById('menuToggle');
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('mobileOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

menuToggle && menuToggle.addEventListener('click', openDrawer);
drawerClose && drawerClose.addEventListener('click', closeDrawer);
overlay && overlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-nav a').forEach(a => a.addEventListener('click', closeDrawer));

// Dots rotation
const dots = document.querySelectorAll('.dot');
let dotIndex = 0;
if(dots.length){
  setInterval(() => {
    dots.forEach(d => d.classList.remove('active'));
    dotIndex = (dotIndex + 1) % dots.length;
    dots[dotIndex].classList.add('active');
  }, 3000);
}

// Year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// ===== REGIONS POPUP =====
const citiesStat = document.getElementById('citiesStat');
const regionsPopup = document.getElementById('regionsPopup');
const regionsPopupClose = document.getElementById('regionsPopupClose');
const regionsPopupOverlay = regionsPopup ? regionsPopup.querySelector('.regions-popup-overlay') : null;

function openRegionsPopup() {
  if (regionsPopup) {
    regionsPopup.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeRegionsPopup() {
  if (regionsPopup) {
    regionsPopup.classList.remove('open');
    document.body.style.overflow = '';
  }
}

if (citiesStat) {
  citiesStat.addEventListener('click', openRegionsPopup);
}
if (regionsPopupClose) {
  regionsPopupClose.addEventListener('click', closeRegionsPopup);
}
if (regionsPopupOverlay) {
  regionsPopupOverlay.addEventListener('click', closeRegionsPopup);
}

// ===== MANIFESTO POPUP =====
const manifestoPopup = document.getElementById('manifestoPopup');
const manifestoPopupClose = document.getElementById('manifestoPopupClose');
const manifestoPopupOverlay = manifestoPopup ? manifestoPopup.querySelector('.manifesto-popup-overlay') : null;
const exploreMoreCard = document.getElementById('exploreMoreCard');
const manifestoTriggers = document.querySelectorAll('.manifesto-trigger');

function openManifestoPopup() {
  if (manifestoPopup) {
    manifestoPopup.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeManifestoPopup() {
  if (manifestoPopup) {
    manifestoPopup.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Trigger from Explore More card
if (exploreMoreCard) {
  exploreMoreCard.addEventListener('click', openManifestoPopup);
}

// Trigger from Manifesto nav links
manifestoTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    openManifestoPopup();
  });
});

if (manifestoPopupClose) {
  manifestoPopupClose.addEventListener('click', closeManifestoPopup);
}
if (manifestoPopupOverlay) {
  manifestoPopupOverlay.addEventListener('click', closeManifestoPopup);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (regionsPopup && regionsPopup.classList.contains('open')) {
      closeRegionsPopup();
    }
    if (manifestoPopup && manifestoPopup.classList.contains('open')) {
      closeManifestoPopup();
    }
  }
});

// ===== IMAGE SLIDER - Mobile Only =====
(function() {
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderSlides = document.querySelectorAll('.slider-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');

  // Exit if no slider elements or not mobile
  if (!sliderTrack || sliderSlides.length === 0) return;
  if (window.innerWidth > 640) return;

  let currentSlide = 0;
  const totalSlides = sliderSlides.length;
  let autoSlideInterval = null;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    sliderTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    sliderSlides.forEach(function(slide, i) {
      slide.classList.toggle('active', i === currentSlide);
    });

    sliderDots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // Button clicks
  if (sliderNext) {
    sliderNext.addEventListener('click', function() {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  if (sliderPrev) {
    sliderPrev.addEventListener('click', function() {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  // Dot clicks
  sliderDots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      stopAutoSlide();
      goToSlide(i);
      startAutoSlide();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;

  sliderTrack.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, {passive: true});

  sliderTrack.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoSlide();
  }, {passive: true});

  // Start auto-slide immediately
  startAutoSlide();
})();

// ===== URDU SLIDER - Mobile Only =====
(function() {
  var urduTrack = document.getElementById('urduSliderTrack');
  var urduSlides = document.querySelectorAll('.urdu-slider-slide');
  var urduDots = document.querySelectorAll('.urdu-slider-dot');
  var urduPrev = document.getElementById('urduSliderPrev');
  var urduNext = document.getElementById('urduSliderNext');

  if (!urduTrack || urduSlides.length === 0) return;
  if (window.innerWidth > 640) return;

  var currentUrduSlide = 0;
  var totalUrduSlides = urduSlides.length;
  var urduAutoInterval = null;

  function goToUrduSlide(index) {
    if (index < 0) index = totalUrduSlides - 1;
    if (index >= totalUrduSlides) index = 0;
    currentUrduSlide = index;

    urduTrack.style.transform = 'translateX(-' + (currentUrduSlide * 100) + '%)';

    urduSlides.forEach(function(slide, i) {
      slide.classList.toggle('active', i === currentUrduSlide);
    });

    urduDots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === currentUrduSlide);
    });
  }

  function nextUrduSlide() { goToUrduSlide(currentUrduSlide + 1); }
  function prevUrduSlide() { goToUrduSlide(currentUrduSlide - 1); }

  function startUrduAuto() {
    if (urduAutoInterval) clearInterval(urduAutoInterval);
    urduAutoInterval = setInterval(nextUrduSlide, 4000);
  }

  function stopUrduAuto() {
    if (urduAutoInterval) {
      clearInterval(urduAutoInterval);
      urduAutoInterval = null;
    }
  }

  if (urduNext) {
    urduNext.addEventListener('click', function() {
      stopUrduAuto();
      nextUrduSlide();
      startUrduAuto();
    });
  }

  if (urduPrev) {
    urduPrev.addEventListener('click', function() {
      stopUrduAuto();
      prevUrduSlide();
      startUrduAuto();
    });
  }

  urduDots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      stopUrduAuto();
      goToUrduSlide(i);
      startUrduAuto();
    });
  });

  var urduTouchStart = 0;

  urduTrack.addEventListener('touchstart', function(e) {
    urduTouchStart = e.changedTouches[0].screenX;
    stopUrduAuto();
  }, {passive: true});

  urduTrack.addEventListener('touchend', function(e) {
    var touchEnd = e.changedTouches[0].screenX;
    var diff = urduTouchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextUrduSlide();
      else prevUrduSlide();
    }
    startUrduAuto();
  }, {passive: true});

  startUrduAuto();
})();