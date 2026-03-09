/* ============================================================
   Traffic Makers — main.js
   - Sticky navbar shadow on scroll
   - Mobile nav toggle
   - Digital Solutions accordion
   - FAQ accordion
   - Animated stats counters (IntersectionObserver)
   - Smooth scrolling (native via CSS, JS fallback for old browsers)
   - Contact form feedback
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar ---- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(11,26,62,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(11,26,62,0.08)';
    }
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- Digital Solutions Accordion ---- */
  const serviceData = {
    seo: {
      img: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&q=80',
      alt: 'SEO - Référencement naturel',
      text: "Le référencement naturel débute par une phase d'audit, permettant de connaître les performances actuelles ainsi que les éventuelles lacunes techniques que rencontre votre site. Une recherche sémantique ou recherche de mots-clés est ensuite réalisée, afin d'optimiser votre site sur les requêtes les plus stratégiques pour votre activité."
    },
    sea: {
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      alt: 'SEA - Google Ads',
      text: "Le SEA (Search Engine Advertising) consiste à diffuser des annonces payantes sur les moteurs de recherche comme Google. Nous créons et optimisons vos campagnes Google Ads pour maximiser votre retour sur investissement et attirer des prospects qualifiés immédiatement, là où ils recherchent vos produits et services."
    },
    social: {
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
      alt: 'Social Ads - Publicité réseaux sociaux',
      text: "Les Social Ads vous permettent de toucher vos audiences cibles sur Facebook, Instagram, LinkedIn ou TikTok. Nous concevons des campagnes publicitaires créatives et performantes, adaptées à chaque plateforme, pour booster votre notoriété et générer des leads qualifiés."
    },
    web: {
      img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
      alt: 'Création de sites web',
      text: "Nous concevons des sites web modernes, rapides et optimisés pour les moteurs de recherche. De la landing page au site vitrine en passant par l'e-commerce, chaque projet est pensé pour convertir vos visiteurs en clients. Nos sites sont responsive, accessibles et respectent les meilleures pratiques SEO dès leur conception."
    },
    analytics: {
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      alt: 'Web Analytics',
      text: "Nous déployons et configurons vos outils de tracking (Google Analytics 4, Google Tag Manager, etc.) pour vous fournir une vision claire de vos performances digitales. Nos tableaux de bord personnalisés vous permettent de prendre des décisions éclairées basées sur la data et d'optimiser en continu vos actions marketing."
    },
    formations: {
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
      alt: 'Formations SEO & SEA',
      text: "Nos formations pratiques et certifiantes sont animées par nos experts pour vous permettre de maîtriser le SEO, le SEA et le marketing digital. Que vous soyez débutant ou expérimenté, nous adaptons notre pédagogie à votre niveau et à vos objectifs, en présentiel ou à distance."
    }
  };

  const accordionItems = document.querySelectorAll('.accordion-item');
  const solutionImg = document.getElementById('solutionImg');
  const solutionText = document.getElementById('solutionText');

  accordionItems.forEach(item => {
    item.querySelector('.accordion-btn').addEventListener('click', () => {
      // Remove active from all
      accordionItems.forEach(i => i.classList.remove('active'));
      // Set this active
      item.classList.add('active');

      const service = item.dataset.service;
      const data = serviceData[service];
      if (data && solutionImg && solutionText) {
        // Fade out → update → fade in
        solutionImg.style.opacity = '0';
        solutionText.style.opacity = '0';
        setTimeout(() => {
          solutionImg.src = data.img;
          solutionImg.alt = data.alt;
          solutionText.textContent = data.text;
          solutionImg.style.opacity = '1';
          solutionText.style.opacity = '1';
        }, 300);
      }
    });
  });

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Animated Counters ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800; // ms
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: run counters immediately
    counterEls.forEach(animateCounter);
  }

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message envoyé !';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---- Smooth scroll for hash links (fallback) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

})();
