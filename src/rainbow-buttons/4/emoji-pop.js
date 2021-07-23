class Fountain {
  constructor() {
    this.limit = 7;
    this.particles = [];
    this.autoAddParticle = false;
    this.height = document.documentElement.clientHeight;
    this.sizes = [15, 20, 25, 35, 45];
    this.variants = ["🌈"];
    this.addHandlers();
    this.loop();
  }

  loop() {
    if (this.autoAddParticle && this.particles.length < this.limit) {
      this.createParticle();
    }

    this.updateParticles();

    requestAnimationFrame(this.loop.bind(this));
  }

  addHandlers() {
    const isTouchInteraction =
      "ontouchstart" in window || navigator.msMaxTouchPoints;

    const tap = isTouchInteraction ? "touchstart" : "mousedown";
    const tapCancel = isTouchInteraction ? "touchcancel" : "contextmenu";
    const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
    const move = isTouchInteraction ? "touchmove" : "mousemove";

    document.addEventListener(
      move,
      (e) => {
        this.mouseX = e.pageX || e.touches[0].pageX;
        this.mouseY = e.pageY || e.touches[0].pageY;
      },
      { passive: false }
    );

    document.getElementById("rainbow-button").addEventListener(tap, (e) => {
      this.mouseX = e.pageX || e.touches[0].pageX;
      this.mouseY = e.pageY || e.touches[0].pageY;
      this.autoAddParticle = true;
    });
    
    document.addEventListener(tapCancel, () => {
      this.autoAddParticle = false;
    });

    document.addEventListener(tapEnd, () => {
      this.autoAddParticle = false;
    });

    document.addEventListener("mouseleave", () => {
      this.autoAddParticle = false;
    });
  }

  createParticle() {
    const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    const speedHorz = Math.random() * 7;
    const speedUp = Math.random() * 35;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 25 * (Math.random() <= 0.5 ? -1 : 1);
    const top = this.mouseY - size / 2;
    const left = this.mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement("span");
    particle.innerHTML = this.variants[
      Math.floor(Math.random() * this.variants.length)
    ];
    particle.classList.add("particle");

    particle.setAttribute(
      "style",
      `
      -webkit-user-select: none;
      font-size: ${size}px;
      left: ${left}px;
      pointer-events: none;
      position: absolute;
      top: ${top}px;
      transform: rotate(${spinVal}deg);
    `
    );

    document.getElementById("content").appendChild(particle);

    this.particles.push({
      element: particle,
      size,
      speedHorz,
      speedUp,
      spinVal,
      spinSpeed,
      top,
      left,
      direction,
    });
  }

  updateParticles() {
    this.particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (p.top >= this.height + p.size) {
        this.particles = this.particles.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        "style",
        `
        -webkit-user-select: none;
        font-size: ${p.size}px;
        left: ${p.left}px;
        pointer-events: none;
        position: absolute;
        top: ${p.top}px;
        transform: rotate(${p.spinVal}deg);
      `
      );
    });
  }
}

new Fountain();