/* ============================================
   DATA — projects are rendered from this array
   so adding a new one later is a one-line edit.
   ============================================ */

const featuredProjects = [
  {
    name: "CartPilot AI",
    status: "Live",
    description:
      "An AI-inspired autonomous shopping and checkout assistant for D2C e-commerce — matches user intent to a product catalog, answers buyer-hesitation questions (sizing, returns, COD, payment safety), and walks through a simulated checkout flow.",
    tech: ["Node.js", "Express.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/zaaraa-hub/cartpilot-ai",
    live: "https://cartpilot-ai.onrender.com/",
    large: true,
  },
  {
    name: "India Pincode Explorer",
    status: "Live",
    description:
      "A full-stack PIN code search tool covering all of India — an Express backend retrieves real postal data including post office, district, state, and region, with search and location-based results.",
    tech: ["Node.js", "Express.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/zaaraa-hub/India-pincode-explorer",
    live: "https://india-pincode-explorer-0fki.onrender.com/",
    large: false,
  },
  {
    name: "Formula One Hub",
    status: "Live",
    description:
      "A responsive Formula One themed website built to explore frontend development, UI design, and web technologies.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/zaaraa-hub/formula-one-hub",
    live: "https://zaaraa-hub.github.io/formula-one-hub/",
    large: false,
  },
  {
    name: "TaskFlow",
    status: "In Progress",
    description:
      "A Java task manager being built step by step into a full-stack productivity platform — currently covering OOP, collections, and file handling, with SQL and a web layer next.",
    tech: ["Java", "OOP", "File Handling"],
    github: "https://github.com/zaaraa-hub/TaskFlow",
    live: null,
    large: false,
  },
];

/* ============================================
   RENDER PROJECTS
   ============================================ */
function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  grid.innerHTML = featuredProjects
    .map((p) => {
      const statusClass = p.status === "Live" ? "status-live" : "status-progress";
      const links = `
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="primary-link">Live Demo</a>` : ""}
      `;
      return `
        <div class="bento-card ${p.large ? "featured-lg" : ""}" data-tilt>
          <span class="card-status ${statusClass}">${p.status}</span>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="card-tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
          <div class="card-links">${links}</div>
        </div>
      `;
    })
    .join("");
}

renderFeatured();

/* ============================================
   MOBILE NAV
   ============================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ============================================
   ACTIVE SECTION INDICATOR (scroll spy)
   ============================================ */
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => spyObserver.observe(section));

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));


/* ============================================
   TILT EFFECT ON PROJECT CARDS
   (mouse-tracked glow + slight 3D tilt; skipped on touch)
   ============================================ */
const isTouch = window.matchMedia("(hover: none)").matches;

if (!isTouch) {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = x / rect.width - 0.5;
      const cy = y / rect.height - 0.5;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.transform = `perspective(700px) rotateX(${-cy * 4}deg) rotateY(${cx * 4}deg)`;
    });
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(700px) rotateX(0) rotateY(0)";
    });
  });

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================
   CONTACT FORM VALIDATION + FORMSPREE SUBMIT
   ============================================ */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkgkzeq";

function showError(fieldId, message) {
  document.getElementById(`${fieldId}Error`).textContent = message;
}

function clearErrors() {
  ["name", "email", "message"].forEach((id) => showError(id, ""));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let valid = true;

  if (name.length < 2) {
    showError("name", "Enter your name.");
    valid = false;
  }
  if (!isValidEmail(email)) {
    showError("email", "Enter a valid email address.");
    valid = false;
  }
  if (message.length < 10) {
    showError("message", "Message should be at least 10 characters.");
    valid = false;
  }

  if (!valid) return;

  const submitBtn = document.getElementById("formSubmit");
  submitBtn.disabled = true;
  formStatus.textContent = "Sending…";

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form),
    });

    if (res.ok) {
      formStatus.textContent = `Thanks, ${name.split(" ")[0]} — I'll get back to you soon.`;
      form.reset();
    } else {
      formStatus.textContent = "Something went wrong — try emailing me directly instead.";
    }
  } catch (err) {
    formStatus.textContent = "Something went wrong — try emailing me directly instead.";
  } finally {
    submitBtn.disabled = false;
  }
});

/* ============================================
   NAVBAR BACKGROUND ON SCROLL
   ============================================ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.borderColor = window.scrollY > 40 ? "rgba(184,60,79,0.35)" : "rgba(255,255,255,0.09)";
});
const emailLink = document.getElementById("emailLink");
emailLink.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText("zaara.mulani10@gmail.com");
  const label = emailLink.querySelector("span");
  const original = label.textContent;
  label.textContent = "Copied!";
  setTimeout(() => (label.textContent = original), 1500);
});