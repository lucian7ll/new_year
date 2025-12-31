/* ===== MUSIC ===== */
function startMusic() {
    const music = document.getElementById("music");
    music.play();
}

/* ===== MESSAGE TOGGLE ===== */
function toggleGreeting() {
    const box = document.getElementById("greetingBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

/* ===== FIREWORKS ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.speed = Math.random() * 3 + 4;
    this.exploded = false;
    this.particles = [];
}

Firework.prototype.update = function () {
    if (!this.exploded) {
        this.y -= this.speed;
        if (this.y < canvas.height / 2) {
            this.exploded = true;
            for (let i = 0; i < 30; i++) {
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    vx: Math.cos(i) * Math.random() * 4,
                    vy: Math.sin(i) * Math.random() * 4,
                    life: 60
                });
            }
        }
    }
};

Firework.prototype.draw = function () {
    if (!this.exploded) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    } else {
        this.particles.forEach(p => {
            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
            }
        });
    }
};

function launchFireworks() {
    setInterval(() => {
        fireworks.push(new Firework());
    }, 450);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.every(p => p.life <= 0)) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

launchFireworks();
animate();

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};