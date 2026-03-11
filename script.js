/* ========================================
   MOHINI AI – Light Theme + Robot Animations
   ======================================== */
"use strict";

/* ══════════════════════════════════════════
   1. ROBOT CANVAS – Moving AI robots in bg
   ══════════════════════════════════════════ */
(function initRobotCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "robotCanvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Scroll progress globally available
    let scrollY = 0;
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    // — Robot class —
    class Robot {
        constructor() {
            this.reset();
            this.y = Math.random() * H;
        }
        reset() {
            this.size = 28 + Math.random() * 22;
            this.x = Math.random() * 2000;
            this.y = -this.size - Math.random() * 200;
            this.baseVx = (Math.random() - 0.5) * 0.7;
            this.baseVy = 0.2 + Math.random() * 0.3;
            this.phase = Math.random() * Math.PI * 2;
            this.armPhase = Math.random() * Math.PI * 2;
            this.eyeBlink = Math.random() * 200;
            this.blinkCounter = 0;
            this.isBlinking = false;
            this.alpha = 0.18 + Math.random() * 0.12;
            this.type = Math.floor(Math.random() * 4); // 0 = classic, 1 = round, 2 = antenna, 3 = mini
            this.waveAmp = 3 + Math.random() * 5;
            this.gearAngle = 0;
        }
        update(dt, scrollSpeed) {
            const scrollBoost = scrollSpeed * 0.008;
            this.x += this.baseVx + Math.sin(this.phase) * 0.3;
            this.y += this.baseVy + scrollBoost;
            this.phase += 0.012;
            this.armPhase += 0.04 + scrollBoost * 0.02;
            this.gearAngle += 0.02 + scrollBoost * 0.01;
            this.blinkCounter++;
            if (this.blinkCounter > this.eyeBlink) {
                this.isBlinking = true;
                if (this.blinkCounter > this.eyeBlink + 8) {
                    this.isBlinking = false;
                    this.blinkCounter = 0;
                    this.eyeBlink = 100 + Math.random() * 200;
                }
            }
            if (this.y > H + this.size + 50 || this.x < -100 || this.x > W + 100) {
                this.reset();
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.globalAlpha = this.alpha;
            const s = this.size;
            const bob = Math.sin(this.phase * 2) * 2;
            ctx.translate(0, bob);

            if (this.type === 0) this.drawClassicRobot(ctx, s);
            else if (this.type === 1) this.drawRoundRobot(ctx, s);
            else if (this.type === 2) this.drawAntennaRobot(ctx, s);
            else this.drawGearBot(ctx, s);

            ctx.restore();
        }
        drawClassicRobot(ctx, s) {
            // Body
            ctx.fillStyle = "#818cf8";
            this.roundRect(ctx, -s * 0.4, -s * 0.1, s * 0.8, s * 0.65, 6);
            ctx.fill();
            // Head
            ctx.fillStyle = "#6366f1";
            this.roundRect(ctx, -s * 0.35, -s * 0.55, s * 0.7, s * 0.48, 8);
            ctx.fill();
            // Eyes
            ctx.fillStyle = this.isBlinking ? "#6366f1" : "#fff";
            ctx.beginPath(); ctx.arc(-s * 0.13, -s * 0.35, s * 0.08, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(s * 0.13, -s * 0.35, s * 0.08, 0, Math.PI * 2); ctx.fill();
            if (!this.isBlinking) {
                ctx.fillStyle = "#1e1b4b";
                ctx.beginPath(); ctx.arc(-s * 0.13, -s * 0.35, s * 0.04, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(s * 0.13, -s * 0.35, s * 0.04, 0, Math.PI * 2); ctx.fill();
            }
            // Mouth
            ctx.strokeStyle = "#c7d2fe";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-s * 0.1, -s * 0.18);
            ctx.lineTo(s * 0.1, -s * 0.18);
            ctx.stroke();
            // Arms (animated)
            const armSwing = Math.sin(this.armPhase) * 0.4;
            ctx.strokeStyle = "#818cf8";
            ctx.lineWidth = s * 0.08;
            ctx.lineCap = "round";
            // left arm
            ctx.beginPath();
            ctx.moveTo(-s * 0.4, s * 0.05);
            ctx.lineTo(-s * 0.6, s * 0.05 + Math.sin(this.armPhase) * s * 0.2);
            ctx.stroke();
            // right arm
            ctx.beginPath();
            ctx.moveTo(s * 0.4, s * 0.05);
            ctx.lineTo(s * 0.6, s * 0.05 + Math.sin(this.armPhase + Math.PI) * s * 0.2);
            ctx.stroke();
            // Legs
            ctx.lineWidth = s * 0.07;
            ctx.beginPath(); ctx.moveTo(-s * 0.15, s * 0.55); ctx.lineTo(-s * 0.2, s * 0.8); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(s * 0.15, s * 0.55); ctx.lineTo(s * 0.2, s * 0.8); ctx.stroke();
        }
        drawRoundRobot(ctx, s) {
            // Body circle
            ctx.fillStyle = "#06b6d4";
            ctx.beginPath(); ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2); ctx.fill();
            // Visor
            ctx.fillStyle = "#cffafe";
            ctx.beginPath();
            ctx.ellipse(0, -s * 0.05, s * 0.28, s * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();
            // Eye light
            ctx.fillStyle = this.isBlinking ? "#06b6d4" : "#0e7490";
            const ex = Math.sin(this.phase) * s * 0.06;
            ctx.beginPath(); ctx.arc(ex, -s * 0.05, s * 0.05, 0, Math.PI * 2); ctx.fill();
            // Little feet
            const legPhase = Math.sin(this.armPhase) * s * 0.08;
            ctx.fillStyle = "#0891b2";
            ctx.beginPath(); ctx.arc(-s * 0.15, s * 0.45 + legPhase, s * 0.08, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(s * 0.15, s * 0.45 - legPhase, s * 0.08, 0, Math.PI * 2); ctx.fill();
            // hovering rings
            ctx.strokeStyle = "rgba(6,182,212,0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.ellipse(0, s * 0.55, s * 0.3, s * 0.06, 0, 0, Math.PI * 2); ctx.stroke();
        }
        drawAntennaRobot(ctx, s) {
            // Antenna
            const antBob = Math.sin(this.armPhase * 2) * s * 0.08;
            ctx.strokeStyle = "#a78bfa";
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, -s * 0.5); ctx.lineTo(0, -s * 0.75 + antBob); ctx.stroke();
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath(); ctx.arc(0, -s * 0.78 + antBob, s * 0.06, 0, Math.PI * 2); ctx.fill();
            // Head – square
            ctx.fillStyle = "#a78bfa";
            this.roundRect(ctx, -s * 0.3, -s * 0.52, s * 0.6, s * 0.48, 10);
            ctx.fill();
            // Eyes – X shaped when blinking
            if (this.isBlinking) {
                ctx.strokeStyle = "#4c1d95";
                ctx.lineWidth = 2;
                [-1, 1].forEach(side => {
                    const cx = side * s * 0.12;
                    const cy = -s * 0.32;
                    ctx.beginPath(); ctx.moveTo(cx - 3, cy - 3); ctx.lineTo(cx + 3, cy + 3); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(cx + 3, cy - 3); ctx.lineTo(cx - 3, cy + 3); ctx.stroke();
                });
            } else {
                ctx.fillStyle = "#fff";
                ctx.beginPath(); ctx.arc(-s * 0.12, -s * 0.32, s * 0.07, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(s * 0.12, -s * 0.32, s * 0.07, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#4c1d95";
                ctx.beginPath(); ctx.arc(-s * 0.12, -s * 0.32, s * 0.03, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(s * 0.12, -s * 0.32, s * 0.03, 0, Math.PI * 2); ctx.fill();
            }
            // Body
            ctx.fillStyle = "#8b5cf6";
            this.roundRect(ctx, -s * 0.25, -s * 0.06, s * 0.5, s * 0.5, 6);
            ctx.fill();
            // Waving arm
            ctx.strokeStyle = "#a78bfa";
            ctx.lineWidth = s * 0.07;
            ctx.lineCap = "round";
            const wave = Math.sin(this.armPhase) * 0.6;
            ctx.beginPath();
            ctx.moveTo(s * 0.25, s * 0.1);
            ctx.lineTo(s * 0.5, s * 0.1 - Math.sin(this.armPhase) * s * 0.25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-s * 0.25, s * 0.1);
            ctx.lineTo(-s * 0.5, s * 0.1 + Math.sin(this.armPhase + 1) * s * 0.15);
            ctx.stroke();
        }
        drawGearBot(ctx, s) {
            // Spinning gear
            ctx.save();
            ctx.rotate(this.gearAngle);
            ctx.strokeStyle = "rgba(99,102,241,0.4)";
            ctx.lineWidth = 2;
            const teeth = 8;
            for (let i = 0; i < teeth; i++) {
                const a = (i / teeth) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * s * 0.2, Math.sin(a) * s * 0.2);
                ctx.lineTo(Math.cos(a) * s * 0.35, Math.sin(a) * s * 0.35);
                ctx.stroke();
            }
            ctx.beginPath(); ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
            // Center dot
            ctx.fillStyle = "#6366f1";
            ctx.beginPath(); ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2); ctx.fill();
            // Small orbiting dot
            const oa = this.gearAngle * 2;
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(Math.cos(oa) * s * 0.28, Math.sin(oa) * s * 0.28, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
        }
        roundRect(ctx, x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        }
    }

    // — Floating particles —
    class Particle {
        constructor() {
            this.x = Math.random() * 2000;
            this.y = Math.random() * 1200;
            this.r = 0.5 + Math.random() * 1.5;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.alpha = 0.08 + Math.random() * 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0) this.x = W;
            if (this.x > W) this.x = 0;
            if (this.y < 0) this.y = H;
            if (this.y > H) this.y = 0;
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,102,241,${this.alpha})`;
            ctx.fill();
        }
    }

    // Create robots & particles
    const robots = [];
    const particles = [];
    const NUM_ROBOTS = 12;
    const NUM_PARTICLES = 45;

    for (let i = 0; i < NUM_ROBOTS; i++) robots.push(new Robot());
    for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

    let lastScroll = 0;
    let scrollSpeed = 0;

    function animate() {
        scrollSpeed = Math.abs(scrollY - lastScroll);
        lastScroll = scrollY;

        ctx.clearRect(0, 0, W, H);

        // Draw particles
        particles.forEach(p => { p.update(); p.draw(ctx); });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 120) * 0.06})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw and update robots
        robots.forEach(r => {
            r.update(16, scrollSpeed);
            r.draw(ctx);
        });

        requestAnimationFrame(animate);
    }
    animate();
})();


/* ══════════════════════════════════════════
   2. SCROLL-TRIGGERED FLOATING ROBOT HELPER
   ══════════════════════════════════════════ */
(function addScrollRobots() {
    // Create SVG robot elements that appear in each section on scroll
    const sectionIds = ["features", "architecture", "codeflow", "commands", "demo", "download"];
    const robotEmojis = ["🤖", "⚙️", "🔧", "🧠", "💡", "🚀"];
    const positions = [
        { right: "30px", top: "50px" },
        { left: "20px", top: "60px" },
        { right: "40px", top: "40px" },
        { left: "30px", top: "70px" },
        { right: "25px", top: "55px" },
        { left: "35px", top: "45px" },
    ];

    sectionIds.forEach((id, i) => {
        const section = document.getElementById(id);
        if (!section) return;
        section.style.position = "relative";

        const bot = document.createElement("div");
        bot.className = "section-bot";
        bot.textContent = robotEmojis[i];
        bot.style.cssText = `
      position: absolute;
      font-size: 48px;
      z-index: 3;
      opacity: 0;
      transform: scale(0.4) translateY(30px) rotate(-20deg);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      filter: drop-shadow(0 4px 12px rgba(99,102,241,0.2));
      ${Object.entries(positions[i]).map(([k, v]) => `${k}:${v}`).join(";")}
    `;
        section.appendChild(bot);

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bot.style.opacity = "0.7";
                        bot.style.transform = "scale(1) translateY(0) rotate(0deg)";
                    }, 300);
                } else {
                    bot.style.opacity = "0";
                    bot.style.transform = "scale(0.4) translateY(30px) rotate(-20deg)";
                }
            });
        }, { threshold: 0.2 });
        obs.observe(section);
    });

    // Bobbing animation for section bots
    let t = 0;
    function bobBots() {
        t += 0.02;
        document.querySelectorAll(".section-bot").forEach((bot, i) => {
            if (bot.style.opacity !== "0") {
                const by = Math.sin(t + i) * 6;
                const br = Math.sin(t * 0.7 + i) * 5;
                bot.style.transform = `scale(1) translateY(${by}px) rotate(${br}deg)`;
            }
        });
        requestAnimationFrame(bobBots);
    }
    bobBots();
})();


/* ══════════════════════════════════════════
   3. SCROLL-TRIGGERED AI BRAIN ANIMATION
   ══════════════════════════════════════════ */
(function addAIBrainOnScroll() {
    // Creates a floating "AI thinking" animation that appears during code flow section
    const codeFlowSection = document.getElementById("codeflow");
    if (!codeFlowSection) return;

    const brainEl = document.createElement("div");
    brainEl.style.cssText = `
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%) scale(0.5);
    width: 80px; height: 80px;
    pointer-events: none;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1);
  `;

    // SVG brain with pulses
    brainEl.innerHTML = `
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="35" stroke="#6366f1" stroke-width="2" opacity="0.3">
        <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="40" r="28" stroke="#818cf8" stroke-width="1.5" opacity="0.4">
        <animate attributeName="r" values="28;31;28" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="40" r="20" fill="#6366f1" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="40" y="48" text-anchor="middle" font-size="28">🧠</text>
      <!-- Neural sparks -->
      <circle cx="20" cy="25" r="2" fill="#f59e0b">
        <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="20" r="2" fill="#22d3ee">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="55" cy="58" r="2" fill="#a78bfa">
        <animate attributeName="opacity" values="0;1;0" dur="1.3s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="22" cy="55" r="2" fill="#10b981">
        <animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
    document.body.appendChild(brainEl);

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                brainEl.style.opacity = "1";
                brainEl.style.transform = "translateY(-50%) scale(1)";
            } else {
                brainEl.style.opacity = "0";
                brainEl.style.transform = "translateY(-50%) scale(0.5)";
            }
        });
    }, { threshold: 0.15 });
    obs.observe(codeFlowSection);
})();


/* ══════════════════════════════════════════
   4. NAVBAR SCROLL EFFECT
   ══════════════════════════════════════════ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });


/* ══════════════════════════════════════════
   5. SCROLL-REVEAL (IntersectionObserver)
   ══════════════════════════════════════════ */
(function initReveal() {
    const allEls = document.querySelectorAll(".reveal-up,.reveal-right,.reveal-card,.reveal-flow");

    document.querySelectorAll(".reveal-card[data-delay]").forEach(el => {
        el.style.transitionDelay = el.dataset.delay + "ms";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    allEls.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════
   6. ANIMATED COUNTER (hero stats)
   ══════════════════════════════════════════ */
function animateCounter(el, target, duration = 1600) {
    let start = null;
    const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, parseInt(el.dataset.count, 10));
            counterObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-n[data-count]").forEach(el => counterObs.observe(el));


/* ══════════════════════════════════════════
   7. TERMINAL TYPEWRITER
   ══════════════════════════════════════════ */
const sequences = [
    {
        cmd: "/agent Create a study plan for Java and generate slides",
        response: "🤖 Agent Orchestrator started...\n1. TaskPlanner: 4 steps generated.\n2. ToolExecutor: Creating roadmap...\n3. ToolExecutor: Generating PPT...\n✅ Task completed autonomously!",
        type: "success",
    },
    {
        cmd: "/visualize bubble sort",
        response: "📊 Opening Algorithm Visualizer...\n[Bubble Sort] - Time: O(n²) | Space: O(1)\nInteractive panel launched successfully.",
        type: "success",
    },
    {
        cmd: "/ppt AI in Healthcare",
        response: "✅ PowerPoint Presentation generated successfully!\n💾 Saved to: data/Presentation_171010.pptx",
        type: "success",
    },
    {
        cmd: "/debug find bugs in this code",
        response: "🐞 Analysis Complete:\n- Line 14: Resource leak in 'inputStream'.\n- Line 22: Potential NullPointerException.\n✨ Fixes suggested and applied.",
        type: "ai",
    },
    {
        cmd: "/roadmap Machine Learning",
        response: "🗺 8-Week Research Roadmap Generated:\nWeek 1: Linear Algebra & Calculus\nWeek 2: Statistics & Probability...\nCheck the Learning Tab for details.",
        type: "ai",
    },
    {
        cmd: "/analyze",
        response: "✓ Document analyzed: 'project_brief.pdf'\nExtracting key concepts and summarizing...",
        type: "success",
    },
];

let seqIdx = 0;
const typedTextEl = document.getElementById("typedText");
const terminalBody = document.getElementById("terminalBody");

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(text, el, speed = 38) {
    for (const ch of text) {
        el.textContent += ch;
        await sleep(speed + Math.random() * 20);
    }
}

async function addResponseLine(text, type) {
    const div = document.createElement("div");
    div.className = `t-response ${type}`;
    terminalBody.appendChild(div);
    await typeText(text, div, 18);
    return div;
}

async function addNewPrompt() {
    const div = document.createElement("div");
    div.className = "t-new-prompt";
    div.innerHTML = `<span class="t-prefix">mohini&gt;</span> <span class="t-text"></span>`;
    terminalBody.appendChild(div);
    return div.querySelector(".t-text");
}

async function runTerminal() {
    while (true) {
        const seq = sequences[seqIdx % sequences.length];
        seqIdx++;

        const promptTextEl = terminalBody.querySelector(".t-text:last-of-type") || typedTextEl;
        promptTextEl.textContent = "";
        await sleep(600);
        await typeText(seq.cmd, promptTextEl);
        await sleep(400);

        await addResponseLine(seq.response, seq.type);
        await sleep(2000);

        const lines = terminalBody.querySelectorAll(".t-response");
        if (lines.length > 4) lines[0].remove();
        const prompts = terminalBody.querySelectorAll(".t-new-prompt");
        if (prompts.length > 3) prompts[0].remove();

        const newPromptText = await addNewPrompt();
        const cursor = document.querySelector(".t-cursor");
        if (cursor) newPromptText.after(cursor);
        await sleep(800);
    }
}
runTerminal();


/* ══════════════════════════════════════════
   8. HAMBURGER MENU
   ══════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
    if (open) {
        navLinks.style.cssText = `
      display:flex;flex-direction:column;position:fixed;
      top:68px;left:0;right:0;background:rgba(255,255,255,0.97);
      backdrop-filter:blur(20px);padding:24px;gap:20px;
      border-bottom:1px solid rgba(99,102,241,0.12);z-index:999;
      animation:slideDown 0.3s ease;
    `;
    } else {
        navLinks.removeAttribute("style");
    }
});

navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navLinks.removeAttribute("style");
    });
});

const slideStyle = document.createElement("style");
slideStyle.textContent = `
@keyframes slideDown {
  from { opacity:0; transform:translateY(-16px); }
  to { opacity:1; transform:translateY(0); }
}`;
document.head.appendChild(slideStyle);


/* ══════════════════════════════════════════
   9. TECH LAYER ENTRANCE
   ══════════════════════════════════════════ */
const layerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll(".tech-layer").forEach((layer, i) => {
                setTimeout(() => {
                    layer.style.opacity = "1";
                    layer.style.transform = "translateY(0)";
                }, i * 180);
            });
            layerObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const techVisual = document.querySelector(".tech-stack-visual");
if (techVisual) {
    techVisual.querySelectorAll(".tech-layer").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    });
    layerObs.observe(techVisual);
}


/* ══════════════════════════════════════════
   10. FLOW STEP PROGRESS LINE
   ══════════════════════════════════════════ */
const flowContainer = document.querySelector(".flow-container");
if (flowContainer) {
    const progressLine = document.createElement("div");
    Object.assign(progressLine.style, {
        position: "absolute", left: "50%", top: "0",
        width: "3px", height: "0%",
        background: "linear-gradient(180deg, #6366f1, #06b6d4, #a78bfa)",
        transform: "translateX(-50%)", zIndex: "0",
        transition: "height 0.3s ease", borderRadius: "2px", opacity: "0.5",
    });
    flowContainer.style.position = "relative";
    flowContainer.appendChild(progressLine);

    window.addEventListener("scroll", () => {
        const rect = flowContainer.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / (flowContainer.offsetHeight + window.innerHeight) * 160));
        progressLine.style.height = pct + "%";
    }, { passive: true });
}


/* ══════════════════════════════════════════
   11. ACTIVE NAV LINK TRACKING
   ══════════════════════════════════════════ */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");

const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => a.classList.remove("active-nav"));
            const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (match) match.classList.add("active-nav");
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => sectionObs.observe(s));

const navActiveStyle = document.createElement("style");
navActiveStyle.textContent = `.active-nav{color:#1e293b !important;font-weight:600 !important;}.active-nav::after{width:100% !important;}`;
document.head.appendChild(navActiveStyle);


/* ══════════════════════════════════════════
   12. CARD TILT EFFECT
   ══════════════════════════════════════════ */
document.querySelectorAll(".feature-card, .cmd-card, .arch-pkg").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        card.style.transform = `perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
        setTimeout(() => { card.style.transition = ""; }, 400);
    });
});


/* ══════════════════════════════════════════
   13. COPY CODE ON CLICK
   ══════════════════════════════════════════ */
document.querySelectorAll(".flow-code pre").forEach(pre => {
    pre.style.cursor = "pointer";
    pre.title = "Click to copy";
    pre.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(pre.textContent);
            pre.style.outline = "2px solid #10b981";
            setTimeout(() => { pre.style.outline = ""; }, 900);
        } catch { }
    });
});


/* ══════════════════════════════════════════
   14. SETUP STEP HOVER
   ══════════════════════════════════════════ */
document.querySelectorAll(".setup-step").forEach(step => {
    step.addEventListener("mouseenter", () => {
        step.style.borderColor = "rgba(99,102,241,0.35)";
        step.style.background = "rgba(99,102,241,0.04)";
    });
    step.addEventListener("mouseleave", () => {
        step.style.borderColor = "";
        step.style.background = "";
    });
});


/* ══════════════════════════════════════════
   15. ORB MOUSE PARALLAX
   ══════════════════════════════════════════ */
const orbs = document.querySelectorAll(".orb");
document.addEventListener("mousemove", (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
        const factor = (i + 1) * 12;
        orb.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
    });
}, { passive: true });


/* ══════════════════════════════════════════
   16. SCROLL-TRIGGERED DATA STREAM EFFECT
   Particles burst when entering code flow
   ══════════════════════════════════════════ */
(function addDataStreamBurst() {
    const cfSection = document.getElementById("codeflow");
    if (!cfSection) return;

    let hasBurst = false;
    const burstObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasBurst) {
                hasBurst = true;
                createDataBurst();
                // Allow re-trigger
                setTimeout(() => { hasBurst = false; }, 3000);
            }
        });
    }, { threshold: 0.3 });
    burstObs.observe(cfSection);

    function createDataBurst() {
        const rect = cfSection.getBoundingClientRect();
        const cx = window.innerWidth / 2;
        const cy = rect.top + 120;
        const symbols = ["0", "1", "{", "}", "/", "→", "⚡", "✦", "●"];

        for (let i = 0; i < 24; i++) {
            const el = document.createElement("div");
            const angle = (i / 24) * Math.PI * 2;
            const dist = 80 + Math.random() * 120;
            const sym = symbols[Math.floor(Math.random() * symbols.length)];

            el.textContent = sym;
            el.style.cssText = `
        position:fixed;left:${cx}px;top:${cy}px;
        font-size:${12 + Math.random() * 10}px;
        font-family:var(--font-mono);
        color:${["#6366f1", "#06b6d4", "#a78bfa", "#10b981", "#f59e0b"][Math.floor(Math.random() * 5)]};
        pointer-events:none;z-index:10;opacity:1;font-weight:700;
        transition:all 1.2s cubic-bezier(0.16,1,0.3,1);
      `;
            document.body.appendChild(el);

            requestAnimationFrame(() => {
                el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0.3)`;
                el.style.opacity = "0";
            });

            setTimeout(() => el.remove(), 1300);
        }
    }
})();


console.log(
    `%c🤖 MOHINI AI\n%cBuilt with Java Swing + OpenRouter GPT-4o-mini\nMade by @IDZz`,
    "color:#6366f1;font-size:22px;font-weight:900;",
    "color:#64748b;font-size:12px;"
);


/* ══════════════════════════════════════════
   17. CONCEPT MAP SCROLL ANIMATION
   ══════════════════════════════════════════ */
(function initConceptMap() {
    const wrapper = document.getElementById("conceptMapWrapper");
    if (!wrapper) return;

    const nodes = wrapper.querySelectorAll(".cm-hidden");
    const lines = wrapper.querySelectorAll(".cm-line");
    const pulses = wrapper.querySelectorAll(".cm-pulse");

    const cmObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate lines first
                lines.forEach((line, i) => {
                    setTimeout(() => line.classList.add("visible"), i * 150);
                });

                // Animate nodes with stagger
                nodes.forEach(node => {
                    const delay = parseInt(node.dataset.delay || 0, 10);
                    setTimeout(() => node.classList.add("cm-visible"), delay + 200);
                });

                // Animate pulses
                setTimeout(() => {
                    pulses.forEach(p => p.classList.add("visible"));
                }, 1200);

                cmObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cmObs.observe(wrapper);
})();


/* ══════════════════════════════════════════
   18. HOW IT WORKS TIMELINE ANIMATION
   ══════════════════════════════════════════ */
(function initHIWTimeline() {
    const timeline = document.getElementById("hiwTimeline");
    if (!timeline) return;

    const steps = timeline.querySelectorAll(".hiw-step");
    const progressFill = document.getElementById("hiwProgressFill");
    let revealedCount = 0;

    const stepObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("hiw-visible");
                revealedCount++;
                // Update progress bar
                const pct = (revealedCount / steps.length) * 100;
                if (progressFill) progressFill.style.height = pct + "%";
                stepObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

    steps.forEach(s => stepObs.observe(s));
})();


/* ══════════════════════════════════════════
   19. SCROLL-TRIGGERED VIDEO
   ══════════════════════════════════════════ */
(function initVideoDemo() {
    const video = document.getElementById("demoVideo");
    const overlay = document.getElementById("vidOverlay");
    if (!video) return;

    const vidObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => console.log("Video autoplay blocked", e));
                if (overlay) overlay.style.opacity = "0";
            } else {
                video.pause();
                if (overlay) overlay.style.opacity = "1";
            }
        });
    }, { threshold: 0.4 });

    vidObs.observe(video);
})();


/* ══════════════════════════════════════════
   20. AESTHETIC UPGRADES
   ══════════════════════════════════════════ */

// 20.1 Custom Cursor
const cursor = document.getElementById("customCursor");
if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a, button, .feature-card, .arch-pkg, .terminal-body").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
}

// 20.2 Theme Toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    const savedTheme = localStorage.getItem("mohini-theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        localStorage.setItem("mohini-theme", newTheme);
    });
}

// 20.3 Spotlight Feature Cards
document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", x);
        card.style.setProperty("--mouse-y", y);
    });
});

// 20.4 Text Scramble / Decryption Effect
const characters = "!<>-_\\\\/[]{}—=+*^?#________";
function scrambleText(element, originalText) {
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

        if (iteration >= originalText.length) {
            clearInterval(interval);
        }
        iteration += 1 / 3;
    }, 30);
}

const decryptObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h2 = entry.target;
            if (!h2.dataset.scrambled) {
                h2.dataset.scrambled = "true";
                // temporarily remove innerHTML nodes and scramble pure text
                const originalText = h2.innerText;
                const htmlCache = h2.innerHTML; // cache gradient spans if any
                scrambleText(h2, originalText);
                setTimeout(() => { h2.innerHTML = htmlCache; }, originalText.length * 30 * 3 + 100);
            }
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll(".section-title").forEach(title => decryptObs.observe(title));

// 20.5 Interactive Hero Terminal
let terminalActive = false;
let terminalIntervals = []; // Store timeouts to clear them
const termBody = document.getElementById("terminalBody");
if (termBody) {
    termBody.addEventListener("click", () => {
        if (!terminalActive) {
            terminalActive = true;
            // Stop automated terminal
            termBody.innerHTML = '<div class="t-line"><span class="t-prefix">mohini&gt;</span> <input type="text" id="termInput" autofocus style="background:transparent;border:none;color:#e2e8f0;font-family:inherit;font-size:inherit;outline:none;width:100%"/></div>';
            const input = document.getElementById("termInput");
            if (input) {
                input.focus();
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && input.value.trim() !== "") {
                        const val = input.value;
                        input.outerHTML = `<span class="t-text">${val}</span>`;
                        // mock response
                        let responseText = "MOHINI AI processed command: " + val;
                        if (val.includes("help")) responseText = "Available commands: /code, /calc, /todo, /notes, /remember...";

                        const resDiv = document.createElement("div");
                        resDiv.className = "t-response ai";
                        resDiv.textContent = responseText;
                        termBody.appendChild(resDiv);

                        // New input line
                        setTimeout(() => {
                            const newRow = document.createElement("div");
                            newRow.className = "t-line";
                            newRow.innerHTML = '<span class="t-prefix">mohini&gt;</span> <input type="text" id="termInput" autofocus style="background:transparent;border:none;color:#e2e8f0;font-family:inherit;font-size:inherit;outline:none;width:100%"/>';
                            termBody.appendChild(newRow);
                            document.getElementById("termInput").focus();
                            termBody.scrollTop = termBody.scrollHeight;
                        }, 500);
                    }
                });
            }
        }
    });
}

// 20.6 Three.js Hero Canvas Particles
if (typeof THREE !== 'undefined' && document.getElementById("heroCanvas")) {
    const canvas = document.getElementById("heroCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    const clock = new THREE.Clock();

    function animateThree() {
        requestAnimationFrame(animateThree);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.1;
        particlesMesh.rotation.x = -mouseY * 0.5;
        particlesMesh.rotation.y += mouseX * 0.5;

        renderer.render(scene, camera);
    }
    animateThree();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

