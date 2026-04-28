
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;           
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const counter = setInterval(() => {
        frame++;

        const progress = frame / totalFrames;
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.round(eased * target);

        el.textContent = current + suffix;

        if (frame === totalFrames) {
            clearInterval(counter);
            el.textContent = target + suffix;   // make sure it lands exactly
        }
    }, 1000 / frameRate);
}

const statsSection = document.getElementById('stats');
let counted = false;

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                document.querySelectorAll('.stat-number').forEach(animateCounter);
            }
        });
    },
    { threshold: 0.3 }
);

if (statsSection) observer.observe(statsSection);

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

const img = document.querySelector('.img');

img.addEventListener('click', () => {
  img.src = img.src.includes('victor.jpg')
    ? 'victor3.jpg'
    : 'victor.jpg';
});
