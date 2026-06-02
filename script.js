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
