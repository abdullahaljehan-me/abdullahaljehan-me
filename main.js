'use strict';

const CONFIG = {
  GITHUB_API: 'https://api.github.com/users/abdullahaljehan-me/repos',
  GITHUB_USER: 'abdullahaljehan-me',
  CACHE_DURATION: 5 * 60 * 1000,
  PARTICLE_COUNT: 150,
  WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY'
};

const ROLES = [
  'Engineering Aspirant · Systems & Embedded',
  'C · Linux · ESP32 · IoT',
  'Founding Advisor @ Kynatium Labs',
  'Learning by building, breaking, iterating'
];

const MISSION_DATA = [
  {
    title: 'C Programming',
    percentage: 35,
    description: 'Building foundations in C: syntax, pointers, memory management, and systems-level programming concepts.'
  },
  {
    title: 'Linux Admin',
    percentage: 45,
    description: 'Daily driver: Zorin OS, shell scripting, system administration, and deeper understanding of OS fundamentals.'
  },
  {
    title: 'ESP32 / Embedded',
    percentage: 15,
    description: 'Exploring microcontroller programming, IoT concepts, hardware-software integration, and real-world applications.'
  },
  {
    title: 'CSE Admission',
    percentage: 55,
    description: 'Engineering preparation: HSC complete with perfect GPA, building practical skills to excel in computer science.'
  }
];

const LANGUAGE_COLORS = {
  'C': '#A8660D',
  'Python': '#3572A5',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Shell': '#89E051',
  'HTML': '#E34C26',
  'CSS': '#563D7C',
  'Java': '#B07219',
  'Go': '#00ADD8',
  'Rust': '#CE422B'
};

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isVisible = true;

    this.resizeCanvas();
    this.initParticles();
    this.setupEventListeners();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }

  update() {
    if (!this.isVisible) return;

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = 100;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        p.vx = Math.cos(angle) * 2;
        p.vy = Math.sin(angle) * 2;
      }

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      p.x = Math.max(0, Math.min(this.canvas.width, p.x));
      p.y = Math.max(0, Math.min(this.canvas.height, p.y));
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(6, 6, 15, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.particles.forEach((p, i) => {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 100)})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

class Typewriter {
  constructor(element, roles) {
    this.element = element;
    this.roles = roles;
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.speed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
  }

  type() {
    const currentRole = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.element.textContent = currentRole.substring(0, this.charIndex);

    let speed = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      speed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }

  start() {
    this.type();
  }
}

class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.mission-card, .repo-card, .skill-group, .blog-card').forEach(el => {
      this.observer.observe(el);
    });
  }
}

class ProgressAnimator {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const percentage = target.getAttribute('data-percentage');
          if (percentage) {
            this.animateBar(target, percentage);
          }
          this.observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.mission-progress-fill').forEach(bar => {
      this.observer.observe(bar);
    });
  }

  animateBar(element, targetPercentage) {
    let current = 0;
    const increment = targetPercentage / 20;
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        current = targetPercentage;
        clearInterval(interval);
      }
      element.style.width = current + '%';
    }, 30);
  }
}

class Navigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.drawer = document.querySelector('.drawer');
    this.drawerMenu = document.querySelectorAll('.drawer-menu a');
    this.navMenu = document.querySelectorAll('.nav-menu a');

    this.setupEventListeners();
    this.setActiveLink();
  }

  setupEventListeners() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleDrawer());
    }

    this.drawerMenu.forEach(link => {
      link.addEventListener('click', () => this.closeDrawer());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDrawer();
      }
    });
  }

  toggleDrawer() {
    this.drawer?.classList.toggle('open');
    document.body.classList.toggle('drawer-open');
  }

  closeDrawer() {
    this.drawer?.classList.remove('open');
    document.body.classList.remove('drawer-open');
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const allLinks = [...this.navMenu, ...this.drawerMenu];
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

class GitHubIntegration {
  constructor() {
    this.cacheKey = 'github-repos-cache';
    this.cacheDuration = CONFIG.CACHE_DURATION;
  }

  async fetchRepos(limit = null) {
    try {
      const cached = this.getCache();
      if (cached) return cached;

      let url = `${CONFIG.GITHUB_API}?sort=updated&per_page=100`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('GitHub API error');

      let repos = await response.json();

      if (limit) {
        repos = repos.slice(0, limit);
      }

      this.setCache(repos);
      return repos;
    } catch (error) {
      console.error('GitHub API fetch error:', error);
      return [];
    }
  }

  getCache() {
    try {
      const cached = sessionStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp > this.cacheDuration) {
        sessionStorage.removeItem(this.cacheKey);
        return null;
      }

      return data.repos;
    } catch (e) {
      return null;
    }
  }

  setCache(repos) {
    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify({
        repos,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Unable to cache GitHub data');
    }
  }

  getLanguageColor(language) {
    return LANGUAGE_COLORS[language] || '#888888';
  }
}

class MissionCards {
  constructor() {
    this.cards = document.querySelectorAll('.mission-card');
    this.setupEventListeners();
    this.initProgressBars();
  }

  setupEventListeners() {
    this.cards.forEach(card => {
      card.addEventListener('click', () => this.toggleCard(card));
    });
  }

  toggleCard(card) {
    card.classList.toggle('expanded');
  }

  initProgressBars() {
    const bars = document.querySelectorAll('.mission-progress-fill');
    bars.forEach((bar, index) => {
      if (MISSION_DATA[index]) {
        bar.setAttribute('data-percentage', MISSION_DATA[index].percentage);
        bar.style.width = MISSION_DATA[index].percentage + '%';
      }
    });
  }
}

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validate() {
    const formData = new FormData(this.form);
    const errors = {};

    const name = formData.get('name')?.trim();
    if (!name) errors.name = 'Name is required';

    const email = formData.get('email')?.trim();
    if (!email) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(email)) {
      errors.email = 'Invalid email address';
    }

    const message = formData.get('message')?.trim();
    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });
  }

  showErrors(errors) {
    this.clearErrors();
    Object.entries(errors).forEach(([field, message]) => {
      const group = this.form.querySelector(`[name="${field}"]`)?.closest('.form-group');
      if (group) {
        group.classList.add('error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = message;
        }
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const validation = this.validate();
    if (!validation.isValid) {
      this.showErrors(validation.errors);
      return;
    }

    this.clearErrors();
    const submitBtn = this.form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const formData = new FormData(this.form);
      const data = {
        access_key: CONFIG.WEB3FORMS_KEY,
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Form submission failed');

      const messageEl = document.getElementById('form-message');
      if (messageEl) {
        messageEl.className = 'form-message success';
        messageEl.textContent = 'Thank you! Your message has been sent.';
        messageEl.style.display = 'block';
      }

      this.form.reset();
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        if (messageEl) messageEl.style.display = 'none';
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      const messageEl = document.getElementById('form-message');
      if (messageEl) {
        messageEl.className = 'form-message error';
        messageEl.textContent = 'Error sending message. Please try again.';
        messageEl.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  }
}

class ScrollToTop {
  constructor() {
    this.button = document.querySelector('.scroll-to-top');
    if (!this.button) return;

    window.addEventListener('scroll', () => this.updateVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  updateVisibility() {
    if (window.scrollY > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

class GlitchEffect {
  constructor() {
    this.glitchElements = document.querySelectorAll('.glitch');
    this.startGlitchLoop();
  }

  startGlitchLoop() {
    setInterval(() => {
      this.glitchElements.forEach(el => {
        el.classList.remove('active');
        setTimeout(() => {
          el.classList.add('active');
        }, 10);
        setTimeout(() => {
          el.classList.remove('active');
        }, 310);
      });
    }, 4000);
  }
}

class ProjectsPage {
  constructor() {
    this.filterBtns = document.querySelectorAll('.projects-filters .filter-btn');
    this.repoGrid = document.querySelector('.repo-grid');

    if (this.filterBtns.length === 0) return;

    this.setupEventListeners();
    this.loadRepositories();
  }

  setupEventListeners() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => this.filterProjects(btn));
    });
  }

  filterProjects(btn) {
    this.filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const cards = document.querySelectorAll('.repo-card');

    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        const language = card.getAttribute('data-language');
        card.style.display = language === filter ? 'block' : 'none';
      }
    });
  }

  async loadRepositories() {
    try {
      const gh = new GitHubIntegration();
      const repos = await gh.fetchRepos();

      if (repos.length === 0) {
        this.showPlaceholder();
        return;
      }

      this.renderRepos(repos);
    } catch (error) {
      console.error('Failed to load repositories:', error);
      this.showPlaceholder();
    }
  }

  renderRepos(repos) {
    if (!this.repoGrid) return;

    this.repoGrid.innerHTML = '';
    repos.forEach(repo => {
      const card = this.createRepoCard(repo);
      this.repoGrid.appendChild(card);
    });

    this.filterProjects(this.filterBtns[0]);
  }

  createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.setAttribute('data-language', repo.language || 'unknown');

    const color = this.getLanguageColor(repo.language);
    const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

    card.innerHTML = `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
      <p class="repo-description">${repo.description || 'No description yet'}</p>
      <div class="repo-meta">
        ${repo.language ? `
          <div class="repo-language">
            <span class="language-dot" style="background-color: ${color}"></span>
            <span>${repo.language}</span>
          </div>
        ` : ''}
      </div>
      <div class="repo-stats">
        <span>★ ${repo.stargazers_count}</span>
        <span>⎇ ${repo.forks_count}</span>
        <span>${lastUpdated}</span>
      </div>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">View Repo →</a>
    `;

    return card;
  }

  getLanguageColor(language) {
    const gh = new GitHubIntegration();
    return gh.getLanguageColor(language);
  }

  showPlaceholder() {
    if (!this.repoGrid) return;

    this.repoGrid.innerHTML = `
      <div class="repo-card" style="grid-column: 1 / -1;">
        <p style="text-align: center; color: var(--muted);">Projects coming soon. Currently building fundamentals.</p>
      </div>
    `;
  }
}

class NewsletterForm {
  constructor() {
    this.form = document.getElementById('newsletter-form');
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const emailInput = this.form.querySelector('.newsletter-input');
    const submitBtn = this.form.querySelector('.newsletter-btn');
    const email = emailInput.value.trim();

    if (!this.isValidEmail(email)) {
      emailInput.style.borderColor = 'var(--pink)';
      return;
    }

    emailInput.style.borderColor = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    try {
      const data = {
        access_key: CONFIG.WEB3FORMS_KEY,
        email,
        subject: 'Newsletter Subscription'
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        emailInput.value = '';
        submitBtn.textContent = 'Subscribed! 🎉';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Subscribe';
        }, 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

class HomePage {
  constructor() {
    this.loadLatestRepos();
  }

  async loadLatestRepos() {
    const container = document.querySelector('.repo-grid');
    if (!container) return;

    try {
      const gh = new GitHubIntegration();
      const repos = await gh.fetchRepos(3);

      if (repos.length === 0) {
        this.showPlaceholderRepos(container);
        return;
      }

      container.innerHTML = '';
      repos.forEach(repo => {
        const card = this.createRepoCard(repo);
        container.appendChild(card);
      });
    } catch (error) {
      console.error('Failed to load repos:', error);
      this.showPlaceholderRepos(container);
    }
  }

  createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';

    const color = LANGUAGE_COLORS[repo.language] || '#888888';
    const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

    card.innerHTML = `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
      <p class="repo-description">${repo.description || 'No description yet'}</p>
      <div class="repo-meta">
        ${repo.language ? `
          <div class="repo-language">
            <span class="language-dot" style="background-color: ${color}"></span>
            <span>${repo.language}</span>
          </div>
        ` : ''}
      </div>
      <div class="repo-stats">
        <span>★ ${repo.stargazers_count}</span>
        <span>⎇ ${repo.forks_count}</span>
        <span>${lastUpdated}</span>
      </div>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">View Repo →</a>
    `;

    return card;
  }

  showPlaceholderRepos(container) {
    container.innerHTML = `
      <div class="repo-card">
        <div class="repo-name">Repository Coming Soon</div>
        <p class="repo-description">Building projects and pushing to GitHub...</p>
      </div>
      <div class="repo-card">
        <div class="repo-name">Repository Coming Soon</div>
        <p class="repo-description">Building projects and pushing to GitHub...</p>
      </div>
      <div class="repo-card">
        <div class="repo-name">Repository Coming Soon</div>
        <p class="repo-description">Building projects and pushing to GitHub...</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
      const particles = new ParticleSystem(canvas);
      particles.animate();
    }

    const typewriterEl = document.querySelector('.typewriter-text');
    if (typewriterEl) {
      const typewriter = new Typewriter(typewriterEl, ROLES);
      typewriter.start();
    }

    new Navigation();
    new ScrollReveal();
    new ProgressAnimator();
    new MissionCards();
    new ContactForm();
    new ScrollToTop();
    new GlitchEffect();
    new NewsletterForm();

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html' || currentPage === '') {
      new HomePage();
    } else if (currentPage === 'projects.html') {
      new ProjectsPage();
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
