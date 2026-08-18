const projectGrid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

function createTechChips(tech = []) {
  return tech.map(item => `<span class="tech-chip">${item}</span>`).join("");
}

function createProjectCard(project, index) {
  const githubButton = project.github
    ? `<a class="small-button" href="${project.github}" target="_blank" rel="noopener">GitHub ↗</a>`
    : "";

  const demoButton = project.demo
    ? `<a class="small-button" href="${project.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`
    : "";

  return `
    <article class="project-card reveal">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title} screenshot"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
        <div class="project-image-fallback">Project ${String(index + 1).padStart(2, "0")}</div>
      </div>
      <div class="project-body">
        <p class="project-category">${project.category}</p>
        <h3>${project.title}</h3>
        <p class="project-subtitle">${project.subtitle || ""}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">${createTechChips(project.tech)}</div>
        <div class="project-actions">
          <button class="small-button details-button" data-project-index="${index}">View Details</button>
          ${githubButton}
          ${demoButton}
        </div>
      </div>
    </article>`;
}

function renderProjects() {
  if (!Array.isArray(projects)) return;
  projectGrid.innerHTML = projects.map((project, index) => createProjectCard(project, index)).join("");

  document.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => {
      openProjectModal(Number(button.dataset.projectIndex));
    });
  });

  initRevealAnimations();
}

function openProjectModal(index) {
  const project = projects[index];
  if (!project) return;

  const highlights = (project.highlights || []).map(item => `<li>${item}</li>`).join("");

  modalContent.innerHTML = `
    <div class="modal-inner">
      <p class="project-category">${project.category}</p>
      <h2>${project.title}</h2>
      <p>${project.subtitle || ""}</p>
      <h3>Project Overview</h3>
      <p>${project.description}</p>
      ${highlights ? `<h3>Highlights</h3><ul>${highlights}</ul>` : ""}
      <h3>Tools & Technologies</h3>
      <div class="project-tech">${createTechChips(project.tech)}</div>
    </div>`;

  modal.showModal();
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}

closeModal.addEventListener("click", closeProjectModal);

modal.addEventListener("click", event => {
  const rect = modal.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left || event.clientX > rect.right ||
    event.clientY < rect.top || event.clientY > rect.bottom;
  if (clickedOutside) closeProjectModal();
});

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("mousemove", event => {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

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
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(element => revealObserver.observe(element));
}

renderProjects();
initRevealAnimations();
