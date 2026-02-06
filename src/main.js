import "./style.css";

const btn = document.getElementById("bouton");
const lune = document.querySelector(".lune");
const cloudImg = btn.querySelector("img"); 
document.body.dataset.etat = 0;

const ambiances = {
  0: document.getElementById("ambiance-prairie"),
  1: document.getElementById("ambiance-pluie"),
};

const images = {
  0: "image/cloud.png",      
  1: "image/cloud-rain.png", 
};

function playAmbiance(etat) {
  Object.values(ambiances).forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  ambiances[etat]?.play();
}

function updateButtonImage(etat) {
  cloudImg.src = images[etat] || "image/cloud.png";
  cloudImg.alt = etat === 0 ? "nuage" : "pluie";
}

updateButtonImage(0);
playAmbiance(0);

btn.addEventListener("click", () => {
  let etat = Number(btn.dataset.etat);
  etat = (etat + 1) % 3; 
  btn.dataset.etat = etat;
  document.body.dataset.etat = etat;

  updateButtonImage(etat);
  playAmbiance(etat);
});

lune.addEventListener("click", () => {
  const etat = lune.dataset.etat === "0" ? "1" : "0";
  lune.dataset.etat = etat;

  document.querySelector(".chambre")
    .classList.toggle("nuit", etat === "1");
});

// ————————————————————


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

   
    birdX += dx * 0.01; 
    birdY += dy * 0.01;

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

const bubbles = document.querySelectorAll('.bubblepink, .bubbleblue, .bubblegreen');
const sound = document.getElementById('popSound');
const respawnTime = 2000; 

bubbles.forEach(bubble => {
  bubble.addEventListener('click', () => {
    sound.currentTime = 0;
    sound.play();

    bubble.classList.add('pop');

    bubble.addEventListener('animationend', () => {
      bubble.style.display = 'none';

      setTimeout(() => {
        bubble.style.display = 'inline-block';
        bubble.classList.remove('pop'); 
      }, respawnTime);
    }, { once: true });
  });
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

//_________________________________

class EyePair {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas #${canvasId} introuvable !`);
      return;
    }

    this.canvas.width = 300;
    this.canvas.height = 150;
    this.ctx = this.canvas.getContext("2d");

    this.blinkLeft = 1;
    this.blinkRight = 1;
    this.dirLeft = -1;
    this.dirRight = -1;
    this.pauseLeft = 0;
    this.pauseRight = 30;

    this.mouseX = 150;
    this.mouseY = 75;

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

eye(x, ry) {
  const dx = this.mouseX - x;
  const dy = this.mouseY - 75;

  this.ctx.beginPath();
  this.ctx.ellipse(x, 75, 30, ry, 0, 0, Math.PI * 2);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.stroke();

  const maxOffsetX = 15; 
  const maxOffsetY = 12; 

  const distance = Math.sqrt(dx*dx + dy*dy);
  let pupilleOffsetX = 0;
  let pupilleOffsetY = 0;

  if (distance > 0) {
    pupilleOffsetX = (dx / distance) * maxOffsetX;
    pupilleOffsetY = (dy / distance) * maxOffsetY;
  }

  this.ctx.beginPath();
  this.ctx.arc(x + pupilleOffsetX, 75 + pupilleOffsetY, 6, 0, Math.PI * 2);
  this.ctx.fillStyle = "black";
  this.ctx.fill();
}

  drawEyes() {
    const ryLeft = Math.max(0, 20 * this.blinkLeft);
    const ryRight = Math.max(0, 20 * this.blinkRight);
    this.eye(100, ryLeft);
    this.eye(200, ryRight);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.pauseLeft > 0) this.pauseLeft--;
    else {
      this.blinkLeft += 0.08 * this.dirLeft;
      if (this.blinkLeft <= 0) { this.blinkLeft = 0; this.dirLeft = 1; }
      if (this.blinkLeft >= 1) { 
        this.blinkLeft = 1; 
        this.dirLeft = -1; 
        this.pauseLeft = 60 + Math.random() * 60; 
      }
    }

    if (this.pauseRight > 0) this.pauseRight--;
    else {
      this.blinkRight += 0.08 * this.dirRight;
      if (this.blinkRight <= 0) { this.blinkRight = 0; this.dirRight = 1; }
      if (this.blinkRight >= 1) { 
        this.blinkRight = 1; 
        this.dirRight = -1; 
        this.pauseRight = 60 + Math.random() * 60; 
      }
    }

    this.drawEyes();
    requestAnimationFrame(this.animate);
  }
}

new EyePair("eyes1");
new EyePair("eyes2");
new EyePair("eyes3");
new EyePair("eyes4");
new EyePair("eyes5");
new EyePair("eyes6");
