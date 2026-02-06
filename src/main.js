import "./style.css";

/* ton ancien code canvas/commenté reste inchangé ici */

// ————————————————————
// BOUTON ET AUDIO PAR ÉTAT
const btn = document.getElementById("bouton");
const cloudImg = btn.querySelector("img"); // image dans le bouton
document.body.dataset.etat = 0;

const ambiances = {
  0: document.getElementById("ambiance-prairie"),
  1: document.getElementById("ambiance-pluie"),
};

const images = {
  0: "image/cloud.png",      // état 0
  1: "image/cloud-rain.png", // état 1
};

// fonction pour jouer l'audio selon l'état
function playAmbiance(etat) {
  Object.values(ambiances).forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  ambiances[etat]?.play();
}

// fonction pour changer l'image du bouton
function updateButtonImage(etat) {
  cloudImg.src = images[etat] || "image/cloud.png";
  cloudImg.alt = etat === 0 ? "nuage" : "pluie";
}

// appel initial
updateButtonImage(0);
playAmbiance(0);

// clic sur le bouton
btn.addEventListener("click", () => {
  let etat = Number(btn.dataset.etat);
  etat = (etat + 1) % 3; // cycle entre 0 et 1
  btn.dataset.etat = etat;
  document.body.dataset.etat = etat;

  updateButtonImage(etat);
  playAmbiance(etat);
});

// ————————————————————
// LE RESTE DE TON CODE EXISTANT NE CHANGE PAS
// bulles, oiseau, papillon, etc.
// (copie exactement ton code existant ici, inchangé)


let birdX = 200;
let birdY = 200;
let mouseX = 0;
let mouseY = 0;
let isFollowing = false;

const bird = document.querySelector(".bird");
const img = bird.querySelector("img");

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  if (isFollowing) {
    const dx = mouseX - birdX;
    const dy = mouseY - birdY;

   
    birdX += dx * 0.1; 
    birdY += dy * 0.1;

    //bird.style.left = birdX + "px";
    //bird.style.top = birdY + "px";

    console.log(dx)

    if (dx >= 0) {
      bird.style.transform = `translate(calc(${birdX}px - 50%), ${birdY}px) scaleX(-1)`;
    } else {
      bird.style.transform = `translate(calc(${birdX}px - 50%), ${birdY}px) scaleX(1)`;
    }
  }
  requestAnimationFrame(animate);
}

animate();

bird.addEventListener("click", (e) => {
  e.stopPropagation();
  isFollowing = !isFollowing;

  img.style.animationPlayState = isFollowing ? "running" : "paused";

});

const orange = document.querySelector(".orange");

function playMove() {
  orange.style.animation += ", orange-move 6s linear";

  setTimeout(() => {
    orange.style.animation = "orange-fly 0.5s infinite";
  }, 6000);

  const delay = Math.random() * 3000 + 1000;

  setTimeout(playMove, 6000 + delay);
}

playMove();

const bubblepink = document.querySelector('.bubblepink');
const sound = document.getElementById('popSound');

bubblepink.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();

  bubblepink.classList.add('pop');

  setTimeout(() => {
    bubblepink.classList.remove('pop');
  }, 1500);
});

const bubbleblue = document.querySelector('.bubbleblue');


bubbleblue.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();

  bubbleblue.classList.add('pop');

  setTimeout(() => {
    bubbleblue.classList.remove('pop');
  }, 1500);
});

const bubblegreen = document.querySelector('.bubblegreen');


bubblegreen.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();

  bubblegreen.classList.add('pop');

  setTimeout(() => {
    bubblegreen.classList.remove('pop');
  }, 1500);
});

//_________________________________


window.addEventListener('load', () => {
  const canvas = document.getElementById('rainCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Drop {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height; 
      this.length = 10 + Math.random() * 20;
      this.speed = 4 + Math.random() * 6; 
      this.opacity = 0.2 + Math.random() * 0.5;
      this.width = 1;
    }
    fall() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }

  const drops = [];
  const numDrops = 300; 
  for (let i = 0; i < numDrops; i++) drops.push(new Drop());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(drop => drop.fall());
    requestAnimationFrame(animate);
  }

  animate();
});
