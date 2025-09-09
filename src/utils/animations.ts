import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Advanced animation presets
export const animationPresets = {
  // Hero entrance animations
  heroEntrance: {
    from: { opacity: 0, y: 100, scale: 0.8, rotationX: -15 },
    to: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotationX: 0, 
      duration: 1.5, 
      ease: "power3.out",
      stagger: 0.2
    }
  },

  // Text reveal animations
  textReveal: {
    from: { opacity: 0, y: 50, skewY: 5 },
    to: { 
      opacity: 1, 
      y: 0, 
      skewY: 0, 
      duration: 1, 
      ease: "power2.out",
      stagger: 0.1
    }
  },

  // Image parallax
  imageParallax: {
    yPercent: -50,
    ease: "none"
  },

  // Morphing animations
  morph: {
    from: { scale: 1, rotation: 0, borderRadius: "0%" },
    to: { 
      scale: 1.1, 
      rotation: 5, 
      borderRadius: "50%", 
      duration: 0.8, 
      ease: "power2.inOut"
    }
  },

  // Magnetic hover effect
  magnetic: {
    from: { scale: 1, x: 0, y: 0 },
    to: { 
      scale: 1.05, 
      x: "random(-20, 20)", 
      y: "random(-20, 20)", 
      duration: 0.3, 
      ease: "power2.out"
    }
  }
};

// Advanced scroll-triggered animations
export const createScrollAnimations = () => {
  // Parallax scrolling for hero sections
  gsap.utils.toArray(".parallax-element").forEach((element: unknown) => {
    const el = element as Element;
    gsap.to(el, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Staggered text animations
  gsap.utils.toArray(".text-reveal").forEach((element: unknown) => {
    const el = element as Element;
    const text = el.querySelectorAll("span");
    gsap.fromTo(text, 
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Image reveal animations
  gsap.utils.toArray(".image-reveal").forEach((element: unknown) => {
    const el = element as Element;
    gsap.fromTo(el,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Card hover animations
  gsap.utils.toArray(".hover-card").forEach((card: unknown) => {
    const el = card as Element;
    const tl = gsap.timeline({ paused: true });
    
    tl.to(el, {
      y: -20,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });

    el.addEventListener("mouseenter", () => tl.play());
    el.addEventListener("mouseleave", () => tl.reverse());
  });
};

// Text typing animation
export const typeText = (element: HTMLElement, text: string, speed: number = 50) => {
  return gsap.to(element, {
    text: text,
    duration: text.length * (speed / 1000),
    ease: "none"
  });
};

// Morphing text animation
export const morphText = (element: HTMLElement, texts: string[], duration: number = 2) => {
  const tl = gsap.timeline({ repeat: -1 });
  
  texts.forEach((text, index) => {
    tl.to(element, {
      text: text,
      duration: duration,
      ease: "power2.inOut"
    });
  });
  
  return tl;
};

// Advanced timeline animations
export const createAdvancedTimeline = () => {
  const tl = gsap.timeline();
  
  // Complex sequence with multiple elements
  tl.fromTo(".hero-title", 
    { opacity: 0, y: 100, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
  )
  .fromTo(".hero-subtitle",
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
    "-=0.5"
  )
  .fromTo(".hero-button",
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.3"
  )
  .fromTo(".hero-image",
    { opacity: 0, scale: 1.2, rotation: 5 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power2.out" },
    "-=1"
  );

  return tl;
};

// Physics-based animations
export const createPhysicsAnimation = (element: HTMLElement) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  
  tl.to(element, {
    y: "random(-20, 20)",
    x: "random(-10, 10)",
    rotation: "random(-5, 5)",
    duration: "random(2, 4)",
    ease: "power1.inOut"
  });

  return tl;
};

// Magnetic cursor effect
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Loading animation
export const createLoadingAnimation = (element: HTMLElement) => {
  const tl = gsap.timeline();
  
  tl.fromTo(element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
  )
  .to(element, {
    rotation: 360,
    duration: 2,
    ease: "none",
    repeat: -1
  });

  return tl;
};

// Page transition animations
export const createPageTransition = (direction: "in" | "out" = "in") => {
  const tl = gsap.timeline();
  
  if (direction === "in") {
    tl.fromTo("body",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(".page-content",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );
  } else {
    tl.to(".page-content",
      { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" }
    )
    .to("body",
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.2"
    );
  }

  return tl;
};

// Smooth scroll with Lenis integration
export const initSmoothScroll = () => {
  if (typeof window !== "undefined") {
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // GSAP ScrollTrigger integration
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });
  }
};

