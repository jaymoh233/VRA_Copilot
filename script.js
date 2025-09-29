// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create scroll progress indicator
  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  document.body.appendChild(scrollProgress);

  // Navbar scroll effect and progress indicator
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / maxScroll) * 100;

    // Update progress bar
    scrollProgress.style.width = scrollPercent + "%";

    // Navbar scroll effect
    if (scrolled > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Enhanced Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 76; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced Animated counter for stats with VRA-specific formatting
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 80; // Smoother animation
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);

        // Set final value with proper formatting for VRA stats
        if (target === 95) {
          element.textContent = target + "%";
        } else if (target === 1200) {
          element.textContent = target + "+";
        } else if (target === 2000) {
          element.textContent = target + "+";
        } else {
          element.textContent = target;
        }
      } else {
        // Update current value
        const displayValue = Math.floor(current);
        if (target === 95) {
          element.textContent = displayValue + "%";
        } else if (target === 1200 || target === 2000) {
          element.textContent = displayValue + "+";
        } else {
          element.textContent = displayValue;
        }
      }
    }, 25);
  };

  // Enhanced Scroll Reveal Animation System
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, index * 100);

        // Unobserve after revealing to prevent re-triggering
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Stats counter observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate stats counters
        if (entry.target.classList.contains("stats-section")) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat, index) => {
            // Check if already animated
            if (!stat.hasAttribute("data-animated")) {
              const target = parseInt(stat.getAttribute("data-target"));
              stat.setAttribute("data-animated", "true");
              // Reset to 0 first
              stat.textContent = "0";
              // Start animation with staggered delay
              setTimeout(() => {
                animateCounter(stat, target);
              }, 200 + index * 150);
            }
          });
          // Don't observe this element anymore
          statsObserver.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Service cards enhanced hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    // Add reveal animation
    revealObserver.observe(card);

    // Enhanced hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02) rotate(1deg)";
      this.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      // Add shimmer effect
      const shimmer = document.createElement("div");
      shimmer.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shimmer 0.8s ease-in-out;
                pointer-events: none;
                z-index: 10;
            `;
      this.appendChild(shimmer);

      setTimeout(() => {
        if (shimmer.parentNode) {
          shimmer.parentNode.removeChild(shimmer);
        }
      }, 800);
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Observe all reveal elements
  const revealElements = document.querySelectorAll(".reveal-element");
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Observe stats section separately
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Enhanced Copilot chat functionality
  const toggleButton = document.getElementById("copilot-toggle");
  const chatContainer = document.getElementById("copilot-chat-container");

  if (toggleButton && chatContainer) {
    toggleButton.addEventListener("click", () => {
      chatContainer.classList.toggle("visible");

      // Add animation when opening
      if (chatContainer.classList.contains("visible")) {
        chatContainer.style.opacity = "0";
        chatContainer.style.transform = "scale(0.8) translateY(20px)";

        setTimeout(() => {
          chatContainer.style.transition = "all 0.3s ease";
          chatContainer.style.opacity = "1";
          chatContainer.style.transform = "scale(1) translateY(0)";
        }, 10);
      }
    });

    // Close chat when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !toggleButton.contains(e.target) &&
        !chatContainer.contains(e.target)
      ) {
        chatContainer.classList.remove("visible");
      }
    });
  }

  // Enhanced parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      const rate = scrolled * -0.3;
      heroBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
    }

    // Parallax for floating cards in about section
    const floatingCards = document.querySelectorAll(".floating-card");
    floatingCards.forEach((card, index) => {
      const rate = scrolled * (0.1 + index * 0.05);
      card.style.transform += ` translateY(${rate}px)`;
    });
  });

  // Enhanced hover effects for floating cards
  const floatingCards = document.querySelectorAll(".floating-card");
  floatingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.1) rotate(5deg)";
      this.style.boxShadow = "0 20px 50px rgba(30, 64, 175, 0.3)";
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
      this.style.zIndex = "";
    });
  });

  // Mobile menu toggle for responsive design
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !navbarToggler.contains(e.target) &&
        !navbarCollapse.contains(e.target)
      ) {
        navbarCollapse.classList.remove("show");
      }
    });
  }

  // Enhanced loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Animate hero content on load with staggered effect
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      const heroElements = heroContent.children;

      Array.from(heroElements).forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(50px)";

        setTimeout(() => {
          element.style.transition =
            "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, 300 + index * 200);
      });
    }
  });

  // Enhanced scroll to top functionality
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--vra-blue);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
    `;

  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollToTopBtn.addEventListener("mouseenter", function () {
    this.style.background = "var(--vra-gold)";
    this.style.color = "var(--dark-color)";
    this.style.transform = "translateY(-3px) scale(1.1)";
  });

  scrollToTopBtn.addEventListener("mouseleave", function () {
    this.style.background = "var(--vra-blue)";
    this.style.color = "white";
    this.style.transform = "";
  });

  // Enhanced dynamic background particles for hero section
  const createParticle = () => {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255,255,255,${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 4 + 4}s linear infinite;
        `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 4 + "s";

    return particle;
  };

  // Add particles to hero section
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const particle = createParticle();
        heroSection.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 8000);
      }, i * 200);
    }

    // Continuously add particles
    setInterval(() => {
      const particle = createParticle();
      heroSection.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    }, 1000);
  }

  // Enhanced feature items animation
  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((item, index) => {
    // Add reveal observer
    revealObserver.observe(item);

    // Enhanced hover effects
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(15px) scale(1.02)";
      this.style.boxShadow = "0 15px 35px rgba(30, 64, 175, 0.15)";

      // Icon animation
      const icon = this.querySelector(".feature-icon");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(10deg)";
        icon.style.background =
          "linear-gradient(135deg, var(--vra-gold), #ffb800)";
      }
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";

      const icon = this.querySelector(".feature-icon");
      if (icon) {
        icon.style.transform = "";
        icon.style.background = "";
      }
    });
  });

  // Add CSS for shimmer animation if not already present
  if (!document.querySelector("#shimmer-styles")) {
    const shimmerStyles = document.createElement("style");
    shimmerStyles.id = "shimmer-styles";
    shimmerStyles.textContent = `
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `;
    document.head.appendChild(shimmerStyles);
  }

  // Add intersection observer for navbar active states
  const sections = document.querySelectorAll("section[id]");
  const navbarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all nav links
          navLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to current section's nav link
          const activeLink = document.querySelector(
            `a[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-100px 0px -100px 0px",
    }
  );

  sections.forEach((section) => {
    navbarObserver.observe(section);
  });
});
