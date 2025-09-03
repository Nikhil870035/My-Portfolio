
// Professional JavaScript Enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe experience boxes
    document.querySelectorAll('.exp-box').forEach(box => {
        observer.observe(box);
    });

    // Add interactive skill progress indicators
    const skills = document.querySelectorAll('.skills');
    skills.forEach((skill, index) => {
        // Add click interaction for skill details
        skill.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Add ripple effect
            createRipple(this, event);
        });

        // Add hover sound effect (visual feedback)
        skill.addEventListener('mouseenter', function () {
            this.style.filter = 'brightness(1.05)';
        });

        skill.addEventListener('mouseleave', function () {
            this.style.filter = 'brightness(1)';
        });

        // Stagger animation delays
        skill.style.animationDelay = `${0.1 * index}s`;
    });

    // Ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(style);

    // Smooth scroll for any navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * speed}deg)`;
        });
    });

    // Dynamic skill level colors based on proficiency
    const updateSkillColors = () => {
        skills.forEach(skill => {
            const level = skill.dataset.level;
            const span = skill.querySelector('span');

            // Add subtle glow effect based on skill level
            switch (level) {
                case 'experienced':
                    skill.style.boxShadow = '0 0 20px rgba(39, 174, 96, 0.1)';
                    break;
                case 'intermediate':
                    skill.style.boxShadow = '0 0 20px rgba(243, 156, 18, 0.1)';
                    break;
                case 'basic':
                    skill.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.1)';
                    break;
            }
        });
    };

    updateSkillColors();

    // Add loading animation
    const expBoxes = document.querySelectorAll('.exp-box');
    expBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';

        setTimeout(() => {
            box.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Download CV button
  const cvButton = document.querySelector(".cv");
  if (cvButton) {
    cvButton.addEventListener("click", () => {
      // Replace with your CV file path
      window.open("root/cv/Nikhil_sharma_3-4_FullStackDeveloper_Resume-1.docx", "_blank");
    });
  }

  // Contact Info button (scroll to contact section)
  const contactButton = document.querySelector(".contact");
  const contactSection = document.querySelector("#contact"); // target section
  if (contactButton && contactSection) {
    contactButton.addEventListener("click", () => {
      contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Smooth scroll for navbar links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

