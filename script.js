const projectGrid = document.getElementById("projectGrid");
const projectFilters = document.getElementById("projectFilters");
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const siteHeader = document.getElementById("siteHeader");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const projectList = typeof projects !== "undefined" && Array.isArray(projects) ? projects : [];

let activeCategory = "All";
let visibleProjects = [];
let currentModalIndex = 0;

/* ---------------- Helpers ---------------- */

function createTechChips(tech = []) {
  return tech.map(item => `<span class="tech-chip">${item}</span>`).join("");
}

function projectNumber(project) {
  return String(projectList.indexOf(project) + 1).padStart(2, "0");
}

function linkButtons(project, className = "small-button") {
  const github = project.github
    ? `<a class="${className}" href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`
    : "";
  const demo = project.demo
    ? `<a class="${className}" href="${project.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`
    : "";
  return github + demo;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------- Projects ---------------- */

function createProjectCard(project, position) {
  const featured = project.featured && activeCategory === "All";

  return `
    <article class="project-card spotlight reveal${featured ? " featured" : ""}" style="--delay:${position * 70}ms">
      <button class="project-image" data-position="${position}" aria-label="View details for ${project.title}">
        <img src="${project.image}" alt="${project.title} screenshot" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
        <span class="project-image-fallback">Project ${projectNumber(project)}</span>
        <span class="project-number">${projectNumber(project)}</span>
      </button>
      <div class="project-body">
        <div class="project-meta">
          <p class="project-category">${project.category}</p>
          ${featured ? `<span class="featured-badge">★ Featured</span>` : ""}
        </div>
        <h3>${project.title}</h3>
        <p class="project-subtitle">${project.subtitle || ""}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">${createTechChips(project.tech)}</div>
        <div class="project-actions">
          <button class="small-button primary details-button" data-position="${position}">
            View details <span aria-hidden="true">→</span>
          </button>
          ${linkButtons(project)}
        </div>
      </div>
    </article>`;
}

function renderFilters() {
  const categories = ["All", ...new Set(projectList.map(project => project.category).filter(Boolean))];
  if (categories.length <= 2) {
    projectFilters.hidden = true;
    return;
  }

  projectFilters.innerHTML = categories.map(category => {
    const count = category === "All"
      ? projectList.length
      : projectList.filter(project => project.category === category).length;
    const active = category === activeCategory;
    return `<button class="filter-button${active ? " active" : ""}" role="tab" aria-selected="${active}" data-category="${category}">
      ${category}<span>${count}</span>
    </button>`;
  }).join("");

  projectFilters.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProjects();
    });
  });
}

function renderProjects() {
  visibleProjects = activeCategory === "All"
    ? [...projectList].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    : projectList.filter(project => project.category === activeCategory);

  projectGrid.innerHTML = visibleProjects.map(createProjectCard).join("");

  projectGrid.querySelectorAll("[data-position]").forEach(element => {
    element.addEventListener("click", () => openProjectModal(Number(element.dataset.position)));
  });

  initSpotlight(projectGrid);
  initRevealAnimations();
}

function openProjectModal(position) {
  const project = visibleProjects[position];
  if (!project) return;
  currentModalIndex = position;

  const highlights = (project.highlights || []).map(item => `<li>${item}</li>`).join("");
  const links = linkButtons(project, "button secondary");
  const hasNav = visibleProjects.length > 1;

  modalContent.innerHTML = `
    <div class="modal-hero">
      <img src="${project.image}" alt="${project.title} screenshot"
        onerror="this.parentElement.classList.add('no-image'); this.remove();">
    </div>
    <div class="modal-inner">
      <p class="project-category">${project.category}</p>
      <h2 id="modalTitle">${project.title}</h2>
      <p class="modal-subtitle">${project.subtitle || ""}</p>

      <h3>Overview</h3>
      <p>${project.description}</p>

      ${highlights ? `<h3>Highlights</h3><ul class="highlight-list">${highlights}</ul>` : ""}

      <h3>Tools &amp; technologies</h3>
      <div class="project-tech">${createTechChips(project.tech)}</div>

      ${links ? `<div class="modal-links">${links}</div>` : ""}

      ${hasNav ? `
      <div class="modal-nav">
        <button class="small-button" data-step="-1">← Previous</button>
        <span>${position + 1} / ${visibleProjects.length}</span>
        <button class="small-button" data-step="1">Next →</button>
      </div>` : ""}
    </div>`;

  modalContent.querySelectorAll("[data-step]").forEach(button => {
    button.addEventListener("click", () => stepModal(Number(button.dataset.step)));
  });

  if (!modal.open) {
    modal.showModal();
    document.body.classList.add("modal-open");
  }
  modal.scrollTop = 0;
}

function stepModal(step) {
  const total = visibleProjects.length;
  openProjectModal((currentModalIndex + step + total) % total);
}

function closeProjectModal() {
  modal.close();
}

closeModal.addEventListener("click", closeProjectModal);
modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

modal.addEventListener("click", event => {
  const rect = modal.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left || event.clientX > rect.right ||
    event.clientY < rect.top || event.clientY > rect.bottom;
  if (clickedOutside) closeProjectModal();
});

document.addEventListener("keydown", event => {
  if (!modal.open || visibleProjects.length < 2) return;
  if (event.key === "ArrowRight") stepModal(1);
  if (event.key === "ArrowLeft") stepModal(-1);
});

/* ---------------- Navigation ---------------- */

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a[href^='#']");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));

const scrollProgress = document.getElementById("scrollProgress");
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------------- Theme ---------------- */

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("portfolio-theme", next); } catch (error) {}
});

/* ---------------- Hero ---------------- */

const rotatingWords = [
  "data insights.",
  "practical systems.",
  "smarter decisions.",
  "clear dashboards."
];

function startRotator() {
  const target = document.getElementById("rotatingWord");
  target.textContent = rotatingWords[0];
  if (reduceMotion) return;

  let wordIndex = 0;
  let charIndex = rotatingWords[0].length;
  let deleting = true;

  function tick() {
    const word = rotatingWords[wordIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    let delay = deleting ? 38 : 70;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % rotatingWords.length;
      charIndex = 0;
      delay = 300;
    }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 2600);
}

function animateCounters() {
  const totals = {
    projects: projectList.length,
    skills: document.querySelectorAll("#skills .chip-wrap span").length,
    experience: document.querySelectorAll(".timeline-item").length
  };

  document.querySelectorAll("[data-count]").forEach(element => {
    const end = totals[element.dataset.count] || 0;
    if (reduceMotion) { element.textContent = end; return; }
    const start = performance.now();
    const duration = 1400;
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track || reduceMotion) return;
  track.innerHTML += track.innerHTML.replace(/<span>/g, '<span aria-hidden="true">');
  track.classList.add("animate");
}

/* ---------------- Pointer effects ---------------- */

function initSpotlight(root = document) {
  if (!finePointer) return;
  root.querySelectorAll(".spotlight").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

function initTilt() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".tilt").forEach(element => {
    element.addEventListener("pointermove", event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });
}

function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".magnetic").forEach(button => {
    button.addEventListener("pointermove", event => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    button.addEventListener("pointerleave", () => { button.style.transform = ""; });
  });
}

const glow = document.querySelector(".cursor-glow");
if (finePointer && glow) {
  document.addEventListener("pointermove", event => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });
}

/* ---------------- Contact ---------------- */

document.getElementById("copyEmail").addEventListener("click", async event => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard ✓");
  } catch (error) {
    showToast(email);
  }
});

/* ---------------- Reveal on scroll ---------------- */

let revealObserver;
function initRevealAnimations() {
  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(element => revealObserver.observe(element));
}

/* ---------------- Init ---------------- */

document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderProjects();
startRotator();
animateCounters();
initMarquee();
initSpotlight(document.getElementById("skills"));
initTilt();
initMagnetic();
initRevealAnimations();
