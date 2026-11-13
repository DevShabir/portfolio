/**
 * Main Application Orchestrator
 * Controls: Data, Dynamic Projects, Modals,
 * Infinite Typewriter, Theme Switching (localStorage), Scroll Spy, and Form Validation.
 */

// 1. Projects Data Array
const projects = [
  {
    id: "weather-app",
    title: "Advanced Weather App",
    shortDescription: "A responsive weather application that provides real-time weather information for cities around the world.",
    fullDescription: "A modern and responsive weather application built with HTML5, CSS3, and TypeScript. It integrates a weather REST API to retrieve and display real-time weather information, providing users with an interactive and user-friendly experience.",
    image: "images/nimbus-weather-app.png",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "REST API",
      "JSON",
      "Async/Await",
      "Fetch API"
    ],
    features: [
      "Real-time weather information",
      "Search weather by city name",
      "Display temperature and weather conditions",
      "Show humidity and wind speed",
      "Dynamic weather icons",
      "Responsive design for mobile and desktop",
      "API integration using Fetch API",
      "Error handling for invalid city names"
    ],
    status: "completed",
    github: "https://github.com/DevShabir/nimbus-weather",
    demo: "https://nimbus-weather-devshabir.vercel.app/"
  },
  {
    id: "modern-calculator",
    title: "Modern Interactive Calculator",
    shortDescription: "An interactive and responsive calculator featuring essential arithmetic operations, keyboard support, and calculation history.",
    fullDescription: "A modern and responsive calculator developed using HTML5, CSS3, and JavaScript. It provides an interactive interface for performing arithmetic calculations, supports both physical keyboard and touch interactions, and includes calculation history, error handling, and a responsive layout for different screen sizes.",
    image: "images/calculator.png",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "DOM Manipulation",
      "Event Handling"
    ],
    features: [
      "Basic arithmetic operations (Addition, Subtraction, Multiplication, and Division)",
      "Sequential calculations and operation handling",
      "Physical keyboard and touch input support",
      "Calculation history tracking",
      "Clear Entry (CE) and All Clear (AC) functionality",
      "Error handling for invalid calculations",
      "Responsive design for desktop and mobile devices"
    ],
    status: "completed",
    github: "https://github.com/DevShabir/Modern-Calculator",
    demo: "https://devshabir.github.io/Modern-Calculator/"

  },
  {
    id: "modern-admin-panel",
    title: "Modern Admin Dashboard",
    shortDescription: "A responsive admin dashboard featuring interactive analytics cards, data tables, and a modern navigation system.",
    fullDescription: "A modern and responsive administrative dashboard developed using HTML5, CSS3, and JavaScript. It provides a structured interface for displaying analytics, managing data tables, and navigating between dashboard sections. The project focuses on responsive layouts, interactive UI elements, and a clean user experience across different devices.",
    image: "images/admin-panel.png",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "DOM Manipulation"
    ],
    features: [
      "Responsive dashboard with analytics summary cards",
      "Interactive data tables and row management actions",
      "Collapsible sidebar navigation",
      "User profile and navigation interface",
      "Modern dashboard layout optimized for desktop and mobile",
      "Reusable UI components and structured page sections",
      "Clean and intuitive user interface"
    ],
    status: "completed",
    github: "https://github.com/DevShabir/Modern-Admin-Panel",
    demo: "https://devshabir.github.io/Modern-Admin-Panel/"
  },
  {
    id: "club-management-system",
    title: "Wrestling Club Management System",
    shortDescription: "An offline-first management system designed to manage wrestling club members, coaches, attendance, training schedules, and financial records.",
    fullDescription: "A comprehensive wrestling club management system developed using PHP, MySQL, Bootstrap, and JavaScript. Built with an offline-first modular monolith architecture, the application helps sports clubs manage athletes, coaches, training groups, attendance records, membership payments, and financial reports. It features a Persian (Jalali) calendar, local data storage, and backup and restore functionality, providing a practical solution for managing daily club operations without requiring an internet connection.",
    image: "images/club-dashboard.png",
    technologies: [
      "PHP",
      "MySQL",
      "PDO",
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "JavaScript",
      "Chart.js",
      "Jalali Calendar"
    ],
    features: [
      "Secure user authentication and profile management",
      "Athlete registration and member management",
      "Athlete profiles with photos, physical information, and membership status",
      "Training group and schedule management",
      "Coach registration and management",
      "Daily attendance tracking (Present, Absent, Excused)",
      "Membership and monthly payment management",
      "Financial records with AFN currency and discount support",
      "Dashboard with statistics and analytical charts",
      "Financial and attendance reports",
      "Printable athlete identification cards",
      "Persian (Jalali) calendar integration",
      "Database backup and restore functionality",
      "Offline-first operation using local server infrastructure"
    ],
    github: "https://github.com/DevShabir/Wrestling-Club-Management-System",
    demo: "https://devshabir.github.io/Wrestling-Club-Management-System/"
  },
{
    id: "mobile-shop-management-system",
    title: "Mobile Shop Management System",

    shortDescription: "A comprehensive mobile shop management system for handling sales, inventory, purchases, customers, suppliers, and financial operations.",

    fullDescription: "A modern web-based mobile shop management system developed using Laravel, PHP, Bootstrap, JavaScript, and MySQL. The system is designed to simplify daily retail operations by providing centralized management of products, inventory, sales, purchase invoices, customers, and suppliers. It features a POS interface for quick sales, real-time stock monitoring, low-stock alerts, daily sales and profit summaries, expense tracking, financial reports, and printable sales receipts. The dashboard provides a clear overview of business performance, helping shop owners manage their operations more efficiently. The project is currently under development.",

    image: "images/mobile-dashboard.png",

    technologies: [
        "PHP",
        "Laravel",
        "MySQL",
        "Bootstrap 5",
        "JavaScript",
        "MVC Architecture"
    ],

    features: [
        "Interactive dashboard with daily business statistics",
        "Product and category management",
        "Supplier management",
        "Purchase invoice registration and management",
        "Point of Sale (POS) for quick sales",
        "Inventory and stock management",
        "Low-stock and out-of-stock alerts",
        "Customer management",
        "Daily sales and net profit tracking",
        "Expense management",
        "Financial reporting and business analytics",
        "Sales invoice management",
        "Printable sales receipts",
        "AFN currency support",
        "Centralized system settings"
    ],

    github: null,
    demo: null,

    status: "in-development",
    availability: "coming-soon"
}
];

let projectModalInstance = null;

// 2. Lifecycle Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbarScroll();
  initActiveNavSpy();
  initCurrentYear();
  renderProjects();
  initContactForm();
  initTypewriterLoop();
});

// 3. Infinite Typewriter Loop for Hero Title
const typewriterWords = [
  "Backend Developer",
  "Web Developer",
  "IT University Student",
  "Aspiring Full-Stack Developer"
];

function initTypewriterLoop() {
  const textElement = document.getElementById("typewriterText");
  if (!textElement) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = typewriterWords[wordIndex];

    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // توقف برای خوانده شدن متن
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typewriterWords.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// 4. Dark / Light Theme Management with LocalStorage
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  applyTheme(savedTheme, htmlTag, themeIcon);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-bs-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(targetTheme, htmlTag, themeIcon);
      localStorage.setItem("portfolio_theme", targetTheme);
    });
  }
}

function applyTheme(theme, htmlTag, themeIcon) {
  htmlTag.setAttribute("data-bs-theme", theme);
  if (!themeIcon) return;

  if (theme === "dark") {
    themeIcon.className = "bi bi-moon-stars-fill";
  } else {
    themeIcon.className = "bi bi-sun-fill";
  }
}

// 5. Navbar Scroll Background Change
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// 6. Active Navigation Link Spy
function initActiveNavSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-pills-custom .nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "-20% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// 7. Dynamic Projects Rendering & Handling
function renderProjects() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((project) => {
    const cardCol = document.createElement("div");
    cardCol.className = "col-md-6 col-lg-6";

    const techBadges = project.technologies
      .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
      .join(" ");

    cardCol.innerHTML = `
      <div class="glass-card project-card">
        <div class="project-img-wrapper">
          <img 
            src="${escapeHtml(project.image)}" 
            alt="${escapeHtml(project.title)}" 
            class="project-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='https://placehold.co/600x350/111827/94A3B8?text=${encodeURIComponent(project.title)}';"
          />
        </div>
        <div class="p-4 d-flex flex-column flex-grow-1">
          <div class="project-status-list d-flex flex-wrap gap-2 mb-2" aria-label="Project status">
            ${getProjectStatus(project)}
          </div>
          <h3 class="h5 mb-2 fw-bold text-light">${escapeHtml(project.title)}</h3>
          <p class="text-secondary-custom small mb-3 flex-grow-1">
            ${escapeHtml(project.shortDescription)}
          </p>
          <div class="d-flex flex-wrap gap-1 mb-4">
            ${techBadges}
          </div>
          <div class="project-actions d-flex flex-wrap gap-2">
            <button type="button" class="btn btn-outline-custom btn-sm view-details-btn flex-grow-1" data-id="${escapeHtml(project.id)}">
              <i class="bi bi-info-circle me-1"></i> Details
            </button>
            ${getProjectLinks(project)}
          </div>
        </div>
      </div>
    `;

    container.appendChild(cardCol);
  });

  // Event delegation for project details.
  container.addEventListener("click", (e) => {
    const detailBtn = e.target.closest(".view-details-btn");
    if (detailBtn) {
      const pId = detailBtn.getAttribute("data-id");
      const proj = projects.find((p) => p.id === pId);
      if (proj) openModal(proj);
      return;
    }
  });
}

// 8. Open Project Modal
function openModal(project) {
  const modalBody = document.getElementById("projectModalBody");
  const modalElement = document.getElementById("projectModal");

  if (!modalBody || !modalElement) return;

  const techBadges = project.technologies
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join(" ");

  const featuresList = (project.features || [])
    .map((feat) => `<li><i class="bi bi-check-circle-fill text-accent me-2"></i>${escapeHtml(feat)}</li>`)
    .join("");

  modalBody.innerHTML = `
    <div class="mb-3 rounded overflow-hidden" style="max-height: 280px;">
      <img 
        src="${escapeHtml(project.image)}" 
        alt="${escapeHtml(project.title)}" 
        class="w-100 h-100 object-fit-cover" 
        onerror="this.onerror=null; this.src='https://placehold.co/800x400/111827/94A3B8?text=${encodeURIComponent(project.title)}';"
      />
    </div>
    <h2 class="h4 fw-bold mb-2">${escapeHtml(project.title)}</h2>
      <div class="project-status-list d-flex flex-wrap gap-2 mb-3" aria-label="Project status">
        ${getProjectStatus(project)}
      </div>
      <div class="d-flex flex-wrap gap-1 mb-3">
      ${techBadges}
    </div>
    <p class="text-secondary-custom mb-3">${escapeHtml(project.fullDescription)}</p>
    
    ${featuresList ? `
      <h3 class="h6 text-accent fw-bold mb-2">Key Features:</h3>
      <ul class="list-unstyled text-secondary-custom small mb-4">
        ${featuresList}
      </ul>
    ` : ""}

    <div class="project-links d-flex flex-wrap gap-2 justify-content-end align-items-center">
      ${getProjectLinks(project)}
    </div>
  `;

  if (!projectModalInstance) {
    projectModalInstance = new bootstrap.Modal(modalElement);
  }
  projectModalInstance.show();
}

function getProjectStatus(project) {
  const statusLabels = {
    completed: { label: "Completed", className: "completed", icon: "bi-check-circle-fill" },
    "in-development": { label: "In Development", className: "in-development", icon: "bi-gear-fill" },
    "coming-soon": { label: "Coming Soon", className: "coming-soon", icon: "bi-clock-fill" }
  };
  const normalize = (value) => String(value || "").trim().toLowerCase().replace(/[\s_]+/g, "-");
  const statusKey = normalize(project && project.status);
  const status = Object.prototype.hasOwnProperty.call(statusLabels, statusKey) ? statusLabels[statusKey] : null;
  const statusMarkup = status
    ? `<span class="project-status-badge project-status-${status.className}"><i class="bi ${status.icon}" aria-hidden="true"></i>${status.label}</span>`
    : `<span class="project-status-badge project-status-unknown">${statusKey ? escapeHtml(statusKey.replace(/-/g, " ")) : "Status not set"}</span>`;

  const availabilityKey = normalize(project && project.availability);
  const availability = Object.prototype.hasOwnProperty.call(statusLabels, availabilityKey)
    ? statusLabels[availabilityKey]
    : null;
  const availabilityMarkup = availabilityKey && availabilityKey !== statusKey && availability
    ? `<span class="project-status-badge project-status-${availability.className}" aria-label="Availability: ${availability.label}"><i class="bi ${availability.icon}" aria-hidden="true"></i>${availability.label}</span>`
    : "";

  return statusMarkup + availabilityMarkup;
}

function getProjectLinks(project) {
  const getSafeUrl = (value) => {
    if (typeof value !== "string") return "";
    const url = value.trim();
    return /^https?:\/\/\S+$/i.test(url) ? url : "";
  };
  const github = getSafeUrl(project && project.github);
  const demo = getSafeUrl(project && project.demo);

  const githubButton = github
    ? `<a href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass-custom btn-sm project-link-btn" aria-label="GitHub Repository"><i class="bi bi-github me-1" aria-hidden="true"></i>GitHub</a>`
    : `<button type="button" class="btn btn-glass-custom btn-sm project-link-btn project-link-unavailable" disabled aria-disabled="true"><i class="bi bi-github me-1" aria-hidden="true"></i>GitHub Coming Soon</button>`;
  const demoButton = demo
    ? `<a href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-custom btn-sm project-link-btn" aria-label="Live Demo"><i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>Live Demo</a>`
    : `<button type="button" class="btn btn-primary-custom btn-sm project-link-btn project-link-unavailable" disabled aria-disabled="true"><i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>Live Demo Coming Soon</button>`;

  return githubButton + demoButton;
}

// 9. Contact Form Submission
function initContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlertPlaceholder");
  const submitButton = document.getElementById("submitBtn");

  if (!form || !alertBox || !submitButton) return;

  const nameField = form.elements.namedItem("name");
  const emailField = form.elements.namedItem("email");
  const subjectField = form.elements.namedItem("subject");
  const messageField = form.elements.namedItem("message");
  [nameField, emailField, subjectField, messageField].forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    alertBox.innerHTML = "";
    form.classList.add("was-validated");

    [nameField, emailField, subjectField, messageField].forEach((field) => field.setCustomValidity(""));

    [nameField, subjectField, messageField].forEach((field) => {
      if (!field.value.trim()) field.setCustomValidity("Please fill out this field.");
    });

    emailField.value = emailField.value.trim();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const endpoint = form.getAttribute("action") || "";
    if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) || endpoint.endsWith("/YOUR_FORM_ID")) {
      showContactFormMessage(
        alertBox,
        "error",
        "The contact form is not configured yet. Please try again later."
      );
      return;
    }

    const originalButtonContent = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending Message...';

    try {
      const formData = new FormData(form);
      formData.set("name", nameField.value.trim());
      formData.set("email", emailField.value);
      formData.set("subject", subjectField.value.trim());
      formData.set("message", messageField.value.trim());
      formData.set("_subject", `Portfolio Website Contact: ${subjectField.value.trim()}`);
      formData.set("_replyto", emailField.value);
      formData.set("Submission Date and Time (UTC)", new Date().toISOString());

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Contact form service returned ${response.status}`);
      }

      form.reset();
      form.classList.remove("was-validated");
      showContactFormMessage(alertBox, "success", "Your message has been sent successfully!");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      showContactFormMessage(
        alertBox,
        "error",
        "We couldn't send your message. Please check your connection and try again."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.innerHTML = originalButtonContent;
    }
  });
}

function showContactFormMessage(alertBox, type, message) {
  const isSuccess = type === "success";
  alertBox.innerHTML = `
    <div class="alert alert-${isSuccess ? "success" : "danger"} alert-dismissible fade show" role="${isSuccess ? "status" : "alert"}">
      <i class="bi ${isSuccess ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"} me-2" aria-hidden="true"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// 10. Helpers
function initCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[m];
  });
}