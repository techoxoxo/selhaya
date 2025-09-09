"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// Premium CSS animations
const premiumStyles = `
  @keyframes premiumGlow {
    0%, 100% { 
      text-shadow: 0 0 5px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.1);
    }
    50% { 
      text-shadow: 0 0 20px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2);
    }
  }
  
  @keyframes luxuryFloat {
    0%, 100% { transform: translateY(0px) rotateX(0deg); }
    50% { transform: translateY(-3px) rotateX(2deg); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  .premium-text {
    background: linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff, #e8e8e8);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
  }
`;

// Inject premium styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = premiumStyles;
  document.head.appendChild(styleSheet);
}
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  User,
  ShoppingBag,
} from "lucide-react";
import { ThreeScene } from "@/components/ThreeScene";
import { 
  createScrollAnimations, 
  createMagneticEffect,
  initSmoothScroll
} from "@/utils/animations";

// Simple Performance Monitor (only in development)
const PerformanceMonitor = () => {
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded text-xs font-mono">
      <div>GSAP + Three.js Active</div>
    </div>
  );
};
// import "./scrollingPromotion.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Header Component with Subtle Animations and Scroll Effect
const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Gentle header entrance
    gsap.fromTo(headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Subtle logo animation
    gsap.fromTo(logoRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );

    // Gentle navigation stagger
    const navLinks = navRef.current?.querySelectorAll("a");
    if (navLinks) {
      gsap.fromTo(navLinks,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05, delay: 0.2 }
      );
    }

    // Subtle actions animation
    gsap.fromTo(actionsRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.3 }
    );

    // Very subtle magnetic effects
    navRef.current?.querySelectorAll("a").forEach((link) => {
      createMagneticEffect(link as HTMLElement, 0.1);
    });

    actionsRef.current?.querySelectorAll("button").forEach((button) => {
      createMagneticEffect(button as HTMLElement, 0.15);
    });

    // Header scroll effect - becomes translucent with gradient
    // ScrollTrigger.create({
    //   trigger: "body",
    //   start: "top top",
    //   end: "bottom bottom",
    //   onUpdate: (self) => {
    //     const progress = self.progress;
    //     if (headerRef.current) {
    //       gsap.to(headerRef.current, {
    //         backgroundColor: `rgba(255, 255, 255, ${Math.min(progress * 0.9, 0.9)})`,
    //         backdropFilter: `blur(${Math.min(progress * 20, 20)}px)`,
    //         duration: 0.3,
    //         ease: "power2.out"
    //       });
    //     }
    //   }
    // });

  }, []);

  return (
<header
  ref={headerRef}
  className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/10 via-white/0 to-transparent backdrop-blur-md"
>
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          <Image
            src="/assets/logo/logo.png"
            alt="Logo"
            width={120}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav ref={navRef} className="hidden md:flex space-x-8 text-sm font-light">
          <a
            href="#"
            className="uppercase font-bold hover:text-gray-800 transition-colors"
          >
            HOME
          </a>
          <a
            href="#"
            className="uppercase font-bold hover:text-gray-800 transition-colors"
          >
            THE YAKEEN
          </a>
          <a
            href="#"
            className="uppercase font-bold hover:text-gray-800 transition-colors"
          >
            WAVES OF LIGHT
          </a>
          <a
            href="#"
            className="uppercase font-bold hover:text-gray-800 transition-colors"
          >
            AL-HAYAH ROBES
          </a>
          <a
            href="#"
            className="uppercase font-bold hover:text-gray-800 transition-colors"
          >
            THE MAISON
          </a>
        </nav>

        {/* User Actions */}
        <div ref={actionsRef} className="flex items-center">
          <div className="flex items-center space-x-5 bg-white/90 border rounded-full px-5 py-2 shadow-sm">
            <button className="hover:text-gray-800">
              <User size={18} />
            </button>
            <button className="hover:text-gray-800">
              <Search size={18} />
            </button>
            <button className="hover:text-gray-800">
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({
  image,
  title,
  subtitle,
  ctaText,
  textPosition = "right",
  index,
  darkText = false,
  showButton = false,
}: {
  image: string;
  title: React.ReactNode;
  subtitle: string;
  ctaText?: string;
  textPosition?: "left" | "right";
  index: number;
  darkText?: boolean;
  showButton?: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current) {
      // Create a function to animate text
      const animateText = () => {
        // Animate the entire content container with luxury feel
        const contentElement = sectionRef.current?.querySelector(".hero-content");
        if (contentElement) {
          gsap.fromTo(
            contentElement,
            { 
              opacity: 0, 
              y: 60, 
              scale: 0.92,
              filter: "blur(10px)",
              rotationX: 8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              rotationX: 0,
              duration: 1.8,
              ease: "power3.out",
              delay: 0.3,
            }
          );
        }

        // Animate each word in the title with staggered reveal
        const titleElement = sectionRef.current?.querySelector("h1");
        if (titleElement) {
          const textNodes = Array.from(titleElement.childNodes).filter(node => 
            node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
          );
          
          // Create spans for text nodes
          textNodes.forEach(textNode => {
            const span = document.createElement('span');
            span.textContent = textNode.textContent;
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            textNode.parentNode?.replaceChild(span, textNode);
          });

          // Get all spans (both existing and newly created)
          const allSpans = titleElement.querySelectorAll("span");
          
          allSpans.forEach((span, wordIndex) => {
            if (index === 0) {
              // First slide - carpet/scroll unrolling effect
              gsap.set(span, {
                opacity: 0,
                scaleX: 0.1,
                scaleY: 0.05,
                rotationX: 180,
                rotationY: 0,
                rotationZ: 0,
                transformOrigin: "left center",
                skewX: 0,
                x: -50,
                y: 20
              });

              // Carpet unrolling animation with luxury feel
              gsap.to(span, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                skewX: 0,
                x: 0,
                y: 0,
                duration: 2.2,
                ease: "power2.out",
                delay: 0.8 + wordIndex * 0.25,
                onComplete: () => {
                  // Add gentle wave after unroll
                  gsap.to(span, {
                    y: -2,
                    rotationX: 1,
                    duration: 4 + wordIndex * 0.3,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1
                  });
                }
              });
            } else {
              // Other slides - regular unfolding
              gsap.set(span, {
                opacity: 0,
                scaleX: 0,
                scaleY: 0.1,
                rotationX: 90,
                rotationY: 15,
                transformOrigin: "center center",
                skewX: 10
              });

              // Unfolding animation with luxury feel
              gsap.to(span, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                rotationX: 0,
                rotationY: 0,
                skewX: 0,
                duration: 1.6,
                ease: "power3.out",
                delay: 0.5 + wordIndex * 0.2,
                onComplete: () => {
                  // Add gentle floating after unfold
                  gsap.to(span, {
                    y: -3,
                    rotationX: 2,
                    duration: 3 + wordIndex * 0.2,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1
                  });
                }
              });
            }
          });
        }

        // Animate subtitle with typewriter effect
        const subtitleElement = sectionRef.current?.querySelector("p");
        if (subtitleElement) {
          const subtitleText = subtitleElement.textContent || '';
          subtitleElement.innerHTML = '';
          
          subtitleText.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transformOrigin = 'left center';
            subtitleElement.appendChild(span);
            
            if (index === 0) {
              // First slide - carpet unrolling for subtitle
              gsap.set(span, {
                opacity: 0,
                scaleX: 0.05,
                scaleY: 0.02,
                rotationX: 180,
                rotationY: 0,
                rotationZ: 0,
                x: -30,
                y: 10,
                skewX: 0
              });
              
              // Carpet unrolling animation with luxury feel
              gsap.to(span, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                x: 0,
                y: 0,
                skewX: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 2.5 + charIndex * 0.08,
                onComplete: () => {
                  // Add gentle wave effect
                  gsap.to(span, {
                    y: -1,
                    rotationX: 0.5,
                    duration: 3 + charIndex * 0.1,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1
                  });
                }
              });
            } else {
              // Other slides - regular unfolding
              gsap.set(span, {
                opacity: 0,
                scaleX: 0,
                scaleY: 0.3,
                rotationX: 45,
                rotationZ: Math.random() * 20 - 10,
                y: 15,
                skewX: Math.random() * 10 - 5
              });
              
              // Unfolding animation with luxury feel
              gsap.to(span, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                rotationX: 0,
                rotationZ: 0,
                y: 0,
                skewX: 0,
                duration: 1.2,
                ease: "power2.out",
                delay: showButton ? 2.0 + charIndex * 0.05 : 1.2 + charIndex * 0.03,
                onComplete: () => {
                  // Add gentle wave effect
                  gsap.to(span, {
                    y: -1,
                    rotationZ: 1,
                    duration: 2 + charIndex * 0.1,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1
                  });
                }
              });
            }
          });
        }

        // Animate button with unfolding effect (only if button exists)
        if (showButton) {
          const buttonElement = sectionRef.current?.querySelector("button");
          if (buttonElement) {
            // Set initial folded state
            gsap.set(buttonElement, {
              opacity: 0,
              scaleX: 0,
              scaleY: 0.2,
              rotationX: 60,
              rotationY: 20,
              y: 40,
              skewX: 15,
              filter: "blur(15px)"
            });

            // Unfolding animation with luxury feel
            gsap.to(buttonElement, {
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              rotationX: 0,
              rotationY: 0,
              y: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: 2.0,
              ease: "power3.out",
              delay: 3.0,
              onComplete: () => {
                // Add magnetic hover effect
                createMagneticEffect(buttonElement as HTMLElement, 0.2);
                
                // Add organic floating
                gsap.to(buttonElement, {
                  y: -2,
                  rotationX: 1,
                  rotationY: 1,
                  duration: 3,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1
                });
              }
            });
          }
        }
      };

      // Create ScrollTrigger for this specific section with luxury feel
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Reset and animate when entering this section
          const contentElement = sectionRef.current?.querySelector(".hero-content");
          if (contentElement) {
            gsap.set(contentElement, {
              opacity: 0,
              y: 60,
              scale: 0.92,
              filter: "blur(10px)",
              rotationX: 8
            });
          }
          animateText();
        },
        onEnterBack: () => {
          // Animate when coming back to this section
          const contentElement = sectionRef.current?.querySelector(".hero-content");
          if (contentElement) {
            gsap.set(contentElement, {
              opacity: 0,
              y: 60,
              scale: 0.92,
              filter: "blur(10px)",
              rotationX: 8
            });
          }
          animateText();
        }
      });

      // Don't run initial animation - wait for scroll trigger
    }
  }, [textPosition, index]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden hero-section pt-0"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover'
        }}
      />

      {/* Overlay only for light text */}
      {!darkText && <div className="absolute inset-0 bg-black/30" />}

      {/* Content */}
      <div
        className={`absolute inset-0 flex items-center ${
          textPosition === "right" ? "justify-end pr-16" : "justify-start pl-16"
        }`}
      >
        <div
          className={`max-w-xl hero-content ${
            darkText ? "text-black" : "text-white"
          }`}
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-6 ${
            index === 0 
              ? "font-['Playfair_Display'] italic text-white" // First section - elegant serif italic with white text
              : index === 1 
              ? "font-['Inter'] font-light text-white" // Second section - clean sans-serif with white text
              : "font-['Playfair_Display'] font-bold text-white" // Third section - bold serif with white text
          }`} style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.1)',
            color: darkText ? '#000000' : '#ffffff'
          }}>
            {title}
          </h1>
          <p
            className={`text-base md:text-lg font-light leading-relaxed ${
              darkText ? "text-gray-800" : "text-white"
            }`}
            style={{
              color: darkText ? '#374151' : '#ffffff',
              textShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Button only on first page */}
      {showButton && (
        <div className="absolute bottom-12 inset-x-0 flex justify-center">
          <button className="bg-white text-gray-900 px-10 py-3 rounded-full font-light hover:bg-gray-100 transition-colors flex items-center space-x-3 shadow-lg hover:shadow-xl">
            <span className="text-sm tracking-wide">{ctaText}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

// Circular Animation Section
// Circular Animation Section
const CircularAnimationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<HTMLDivElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const radius = 280;

  useGSAP(() => {
    const progress = { value: 0 };
    const tl = gsap.to(progress, {
      value: 1,
      duration: 30,
      ease: "none",
      repeat: -1,
      paused: isHovered,
      onUpdate: () => {
        orbitRefs.current.forEach((ref, index) => {
          if (ref) {
            const angle =
              (index / 3) * Math.PI * 2 - progress.value * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            gsap.set(ref, { x, y });
          }
        });
      },
    });

    orbitRefs.current.forEach((ref, index) => {
      if (ref) {
        const angle = (index / 3) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(ref, { x, y });
      }
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const tl = gsap.getTweensOf({ value: 0 })[0];
    if (tl) {
      if (isHovered) {
        tl.pause();
      } else {
        tl.resume();
      }
    }
  }, [isHovered]);

  const orbitItems = [
    {
      title: "Pure Rare",
      description: "Exquisite craftsmanship in every detail",
      image: "https://picsum.photos/200/200?random=1",
    },
    {
      title: "Embrace",
      description: "Timeless elegance meets modern comfort",
      image: "https://picsum.photos/200/200?random=2",
    },
    {
      title: "Enchant",
      description: "Where tradition meets contemporary style",
      image: "https://picsum.photos/200/200?random=3",
    },
  ];

  return (
    <section className="py-20 bg-white relative z-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://picsum.photos/1920/1080?random=23')",
        }}
      />
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl font-serif text-gray-800 mb-6 font-medium">
            The Maison&apos;s Rare Offering – Sacred. Sealed.{" "}
            <span className="underline decoration-2 underline-offset-4">
              Remembered.
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl">
            Discover our exclusive collection where every piece tells a story of
            heritage, craftsmanship, and timeless elegance. Each garment is
            carefully curated to embody the essence of luxury and tradition.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative flex justify-center items-center h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={centerRef}
            className="absolute w-80 h-80 rounded-full overflow-hidden shadow-2xl z-10 border-4 border-white"
          >
            <Image
              src="https://picsum.photos/400/400?random=4"
              alt="Center model"
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          {orbitItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) orbitRefs.current[index] = el;
              }}
              className="absolute w-48 h-32 bg-white rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 border border-gray-200 p-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center space-x-3 h-full">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm font-medium text-gray-800 mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-light leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MaisonRareOffering = () => {
  const CIRCLE_SIZE = 520; // change if you want larger/smaller
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const specCardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Title animation with scroll trigger
    gsap.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 100, 
        scale: 0.8,
        rotationX: 90
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description animation
    gsap.fromTo(descriptionRef.current,
      { 
        opacity: 0, 
        y: 50, 
        x: -50
      },
      { 
        opacity: 1, 
        y: 0, 
        x: 0,
        duration: 1.2, 
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Center image animation
    gsap.fromTo(centerImageRef.current,
      { 
        opacity: 0, 
        scale: 0.5, 
        rotation: 180,
        filter: "blur(20px)"
      },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        filter: "blur(0px)",
        duration: 2, 
        ease: "elastic.out(1, 0.3)",
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Spec cards animation with smooth stagger
    gsap.fromTo(specCardsRef.current,
      { 
        opacity: 0, 
        scale: 0.3, 
        y: 100,
        rotation: 45,
        filter: "blur(15px)"
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.5, 
        ease: "back.out(1.7)", 
        stagger: 0.3,
        delay: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for center image
    gsap.to(centerImageRef.current, {
      y: -15,
      duration: 5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Floating animation for spec cards
    specCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -8,
          duration: 3 + index * 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2 + index * 0.2
        });
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-20">
      {/* Optional faint marble background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/marble.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-7xl px-8">
        {/* Heading - biased to left */}
        <div className="max-w-[52%]">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-serif font-medium text-gray-900 leading-tight mb-4"
          >
            The Maison&apos;s Rare Offering – Sacred. Sealed.{" "}
            <span className="italic underline decoration-2 underline-offset-4">
              Remembered.
            </span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-gray-600 text-base leading-7"
          >
            Yaqeen is a unique three-piece set in The Maison Collector Series —
            a rare abaya crafted from sketch to stitch in 100% pure silk for
            only 9 women in the world.
          </p>
        </div>

        {/* Spacer */}
        <div className="h-20 md:h-28 lg:h-36" />

        {/* Image area centered on page */}
        <div className="relative flex justify-center">
          {/* Stage wrapper (relative) */}
          <div
            className="relative pb-20"
            style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
          >
            {/* big white circle with subtle shadow (center image) */}
            <div
              ref={centerImageRef}
              className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-[0_40px_80px_rgba(15,23,42,0.12)]"
              style={{ zIndex: 10 }}
            >
              {/* Replace with your center model image */}
              <Image
                src="/assets/images/4_edited.png"
                alt="Center model"
                fill
                className="object-cover"
                sizes={`${CIRCLE_SIZE}px`}
              />
            </div>

            {/* SVG curved arrow starting from content area -> toward circle center */}
            <svg
              className="pointer-events-none absolute"
              width={520}
              height={360}
              viewBox="0 0 520 360"
              style={{
                left: -90, // shift right
                top: -190, // adjust vertical placement
                zIndex: 105,
                transform: "rotate(-10deg)", // rotate clockwise 30°
                transformOrigin: "center center", // pivot point
              }}
            >
              <defs>
                <marker
                  id="arrowHead"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 z" fill="#2b3138" />
                </marker>
              </defs>

              {/* smoother arc matching your screenshot */}
              <path
                d="M 400 20 
       C 500 120, 500 220, 380 340"
                fill="none"
                stroke="#2b3138"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#arrowHead)"
                opacity="0.95"
              />
            </svg>

            {/* SPEC CARDS: positioned around the circle at 11, 7 and 3 o'clock */}
            {/* 11 o'clock (upper-left) */}
            <SpecCard
              left={-40}
              top={-100}
              title="Outer Robe"
              img="/assets/images/5.png"
              copy="Blush matte silk crepe, hand-sewn pearl-work — finished with arabic calligraphy"
              cardRef={(el) => {
                if (el) specCardsRef.current[0] = el;
              }}
            />

            {/* 7 o'clock (lower-left) */}
            <SpecCard
              left={-40}
              top={360}
              title="Inner Dress"
              img="/assets/images/4.png"
              copy="Pure blush silk, with half-sleeves and discreet neckline — with subtle shimmer"
              cardRef={(el) => {
                if (el) specCardsRef.current[1] = el;
              }}
            />

            {/* 3 o'clock (right) */}
            <SpecCard
              left={460}
              top={150}
              title="Chiffon Hijab"
              img="/assets/images/6.png"
              copy="Soft silk chiffon drape, with embroidered edging"
              cardRef={(el) => {
                if (el) specCardsRef.current[2] = el;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/** Small spec card component — absolute-positioned using left/top px */
function SpecCard({
  left,
  top,
  title,
  img,
  copy,
  cardRef,
}: {
  left: number;
  top: number;
  title: string;
  img: string;
  copy: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className="absolute w-[160px] rounded-xl bg-white border border-gray-200 shadow-[0_14px_30px_rgba(15,23,42,0.06)] p-5 z-20 flex flex-col items-center hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-shadow duration-300"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
        <Image
          src={img}
          alt={title}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <h4 className="text-[13px] font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-[10px] text-gray-500 leading-[1.35]">{copy}</p>
    </div>
  );
}

type CardProps = {
  src: string;
  title?: string;
  price?: string;
  showInfo?: boolean; // controls whether bottom fade label shows
};

const ProductCard = ({
  src,
  title = "Rina Lemon",
  price = "Rs. 427,600.00",
  showInfo = true,
}: CardProps) => {
  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden group cursor-pointer">
      {/* main image */}
      <div className="relative h-full w-full">
        <Image src={src} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* top slim label (always visible) */}
      <div className="absolute left-3 top-3 rounded bg-white/95 px-2 py-1 text-[10px] tracking-wide text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
        RINA LEMON · A RObE FOR JOY
      </div>

      {/* top-right shopping bag */}
      <button className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/95 shadow-lg grid place-items-center hover:bg-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <ShoppingBag className="h-4 w-4 text-gray-700" />
      </button>

      {/* bottom foggy fade info (only for 1st card in pair) */}
      {showInfo && (
        <div className="absolute inset-x-0 bottom-0">
          {/* foggy gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-sm" />

          {/* content on top */}
          <div className="relative p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-gray-900">
                  {title}
                </p>
                <p className="text-[11px] text-gray-600">A Robe for Joy</p>
              </div>

              <p className="text-[13px] font-medium text-gray-900 mt-1">
                {price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Heading = ({ className = "" }: { className?: string }) => {
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    // Add subtle floating animation
    gsap.to(headingRef.current, {
      y: -1,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Add luxury hover effects
    const handleMouseEnter = () => {
      gsap.to(headingRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(headingRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    headingRef.current.addEventListener('mouseenter', handleMouseEnter);
    headingRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      headingRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      headingRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={headingRef} className={`relative cursor-pointer ${className}`}>
      <h3 className="text-[36px] leading-none font-semibold text-black transition-all duration-300">
        Pure
      </h3>
      <div className="-mt-1">
        <span className="text-[36px] italic font-serif leading-none transition-all duration-300">
          Brilliance
        </span>
      </div>
    </div>
  );
};

const ArrowCircle = ({ className = "" }: { className?: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!buttonRef.current) return;

    // Add subtle pulsing animation
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Add luxury hover effects
    const handleMouseEnter = () => {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
    buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      buttonRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      buttonRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      aria-label="Next"
      className={`h-12 w-12 rounded-full bg-stone-200/70 hover:bg-stone-300 transition-all duration-300 grid place-items-center shadow-lg backdrop-blur-sm arrow-circle ${className}`}
    >
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

const SimplicitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the entire section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => {
        // Create a master timeline for coordinated animations
        const tl = gsap.timeline();

        // Animate left image with dramatic 3D entrance
        if (leftImageRef.current) {
          tl.fromTo(leftImageRef.current, 
            {
              opacity: 0,
              y: 120,
              scale: 0.6,
              rotationX: 60,
              rotationY: 30,
              rotationZ: 15,
              transformOrigin: "center center",
              filter: "blur(20px) brightness(0.5)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 0.2);
        }

        // Animate right content with explosive wave effect
        if (rightContentRef.current) {
          const heading = rightContentRef.current.querySelector('.heading-container');
          const cards = rightContentRef.current.querySelectorAll('.luxury-card');
          const description = rightContentRef.current.querySelector('p');

          // Heading with dramatic wave animation
          if (heading) {
            tl.fromTo(heading,
              {
                opacity: 0,
                y: 80,
                scale: 0.7,
                rotationY: 45,
                rotationX: 20,
                skewX: 20,
                skewY: 10,
                filter: "blur(15px)"
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                skewX: 0,
                skewY: 0,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "elastic.out(1, 0.5)"
              }, 0.6);
          }

          // Cards with explosive staggered effect
          tl.fromTo(cards,
            {
              opacity: 0,
              y: 100,
              scale: 0.5,
              rotationX: 45,
              rotationY: 30,
              rotationZ: 25,
              filter: "blur(10px) saturate(0)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              filter: "blur(0px) saturate(1)",
              duration: 1.5,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.6,
                from: "start",
                ease: "power2.out"
              }
            }, 0.8);
        }

        // Animate bottom left content with spiral explosion
        if (bottomLeftRef.current) {
          const heading = bottomLeftRef.current.querySelector('.heading-container');
          const cards = bottomLeftRef.current.querySelectorAll('.luxury-card');
          const description = bottomLeftRef.current.querySelector('p');

          // Heading with spiral explosion
          if (heading) {
            tl.fromTo(heading,
              {
                opacity: 0,
                y: 80,
                scale: 0.7,
                rotationY: -45,
                rotationX: -20,
                rotationZ: 180,
                skewX: -20,
                skewY: -10,
                filter: "blur(15px) hue-rotate(90deg)"
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                rotationZ: 0,
                skewX: 0,
                skewY: 0,
                filter: "blur(0px) hue-rotate(0deg)",
                duration: 1.8,
                ease: "elastic.out(1, 0.5)"
              }, 1.2);
          }

          // Cards with spiral explosion stagger
          tl.fromTo(cards,
            {
              opacity: 0,
              y: 100,
              scale: 0.5,
              rotationX: -45,
              rotationY: -30,
              rotationZ: -25,
              filter: "blur(10px) saturate(0) hue-rotate(180deg)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              filter: "blur(0px) saturate(1) hue-rotate(0deg)",
              duration: 1.5,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.6,
                from: "end",
                ease: "power2.out"
              }
            }, 1.4);
        }

        // Animate bottom right image with cinematic zoom
        if (bottomRightImageRef.current) {
          tl.fromTo(bottomRightImageRef.current,
            {
              opacity: 0,
              y: 120,
              scale: 0.4,
              rotationX: -60,
              rotationY: -30,
              rotationZ: -15,
              transformOrigin: "center center",
              filter: "blur(20px) brightness(0.3) contrast(0.5)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              filter: "blur(0px) brightness(1) contrast(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 1.0);
        }

        // Add dramatic descriptions with typewriter effect
        const descriptions = sectionRef.current?.querySelectorAll('p');
        descriptions?.forEach((desc, index) => {
          tl.fromTo(desc,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
              rotationX: 15,
              filter: "blur(8px)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out"
            }, 1.6 + index * 0.2);
        });
      },
      onLeave: () => {
        // Don't reset - keep elements visible
      },
      onEnterBack: () => {
        // Re-trigger animations when coming back
        ScrollTrigger.refresh();
      }
    });

    // Add cinematic hover effects to images
    const images = [leftImageRef.current, bottomRightImageRef.current];
    images.forEach((image) => {
      if (image) {
        image.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.08,
            rotationY: 8,
            rotationX: 4,
            rotationZ: 2,
            y: -10,
            filter: "brightness(1.1) contrast(1.1) saturate(1.2)",
            duration: 0.8,
            ease: "power3.out"
          });
        });

        image.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            rotationZ: 0,
            y: 0,
            filter: "brightness(1) contrast(1) saturate(1)",
            duration: 0.8,
            ease: "power3.out"
          });
        });
      }
    });

    // Add magnetic explosion effect to product cards
    const cards = sectionRef.current?.querySelectorAll('.luxury-card');
    cards?.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.12,
          y: -15,
          rotationY: index % 2 === 0 ? 8 : -8,
          rotationX: 5,
          rotationZ: index % 2 === 0 ? 3 : -3,
          boxShadow: "0 35px 70px rgba(0,0,0,0.3), 0 0 30px rgba(0,0,0,0.1)",
          filter: "brightness(1.05) saturate(1.1)",
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          rotationZ: 0,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          filter: "brightness(1) saturate(1)",
          duration: 0.6,
          ease: "power3.out"
        });
      });
    });

    // Add dramatic floating animation to headings
    const headings = sectionRef.current?.querySelectorAll('.heading-container');
    headings?.forEach((heading) => {
      gsap.to(heading, {
        y: -4,
        rotationZ: 1,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Add dramatic pulsing effect to arrow circles
    const arrows = sectionRef.current?.querySelectorAll('.arrow-circle');
    arrows?.forEach((arrow) => {
      gsap.to(arrow, {
        scale: 1.15,
        rotation: 5,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Add continuous subtle animations to all elements
    const allElements = sectionRef.current?.querySelectorAll('.luxury-image, .luxury-card, .heading-container');
    allElements?.forEach((element, index) => {
      // Add subtle breathing effect
      gsap.to(element, {
        scale: 1.02,
        duration: 3 + index * 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    });

  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 lg:px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left large image */}
          <div ref={leftImageRef} className="relative h-[520px] lg:h-[560px] rounded-lg overflow-hidden luxury-image cursor-pointer group">
            <Image
              src="/assets/images/pure-left.webp"
              alt="Model with horse"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Pure Collection
            </div>
          </div>

          {/* Right: heading + cards */}
          <div ref={rightContentRef} className="relative">
            <div className="flex items-start justify-between heading-container">
              <Heading />
              <ArrowCircle />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="luxury-card">
                <ProductCard src="/assets/images/7.png" showInfo />
              </div>
              <div className="luxury-card">
                <ProductCard src="/assets/images/8.png" showInfo={false} />
              </div>
            </div>

            <p className="mt-4 text-[13px] text-gray-700">
              Step into stillness. Carry it with you. Wear it with grace.
            </p>
          </div>

          {/* Bottom-left */}
          <div ref={bottomLeftRef} className="relative">
            <div className="flex items-start justify-between heading-container">
              <Heading />
              <ArrowCircle />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="luxury-card">
                <ProductCard src="/assets/images/9.png" showInfo />
              </div>
              <div className="luxury-card">
                <ProductCard src="/assets/images/10.png" showInfo={false} />
              </div>
            </div>

            <p className="mt-4 text-[13px] text-gray-700">
              Every piece tells a story of devotion, dignity, and design.
            </p>
          </div>

          {/* Bottom-right large image */}
          <div ref={bottomRightImageRef} className="relative h-[520px] lg:h-[560px] rounded-lg overflow-hidden luxury-image cursor-pointer group">
            <Image
              src="/assets/images/horse-side.png"
              alt="Model with horse"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Luxury Line
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalBrandSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const seeAllRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Animate headline with dramatic typewriter effect
        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll('span, br');
          words.forEach((word, index) => {
            gsap.set(word, {
              opacity: 0,
              y: 100,
              rotationX: 90,
              filter: "blur(20px)"
            });
            
            tl.to(word, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power4.out"
            }, index * 0.3);
          });
        }

        // Animate see all button with floating effect
        if (seeAllRef.current) {
          tl.fromTo(seeAllRef.current, 
            {
              opacity: 0,
              scale: 0,
              rotation: 180,
              y: -50
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 1.2,
              ease: "back.out(1.7)"
            }, 0.5);

          // Add continuous floating animation
          gsap.to(seeAllRef.current, {
            y: -5,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }

        // Animate image with 3D flip and zoom
        if (imageRef.current) {
          tl.fromTo(imageRef.current,
            {
              opacity: 0,
              scale: 0.5,
              rotationX: 60,
              rotationY: 30,
              filter: "blur(15px) brightness(0.7)"
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 1.0);
        }

        // Animate content with staggered reveal
        if (contentRef.current) {
          const items = contentRef.current.querySelectorAll('div');
          items.forEach((item, index) => {
            tl.fromTo(item,
              {
                opacity: 0,
                x: 100,
                rotationY: 45,
                filter: "blur(10px)"
              },
              {
                opacity: 1,
                x: 0,
                rotationY: 0,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power3.out"
              }, 1.5 + index * 0.4);
          });
        }
      }
    });

    // Add hover effects to image
    if (imageRef.current) {
      imageRef.current.addEventListener('mouseenter', () => {
        gsap.to(imageRef.current, {
          scale: 1.05,
          rotationY: 5,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      imageRef.current.addEventListener('mouseleave', () => {
        gsap.to(imageRef.current, {
          scale: 1,
          rotationY: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }

    // Add hover effects to content items
    const contentItems = contentRef.current?.querySelectorAll('div');
    contentItems?.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          x: 10,
          filter: "brightness(1.05)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          x: 0,
          filter: "brightness(1)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Headline */}
        <h2 ref={headlineRef} className="text-center text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
          LONDON BORN, <span className="italic font-normal">Abu Dhabi</span>{" "}
          <span className="italic font-light">inspired,</span> WORN
          <br />
          <span className="block mt-2 text-6xl md:text-7xl font-extrabold">
            WORLDWIDE.
          </span>
        </h2>

        {/* See All Button */}
        <div ref={seeAllRef} className="absolute right-12 top-20 flex flex-col items-center text-gray-500 text-xs tracking-wide cursor-pointer group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 group-hover:border-gray-600 transition-colors duration-300">
            <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="mt-2 group-hover:text-gray-700 transition-colors duration-300">SEE ALL</span>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          {/* Left Image */}
          <div ref={imageRef} className="relative group cursor-pointer">
            <div className="overflow-hidden rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src="/assets/images/hand.png"
                alt="Hands with sun"
                width={600}
                height={500}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Global Collection
            </div>
          </div>

          {/* Right Content */}
          <div ref={contentRef} className="space-y-10">
            <div className="group cursor-pointer">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                YAQEEN THE MAISON&apos;S RARE OFFERING
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Yaqeen is a unique three–piece set in The Maison Collector
                Series — a rare abaya crafted from sketch to stitch in 100% pure
                silk for only 9 women in the world.
              </p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                THE HOUSE THAT QUIETLY GIVES
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                The Maison was born not only of elegance – but of intention.
                From the moment the House opened its doors, a quiet promise was
                made: to design not only for beauty, but for barakah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pure & Quiet Praise Section
const PureQuietSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Animate left card with dramatic 3D entrance
        if (leftCardRef.current) {
          tl.fromTo(leftCardRef.current,
            {
              opacity: 0,
              x: -200,
              rotationY: -45,
              scale: 0.8,
              filter: "blur(20px) brightness(0.5)"
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              scale: 1,
              filter: "blur(0px) brightness(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 0.2);
        }

        // Animate right content with wave effect
        if (rightContentRef.current) {
          const title = rightContentRef.current.querySelector('h2');
          const subtitle = rightContentRef.current.querySelector('p');
          
          if (title) {
            tl.fromTo(title,
              {
                opacity: 0,
                y: 100,
                rotationX: 90,
                filter: "blur(15px)"
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "elastic.out(1, 0.5)"
              }, 0.6);
          }

          if (subtitle) {
            tl.fromTo(subtitle,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
                filter: "blur(10px)"
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power3.out"
              }, 1.0);
          }
        }

        // Animate cards with staggered explosion
        cardsRef.current.forEach((card, index) => {
          if (card) {
            tl.fromTo(card,
              {
                opacity: 0,
                y: 100,
                scale: 0.5,
                rotationX: 60,
                rotationY: 30,
                filter: "blur(15px) saturate(0)"
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                filter: "blur(0px) saturate(1)",
                duration: 1.5,
                ease: "back.out(1.7)"
              }, 1.2 + index * 0.3);
          }
        });
      }
    });

    // Add hover effects to left card
    if (leftCardRef.current) {
      leftCardRef.current.addEventListener('mouseenter', () => {
        gsap.to(leftCardRef.current, {
          scale: 1.05,
          rotationY: 5,
          y: -10,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      leftCardRef.current.addEventListener('mouseleave', () => {
        gsap.to(leftCardRef.current, {
          scale: 1,
          rotationY: 0,
          y: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }

    // Add hover effects to cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.08,
            y: -15,
            rotationY: 5,
            filter: "brightness(1.1) saturate(1.1)",
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            filter: "brightness(1) saturate(1)",
            duration: 0.5,
            ease: "power2.out"
          });
        });
      }
    });

    // Add continuous floating animation to cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -3,
          duration: 3 + index * 0.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="bg-[#2a2a2a] text-white py-20 px-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-purple-400/20 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-green-400/25 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-2.5 h-2.5 bg-orange-400/15 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        {/* Left Large Card */}
        <div ref={leftCardRef} className="bg-white text-black rounded-md overflow-hidden shadow-2xl group cursor-pointer">
          <div className="relative overflow-hidden">
            <Image
              src="/assets/images/left-1.webp"
              alt="Wrapped in Meaning"
              width={600}
              height={500}
              className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Featured Story
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium mb-3 group-hover:text-blue-600 transition-colors duration-300">
              Wrapped in Meaning: Gifting as Ritual at Selhaya
            </h3>
            <p className="text-sm text-gray-600 mb-5 group-hover:text-gray-700 transition-colors duration-300">
              Introduction In the House of Selhaya, packaging is not an
              afterthought. It is an offering. A quiet gesture of reverence. A
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">June 9, 2025</span>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div ref={rightContentRef} className="lg:col-span-2 flex flex-col justify-between items-center">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-3xl font-light italic bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Press{" "}
              <span className="not-italic font-semibold">& Quiet Praise</span>
            </h2>
            <p className="text-sm text-gray-300 mt-3 max-w-2xl group-hover:text-white transition-colors duration-300">
              A curated space for every mention, every whisper, every headline.
              As Selhaya finds its way into hearts and homes, these features
              tell our story through other eyes.
            </p>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div 
              ref={(el) => { if (el) cardsRef.current[0] = el; }}
              className="bg-white text-black rounded-md overflow-hidden shadow-2xl group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/images/right-1.webp"
                  alt="The Maison Registry"
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  The Maison Registry: Designed to Remember You
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">June 2, 2025</span>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                    Read More →
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              ref={(el) => { if (el) cardsRef.current[1] = el; }}
              className="bg-white text-black rounded-md overflow-hidden shadow-2xl group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/images/right-2.jpg"
                  alt="Crafted in Rarity"
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  Crafted in Rarity: Why Selhaya Does Not Mass Produce
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">May 26, 2025</span>
                  <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* See All Button */}
          <div className="flex justify-center lg:justify-end mt-10">
            <a
              href="#"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <span className="mr-3">SEE ALL</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
// const NewsletterSection = () => {
//   return (
//     <section className="py-20 bg-stone-50 relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[600px]">
//           {/* Left Image */}
//           <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//             <Image
//               src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//               alt="Woman in flowing dress with horse"
//               width={600}
//               height={600}
//               className="w-full h-full object-cover min-h-[600px]"
//             />
//             {/* Left side text overlay */}
//             <div className="absolute bottom-8 left-8 right-8">
//               <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg">
//                 <div className="grid grid-cols-2 gap-6 text-xs">
//                   <div>
//                     <h4 className="font-semibold text-amber-900 mb-2 tracking-wider">
//                       SIZING
//                     </h4>
//                     <p className="text-gray-600 leading-relaxed">
//                       XS/S
//                       <br />
//                       Model: 5&apos;8&quot;
//                       <br />
//                       Wearing: XS/S
//                       <br />
//                       Material: Linen
//                       <br />
//                       Care: Hand Wash
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-amber-900 mb-2 tracking-wider">
//                       MATERIALS & TECHNIQUES
//                     </h4>
//                     <p className="text-gray-600 leading-relaxed">
//                       100% Linen & Silk Chiffon
//                       <br />
//                       The Linen/Chiffon
//                       <br />
//                       Sustainable
//                       <br />
//                       Natural Dye
//                       <br />
//                       Made in Australia
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <h4 className="font-semibold text-amber-900 mb-2 tracking-wider">
//                     COMPOSITION
//                   </h4>
//                   <p className="text-gray-600 text-xs leading-relaxed">
//                     Responsibly woven using 100% Natural Linen
//                     <br />
//                     Composition/details
//                     <br />
//                     CompositionalIngredient
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Image with Overlay */}
//           <div className="relative">
//             <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//               <Image
//                 src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
//                 alt="Blonde woman with horse in natural setting"
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover min-h-[600px]"
//               />
//             </div>

//             {/* Newsletter Overlay Card */}
//             <div className="absolute inset-0 flex items-center justify-center p-8">
//               <div className="w-full max-w-[380px] bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center">
//                 <h2 className="text-3xl font-serif text-white mb-4 leading-tight">
//                   Let The <em className="italic font-normal">house</em>
//                   <br />
//                   <span className="block">remember You</span>
//                 </h2>

//                 <p className="text-gray-300 text-sm leading-relaxed mb-8">
//                   Be quietly invited to exquisite previews, sacred
//                   <br />
//                   unveilings & refined offerings. Your name becomes part
//                   <br />
//                   of the registry. The house remembers.
//                 </p>

//                 {/* Email Subscription Form */}
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <input
//                       type="email"
//                       placeholder="Enter Your Email"
//                       className="w-full px-4 py-4 bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 rounded-lg focus:bg-white/15 focus:border-white/30 focus:outline-none transition-all duration-300"
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-4 px-6 rounded-lg text-sm font-semibold tracking-widest transition-colors duration-300"
//                     onClick={() => console.log("Subscribe clicked")}
//                   >
//                     SUBSCRIBE
//                   </button>
//                 </div>

//                 {/* Decorative Element */}
//                 <div className="mt-6">
//                   <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center">
//                     <div className="w-6 h-6 bg-white/20 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



const NewsletterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Animate left image with dramatic entrance
        if (leftImageRef.current) {
          tl.fromTo(leftImageRef.current,
            {
              opacity: 0,
              x: -200,
              scale: 0.8,
              rotationY: -30,
              filter: "blur(15px) brightness(0.7)"
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 0.2);
        }

        // Animate right image with dramatic entrance
        if (rightImageRef.current) {
          tl.fromTo(rightImageRef.current,
            {
              opacity: 0,
              x: 200,
              scale: 0.8,
              rotationY: 30,
              filter: "blur(15px) brightness(0.7)"
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.0,
              ease: "power4.out"
            }, 0.4);
        }

        // Animate overlay with floating effect
        if (overlayRef.current) {
          tl.fromTo(overlayRef.current,
            {
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotationX: 45,
              filter: "blur(20px)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 2.5,
              ease: "elastic.out(1, 0.5)"
            }, 1.0);
        }

        // Animate footer with staggered reveal
        if (footerRef.current) {
          const footerItems = footerRef.current.querySelectorAll('div, ul, p');
          footerItems.forEach((item, index) => {
            tl.fromTo(item,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
                filter: "blur(10px)"
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out"
              }, 1.5 + index * 0.1);
          });
        }
      }
    });

    // Add hover effects to images
    if (leftImageRef.current) {
      leftImageRef.current.addEventListener('mouseenter', () => {
        gsap.to(leftImageRef.current, {
          scale: 1.05,
          rotationY: -5,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      leftImageRef.current.addEventListener('mouseleave', () => {
        gsap.to(leftImageRef.current, {
          scale: 1,
          rotationY: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }

    if (rightImageRef.current) {
      rightImageRef.current.addEventListener('mouseenter', () => {
        gsap.to(rightImageRef.current, {
          scale: 1.05,
          rotationY: 5,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      rightImageRef.current.addEventListener('mouseleave', () => {
        gsap.to(rightImageRef.current, {
          scale: 1,
          rotationY: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }

    // Add floating animation to overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        y: -3,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

  }, []);

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500/3 to-blue-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative w-full z-10">
        {/* Two Side-by-Side Images */}
        <div className="grid grid-cols-2 gap-3 w-full justify-around">
          <div ref={leftImageRef} className="relative h-[550px] w-full p-2 group cursor-pointer">
            <Image
              src="/assets/images/pure-left.webp"
              alt="Close up woman with horse"
              fill
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Pure Collection
            </div>
          </div>
          <div ref={rightImageRef} className="relative h-[550px] w-full p-2 group cursor-pointer">
            <Image
              src="/assets/images/horse-side.png"
              alt="Woman with horse portrait"
              fill
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              Luxury Line
            </div>
          </div>
        </div>

        {/* Newsletter Overlay positioned midway over second image */}
        <div ref={overlayRef} className="absolute top-6/7 right-29 -translate-y-1/2 z-20 group">
          <div className="w-[520px] bg-gradient-to-br from-neutral-900 via-gray-900 to-black text-white rounded-2xl shadow-2xl p-10 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-serif mb-4 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500">
              Let The <em className="italic font-normal">house</em>
              <br />
              remember You
            </h2>

            <p className="text-gray-300 text-xs leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
              Be quietly invited to capsule previews, sacred unveilings, and private offerings.
              <br /> Your name becomes part of the registry. The house remembers.
            </p>

            {/* Email Input */}
            <div className="space-y-4 flex flex-col items-center">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-[80%] px-4 py-4 bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 rounded-full focus:bg-white/15 focus:border-white/30 focus:outline-none transition-all duration-300 hover:bg-white/12 hover:border-white/25"
              />

              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 py-4 px-4 rounded-full text-sm font-semibold tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <ArrowRight
                  size={20}
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
                <span className="text-sm font-light text-gray-300 group-hover:text-white transition-colors duration-300">SUBSCRIBE</span>
            </div>

            {/* Fine Print */}
            <p className="text-xs text-gray-400 mt-6 group-hover:text-gray-300 transition-colors duration-300">
              No Spam, only quality articles to help you be more mindful. You can opt out anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div ref={footerRef} className="max-w-8xl mx-auto px-6 py-16">
      <div className="w-full flex justify-start">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600 max-w-3xl">
    <div className="w-2/3 group cursor-pointer">
      <h4 className="font-xs mb-3 group-hover:text-blue-600 transition-colors duration-300">EXPLORE</h4>
      <ul className="space-y-1">
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-blue-500 cursor-pointer">Registry</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-blue-500 cursor-pointer">Returns Policy</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-blue-500 cursor-pointer">Privacy Policy</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-blue-500 cursor-pointer">Terms Of Service</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-blue-500 cursor-pointer">Shipping Policy</li>
      </ul>
    </div>
    <div className="w-2/3 group cursor-pointer">
      <h4 className="font-semibold mb-3 group-hover:text-purple-600 transition-colors duration-300">EXPLORE</h4>
      <ul className="space-y-1">
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-purple-500 cursor-pointer">The Founder & The House</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-purple-500 cursor-pointer">The House Journal</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-purple-500 cursor-pointer">The Quiet Offering</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-purple-500 cursor-pointer">Speak With</li>
        <li className="group-hover:text-gray-800 transition-colors duration-300 hover:text-purple-500 cursor-pointer">The House Press</li>
      </ul>
    </div>
    <div className="group cursor-pointer">
      <h4 className="font-semibold mb-3 group-hover:text-green-600 transition-colors duration-300">THE HOUSE CONCIERGE</h4>
      <p className="group-hover:text-gray-800 transition-colors duration-300">
        For discreet gifting enquiries, thoughtful gestures or kind words to The House:
        <br /> <span className="hover:text-green-500 transition-colors duration-300">concierge@selhaya.com</span>
      </p>
      <p className="mt-2 group-hover:text-gray-800 transition-colors duration-300">
        Correspondence Only: 6 South Molton Street, Mayfair, London, W1K 5QF
      </p>
    </div>
  </div>
</div>


        {/* Bottom Logo & Icons */}
        <div className="mt-12 border-t pt-8 text-xs text-gray-500 group">
  {/* Top row */}
    {/* Left side: Logo + Socials */}
    <div className="mb-2 group-hover:scale-105 transition-transform duration-300">
      <Image src="/assets/logo/logo.png" alt="Selhaya Logo" width={80} height={40} className="group-hover:drop-shadow-lg transition-all duration-300" />
    </div>
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="flex items-center gap-3">
      <a href="#" aria-label="Instagram" className="group-hover:scale-110 transition-transform duration-300">
        <Image src="/assets/icon/instagram.png" alt="Instagram" width={20} height={20} className="group-hover:drop-shadow-md transition-all duration-300" />
      </a>
      <a href="#" aria-label="YouTube" className="group-hover:scale-110 transition-transform duration-300">
        <Image src="/assets/icon/youtube.png" alt="YouTube" width={20} height={20} className="group-hover:drop-shadow-md transition-all duration-300" />
      </a>
    </div>

    {/* Right side: Payment icons */}
    <div className="flex gap-4 mt-4 md:mt-0">
      <Image src="/assets/icon/paypal.png" alt="PayPal" width={40} height={24} className="group-hover:scale-105 transition-transform duration-300" />
      <Image src="/assets/icon/amex.png" alt="Amex" width={40} height={24} className="group-hover:scale-105 transition-transform duration-300" />
      <Image src="/assets/icon/visa.png" alt="Visa" width={40} height={24} className="group-hover:scale-105 transition-transform duration-300" />
      <Image src="/assets/icon/mastercard.png" alt="Mastercard" width={40} height={24} className="group-hover:scale-105 transition-transform duration-300" />
    </div>
  </div>

  {/* Bottom text */}
  <p className="mt-4 text-left max-w-3xl group-hover:text-gray-700 transition-colors duration-300">
    © 2025 Selhaya. All Designs, Imagery, And Written Content Are The Intellectual Property Of Selhaya Ltd.
    Unauthorized Use Or Reproduction Is Not Permitted.
  </p>
</div>

      </div>
    </section>
  );
};

// export default NewsletterSection;


const ScrollingPromotionSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const logosRef = useRef<HTMLDivElement[]>([]);

    const logos = [
      { src: "/assets/sponser/new-york-journall.png", alt: "NYC Journal" },
      { src: "/assets/sponser/british_vogue.png", alt: "British Vogue" },
      { src: "/assets/sponser/womens_herald_logo.png", alt: "Womens Herald" },
      { src: "/assets/sponser/harpers_bazaar_arabia.png", alt: "Harpers Bazaar Arabia" },
      { src: "/assets/sponser/bisuness-insider.jpg", alt: "Business Insider" },
      { src: "/assets/sponser/ny_weekly_logo.png", alt: "NY Weekly" },
      { src: "/assets/sponser/retail-times.png", alt: "Retail Times" },
      { src: "/assets/sponser/Artboard_7.png", alt: "Artboard 7" },
    ];

    useGSAP(() => {
      if (!sectionRef.current || !containerRef.current) return;

      // Create ScrollTrigger for the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          // Animate container entrance
          gsap.fromTo(containerRef.current,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
              filter: "blur(10px)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power3.out"
            }
          );

          // Animate individual logos with staggered effect
          logosRef.current.forEach((logo, index) => {
            if (logo) {
              gsap.fromTo(logo,
                {
                  opacity: 0,
                  y: 30,
                  scale: 0.8,
                  rotationY: 45,
                  filter: "blur(5px) saturate(0)"
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  filter: "blur(0px) saturate(1)",
                  duration: 1.0,
                  ease: "back.out(1.7)",
                  delay: index * 0.1
                }
              );
            }
          });
        }
      });

      // Add hover effects to logos
      logosRef.current.forEach((logo) => {
        if (logo) {
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              scale: 1.2,
              y: -10,
              rotationY: 5,
              filter: "brightness(1.1) saturate(1.2)",
              duration: 0.4,
              ease: "power2.out"
            });
          });

          logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
              scale: 1,
              y: 0,
              rotationY: 0,
              filter: "brightness(1) saturate(1)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
      });

      // Add continuous floating animation
      logosRef.current.forEach((logo, index) => {
        if (logo) {
          gsap.to(logo, {
            y: -2,
            duration: 2 + index * 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

    }, []);

    return (
      <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div ref={containerRef} className="relative z-10">
          <div className="flex whitespace-nowrap">
            <div className="flex animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
              {/* First row */}
              <div className="flex flex-nowrap min-w-full">
                {logos.map((logo, i) => (
                  <div 
                    key={i} 
                    ref={(el) => { if (el) logosRef.current[i] = el; }}
                    className="flex-shrink-0 mx-10 md:mx-[70px] flex items-center group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Duplicate row */}
              <div className="flex flex-nowrap min-w-full">
                {logos.map((logo, i) => (
                  <div 
                    key={`dup-${i}`} 
                    ref={(el) => { if (el) logosRef.current[i + logos.length] = el; }}
                    className="flex-shrink-0 mx-10 md:mx-[70px] flex items-center group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </section>
    );
  };
  

// Main Homepage Component
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scroll
  useEffect(() => {
    initSmoothScroll();
  }, []);

  useGSAP(() => {
    // Create smooth vertical scroll animations for hero sections with auto-advance
    const heroSections = gsap.utils.toArray(".hero-section");
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Create smooth slide transitions
    const transitionToSlide = (targetSlide: number) => {
      if (isTransitioning || targetSlide === currentSlide) return;
      
      isTransitioning = true;
      const currentElement = heroSections[currentSlide] as Element;
      const targetElement = heroSections[targetSlide] as Element;
      
      if (currentElement && targetElement) {
        // Smooth exit for current slide
        gsap.to(currentElement, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            // Smooth entrance for target slide
            gsap.fromTo(targetElement, 
              {
                opacity: 0,
                y: 50,
                scale: 0.95,
                filter: "blur(10px)",
                rotationX: 5
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out",
                onComplete: () => {
                  isTransitioning = false;
                }
              }
            );
          }
        });
        
        currentSlide = targetSlide;
      }
    };
    
    // Create scroll-triggered auto-advance
    heroSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section as Element,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          if (index !== currentSlide) {
            transitionToSlide(index);
          }
        },
        onLeave: () => {
          // Smooth fade out when leaving
          gsap.to(section as Element, {
            opacity: 0.3,
            y: -30,
            scale: 0.98,
            duration: 0.6,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          // Smooth re-entry
          gsap.to(section as Element, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      });
    });

    // Add scroll wheel event for smooth auto-advance with luxury feel
    let scrollTimeout: NodeJS.Timeout;
    let scrollAccumulator = 0;
    const scrollThreshold = 50; // Minimum scroll distance to trigger transition
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isTransitioning) return;
      
      scrollAccumulator += e.deltaY;
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set timeout to reset accumulator
      scrollTimeout = setTimeout(() => {
        scrollAccumulator = 0;
      }, 150);
      
      // Check if accumulated scroll exceeds threshold
      if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        if (scrollAccumulator > 0 && currentSlide < heroSections.length - 1) {
          // Scroll down - go to next slide
          transitionToSlide(currentSlide + 1);
          scrollAccumulator = 0;
        } else if (scrollAccumulator < 0 && currentSlide > 0) {
          // Scroll up - go to previous slide
          transitionToSlide(currentSlide - 1);
          scrollAccumulator = 0;
        }
      }
    };

    // Add wheel event listener with smooth scrolling
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };

    // Initialize scroll animations
    createScrollAnimations();

  }, []);

  const heroSections = [
    {
      image: "/assets/images/1.png",
      title: (
        <>
          The World&apos;s First <span className="font-bold">British-Islamic</span> Luxury <span className="italic">Abaya</span> <span className="font-light">Maison</span>®
        </>
      ),
      subtitle:
        "A collection that transcends time, a legacy woven in every thread.",
      ctaText: "EXPLORE ALL PRODUCTS",
      textPosition: "right" as const,
      darkText: true,
      showButton: true,
    },
    {
      image: "/assets/images/2.webp",
      title: (
        <>
          A <span className="font-light">pause</span>, a <span className="font-medium">breath</span>, a <span className="font-bold">connection</span> with what is <span className="italic">sacred</span>.
        </>
      ),
      subtitle:
        "Where every moment is an opportunity to embrace the divine beauty within. Our collection speaks to the soul, offering garments that honor tradition while celebrating the modern woman's journey.",
      textPosition: "left" as const,
      darkText: false,
      showButton: false,
    },
    {
      image: "/assets/images/3_edited.png",
      title: (
        <>
          Not just a <span className="font-light">brand</span>. A <span className="font-bold">House</span>. A <span className="italic font-medium">presence</span>.
        </>
      ),
      subtitle:
        "Where every stitch tells a story, and every garment holds a soul.",
      textPosition: "right" as const,
      darkText: false,
      showButton: false,
    },
  ];

  return (
    <>
      <style jsx global>{`
        .hero-section-container {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-section {
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-content {
          transition: all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Luxury fade transitions */
        .luxury-fade-enter {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          filter: blur(10px);
        }
        
        .luxury-fade-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
          transition: all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .luxury-fade-exit {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }
        
        .luxury-fade-exit-active {
          opacity: 0;
          transform: translateY(-50px) scale(0.95);
          filter: blur(10px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
      <div className="min-h-screen overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
        <PerformanceMonitor />
        <Header />
        <div className="relative">
          {/* Vertical Hero Sections with smooth transitions */}
          {heroSections.map((section, index) => (
            <div key={index} className="w-full h-screen hero-section-container">
              <HeroSection
                image={section.image}
                title={section.title}
                subtitle={section.subtitle}
                ctaText={section.ctaText}
                textPosition={section.textPosition}
                index={index}
                darkText={section.darkText}
                showButton={section.showButton}
              />
            </div>
          ))}

        <div className="relative z-10">
          {/* <CircularAnimationSection /> */}
          <MaisonRareOffering />

          <SimplicitySection />
          <GlobalBrandSection />
          <PureQuietSection />

          {/* <section className="py-12 bg-white relative z-20">
            <div className="max-w-6xl mx-auto px-8">
              <div className="flex justify-center items-center space-x-12 opacity-60">
                {[
                  "WOMEN'S",
                  "NYW",
                  "BUSINESS INSIDER",
                  "islam",
                  "Retail Times",
                ].map((logo, index) => (
                  <div key={index} className="text-gray-400 font-light text-lg">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          <ScrollingPromotionSection />

          <NewsletterSection />

          {/* <footer className="py-8 bg-white border-t border-gray-200 relative z-10">
            <div className="max-w-6xl mx-auto px-8">
              <div className="flex justify-between items-center">
                <div className="text-gray-600 font-light">© 2023 SELAVYA</div>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer> */}
        </div>
      </div>
    </div>
    </>
  );
}
