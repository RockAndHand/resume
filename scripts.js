document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  // ====================================================
  // 1. Entrance Splash Fade-Out
  // ====================================================
  const splash = document.getElementById("splash");
  if (splash) {
    console.log("Splash overlay found.");
    // Fade out the splash overlay after 1.5 seconds and then remove it
    setTimeout(() => {
      splash.classList.add("hidden");
      console.log("Splash hidden now.");
      setTimeout(() => splash.remove(), 1000);
    }, 1500);
  } else {
    console.warn("Splash overlay (#splash) not found.");
  }

  // ====================================================
  // 2. Animated Particle Background
  // ====================================================
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) {
    console.error("Canvas element with id 'bgCanvas' not found!");
    return; // Stop execution if canvas isn't found
  }
  const ctx = canvas.getContext("2d");

  // Resize canvas to fit the window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particleSpeedInput = document.getElementById("particleSpeed");
  const displaySpeed = document.getElementById("displaySpeed");
  const particleSettingsForm = document.getElementById("particleSettingsForm");
  
  if (particleSpeedInput && displaySpeed) {
    particleSpeedInput.addEventListener("input", function() {
      displaySpeed.textContent = this.value;
    });
  }
  
  if (particleSettingsForm) {
    particleSettingsForm.addEventListener("submit", function (event) {
      event.preventDefault();  // Prevents the form from reloading the page
      const newSpeed = parseFloat(document.getElementById("particleSpeed").value);
      const newColor = document.getElementById("particleColor").value;
      setParticleSettings(newSpeed, newColor);
    });
  }// ----------------------------------------------------
  let particleSpeedFactor = 1;    // Multiplier for particle speed
  let particleColor = "#ffffff";  // Default particle color

  // Particle configuration
  const particleCount = 150;
  const particles = [];

  // Particle class definition
  class Particle {
    constructor() {
      this.radius = Math.random() * 2 + 1;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
      // Multiply by particleSpeedFactor to adjust speed dynamically
      this.x += this.speedX * particleSpeedFactor;
      this.y += this.speedY * particleSpeedFactor;
      // Wrap around the edges
      if (this.x < -this.radius) this.x = canvas.width + this.radius;
      if (this.x > canvas.width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = canvas.height + this.radius;
      if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = particleColor;  // Use the dynamic particleColor
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  console.log(`Initialized ${particles.length} particles.`);

  function animateParticles() {
    // Draw a semitransparent rectangle to create a trailing effect
    ctx.fillStyle = "rgba(4, 7, 22, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ----------------------------------------------------
  // 2a. Function for Updating Particle Settings
  // ----------------------------------------------------
  // This function can be called from the browser console or bound to UI inputs.
  // Example usage: setParticleSettings(2, "#ff00ff") to double the speed and change color.
  window.setParticleSettings = function (newSpeedFactor, newColor) {
    // Validate input values if necessary
    particleSpeedFactor = newSpeedFactor;
    particleColor = newColor;
    console.log(
      `Particle settings updated: speedFactor=${particleSpeedFactor}, color=${particleColor}`
    );
  };

  // ====================================================
  // 3. Other Interactive Site Features
  // ====================================================

  /* --- Smooth Scrolling for Navigation Links --- */
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const targetID = link.getAttribute("href").slice(1); // Remove the '#' symbol
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        // Smooth scroll to the target section
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* --- Highlight Active Navigation Link on Scroll --- */
  const sections = document.querySelectorAll("section");
  const highlightNav = () => {
    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove("active"));
    if (navLinks[index]) {
      navLinks[index].classList.add("active");
    }
  };
  highlightNav();
  window.addEventListener("scroll", highlightNav);

  /* --- Apply Fade-In Effect to Sections When They Enter the Viewport --- */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observerRef.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach((section) => observer.observe(section));

  /* --- Interactive Contact Form Submission --- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert(`Thank you, ${name}! Your message has been submitted.`);
      contactForm.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Section customization controls
  const sectionOpacityInput = document.getElementById("sectionOpacity");
  const displayOpacity = document.getElementById("displayOpacity");
  const sectionSettingsForm = document.getElementById("sectionSettingsForm");

  if (sectionOpacityInput && displayOpacity) {
    sectionOpacityInput.addEventListener("input", function () {
      displayOpacity.textContent = this.value;
    });
  }

  if (sectionSettingsForm) {
    sectionSettingsForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission from reloading the page
      const newOpacity = document.getElementById("sectionOpacity").value;
      const newColor = document.getElementById("sectionColor").value;
      setSectionAppearance(newOpacity, newColor);
    });
  }

  // Function to update section transparency and background color
  window.setSectionAppearance = function (newOpacity, newColor) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.background = `${newColor}`;
      section.style.opacity = `${newOpacity}`;
    });
    console.log(`Updated section appearance: Opacity=${newOpacity}, Color=${newColor}`);
  };
});
