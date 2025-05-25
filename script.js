// toggle

  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger-menu');

    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  }


// Modal elements
const contactLink = document.getElementById('contactLink');
const contactModal = document.getElementById('contact-modal');
const closeModal = document.querySelector('.close-modal');

contactLink.addEventListener('click', function (e) {
  e.preventDefault();
  contactModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  contactModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
  }
});




// star-bust Animationf
// const canvas = document.getElementById('starburst');
// const ctx = canvas.getContext('2d', { willReadFrequently: false });
// let width, height;
// const dpr = window.devicePixelRatio || 1;

// // Resize canvas properly
// function resizeCanvas() {
//   width = canvas.offsetWidth;
//   height = canvas.offsetHeight;
//   canvas.width = width * dpr;
//   canvas.height = height * dpr;
//   ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale for HiDPI
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// // === CONFIG ===
// const LINE_COUNT = 120; // Slightly reduced
// const lines = [];

// function center() {
//   return { x: width / 2, y: height / 2 };
// }

// function randomAngle() {
//   return Math.random() * Math.PI * 2;
// }

// function randomColor() {
//   const colors = [
//     'rgba(200, 150, 150, OPACITY)',
//     'rgba(160, 180, 200, OPACITY)',
//     'rgba(170, 200, 170, OPACITY)',
//     'rgba(190, 160, 210, OPACITY)',
//     'rgba(220, 180, 130, OPACITY)'
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function createLine() {
//   const angle = randomAngle();
//   return {
//     angle,
//     speed: 1 + Math.random() * 2,
//     length: 50 + Math.random() * 100,
//     size: 0.5 + Math.random(),
//     opacity: 0.5 + Math.random() * 0.4,
//     color: randomColor()
//   };
// }

// // Populate lines
// for (let i = 0; i < LINE_COUNT; i++) {
//   lines.push(createLine());
// }

// function animate() {
//   ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
//   ctx.fillRect(0, 0, width, height);

//   const c = center();
//   ctx.save();
//   ctx.translate(c.x, c.y);

//   ctx.lineWidth = 1.2;

//   lines.forEach((line, i) => {
//     const dx = Math.cos(line.angle) * line.length * line.size;
//     const dy = Math.sin(line.angle) * line.length * line.size;
//     const colorWithOpacity = line.color.replace('OPACITY', line.opacity.toFixed(2));

//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(dx, dy);
//     ctx.strokeStyle = colorWithOpacity;

//     // Use blur every few frames for performance
//     if (line.opacity > 0.7) {
//       ctx.shadowColor = colorWithOpacity;
//       ctx.shadowBlur = 12;
//     } else {
//       ctx.shadowBlur = 0;
//     }

//     ctx.stroke();

//     line.size += 0.02 * line.speed;
//     line.opacity -= 0.006;

//     if (line.opacity <= 0) lines[i] = createLine();
//   });

//   ctx.restore();
//   requestAnimationFrame(animate);
// }

// animate();




//   Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  // Manually animate hero content
  const title = document.querySelector(".hero__title");
  const subtitle = document.querySelector(".hero__subtitle");
  const buttons = document.querySelector(".hero__buttons");

  if (title) title.style.animation = "fadeInUp 1s ease-out forwards";
  if (subtitle) subtitle.style.animation = "fadeInUp 1s ease-out forwards 0.4s";
  if (buttons) buttons.style.animation = "fadeInUp 1s ease-out forwards 0.8s";

  // Initialize AOS (for other sections if used)
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
  });
});



// market-Number

  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let animated = false;
  
    function animateCounters() {
      if (animated) return;
      const section = document.querySelector('.market-numbers');
      const sectionTop = section.getBoundingClientRect().top;
  
      if (sectionTop < window.innerHeight - 100) {
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
  
            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
        animated = true;
      }
    }
  
    window.addEventListener('scroll', animateCounters);
  });


  // <!-- Market-Trends -->

 document.addEventListener("DOMContentLoaded", function () {
  const apiKey = '5155569e16304ed4b64f5b5ce16ee295';
  const url = `https://newsapi.org/v2/top-headlines?category=business&country=us&pageSize=3&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles.slice(0, 3);
      const cards = document.querySelectorAll('.market__card');

      articles.forEach((article, index) => {
        const card = cards[index];
        if (!card) return;

        const title = article.title || "Market Update";
        const description = article.description ? article.description.slice(0, 100) + "..." : "Click to read more.";
        const link = article.url || "#";
        const imageUrl = article.urlToImage;

        const cardContent = card.querySelector(".card__content");
        const btn = card.querySelector(".card__btn");

        if (cardContent && btn) {
          cardContent.querySelector("h3").innerText = title;
          cardContent.querySelector("p").innerText = description;
          btn.href = link;
          btn.innerText = "Read Full Article";
        }

        // ✅ Add background image if available
        if (imageUrl) {
          card.style.backgroundImage = `url(${imageUrl})`;
          card.style.backgroundSize = "cover";
          card.style.backgroundPosition = "center";
          card.style.color = "#fff";
        } else {
          // ✅ Fallback background color
          card.style.backgroundColor = "#0077cc";
          card.style.color = "#fff";
        }
      });
    })
    .catch(error => {
      console.error("Failed to load market trends:", error);
    });
});



