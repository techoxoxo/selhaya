"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  User,
  ShoppingBag,
} from "lucide-react";
// import "./scrollingPromotion.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Header Component
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/logo/logo.png"
            alt="Logo"
            width={120}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-light">
          <a
            href="#"
            className="uppercase hover:text-gray-800 transition-colors"
          >
            HOME
          </a>
          <a
            href="#"
            className="uppercase hover:text-gray-800 transition-colors"
          >
            THE YAKEEN
          </a>
          <a
            href="#"
            className="uppercase hover:text-gray-800 transition-colors"
          >
            WAVES OF LIGHT
          </a>
          <a
            href="#"
            className="uppercase hover:text-gray-800 transition-colors"
          >
            AL-HAYAH ROBES
          </a>
          <a
            href="#"
            className="uppercase hover:text-gray-800 transition-colors"
          >
            THE MAISON
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center">
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
  title: string;
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
      gsap.fromTo(
        sectionRef.current.querySelector(".hero-content"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [textPosition, index]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden hero-section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
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
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl leading-snug font-normal mb-6">
            {title}
          </h1>
          <p
            className={`font-['Inter'] text-lg md:text-xl font-light leading-relaxed ${
              darkText ? "text-gray-800" : "text-white/95"
            }`}
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

  return (
    <section className="relative bg-white py-20">
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
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 leading-tight mb-4">
            The Maison&apos;s Rare Offering – Sacred. Sealed.{" "}
            <span className="italic underline decoration-2 underline-offset-4">
              Remembered.
            </span>
          </h2>
          <p className="text-gray-600 text-base leading-7">
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
            />

            {/* 7 o'clock (lower-left) */}
            <SpecCard
              left={-40}
              top={360}
              title="Inner Dress"
              img="/assets/images/4.png"
              copy="Pure blush silk, with half-sleeves and discreet neckline — with subtle shimmer"
            />

            {/* 3 o'clock (right) */}
            <SpecCard
              left={460}
              top={150}
              title="Chiffon Hijab"
              img="/assets/images/6.png"
              copy="Soft silk chiffon drape, with embroidered edging"
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
}: {
  left: number;
  top: number;
  title: string;
  img: string;
  copy: string;
}) {
  return (
    <div
      className="absolute w-[160px] rounded-xl bg-white border border-gray-200 shadow-[0_14px_30px_rgba(15,23,42,0.06)] p-5 z-20 flex flex-col items-center"
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
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      {/* main image */}
      <Image src={src} alt={title} fill className="object-cover" />

      {/* top slim label (always visible) */}
      <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] tracking-wide text-gray-800 shadow-sm">
        RINA LEMON · A RObE FOR JOY
      </div>

      {/* top-right shopping bag */}
      <button className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 shadow-md grid place-items-center hover:bg-white">
        <ShoppingBag className="h-4 w-4 text-gray-700" />
      </button>

      {/* bottom foggy fade info (only for 1st card in pair) */}
      {showInfo && (
        <div className="absolute inset-x-0 bottom-0">
          {/* foggy gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />

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

const Heading = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <h3 className="text-[36px] leading-none font-semibold text-black">Pure</h3>
    <div className="-mt-1">
      <span className="text-[36px] italic font-serif leading-none">
        Brilliance
      </span>
    </div>
  </div>
);

const ArrowCircle = ({ className = "" }: { className?: string }) => (
  <button
    aria-label="Next"
    className={`h-12 w-12 rounded-full bg-stone-200/70 hover:bg-stone-300 transition-colors grid place-items-center shadow-sm ${className}`}
  >
    <ArrowRight className="h-5 w-5" />
  </button>
);

const SimplicitySection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-2 lg:px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left large image */}
          <div className="relative h-[520px] lg:h-[560px] rounded-lg overflow-hidden">
            <Image
              src="/assets/images/pure-left.webp"
              alt="Model with horse"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: heading + cards */}
          <div className="relative">
            <div className="flex items-start justify-between">
              <Heading />
              <ArrowCircle />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <ProductCard src="/assets/images/7.png" showInfo />
              <ProductCard src="/assets/images/8.png" showInfo={false} />
            </div>

            <p className="mt-4 text-[13px] text-gray-700">
              Step into stillness. Carry it with you. Wear it with grace.
            </p>
          </div>

          {/* Bottom-left */}
          <div className="relative">
            <div className="flex items-start justify-between">
              <Heading />
              <ArrowCircle />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <ProductCard src="/assets/images/9.png" showInfo />
              <ProductCard src="/assets/images/10.png" showInfo={false} />
            </div>

            <p className="mt-4 text-[13px] text-gray-700">
              Every piece tells a story of devotion, dignity, and design.
            </p>
          </div>

          {/* Bottom-right large image */}
          <div className="relative h-[520px] lg:h-[560px] rounded-lg overflow-hidden">
            <Image
              src="/assets/images/horse-side.png"
              alt="Model with horse"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalBrandSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-8">
        {/* Headline */}
        <h2 className="text-center text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
          LONDON BORN, <span className="italic font-normal">Abu Dhabi</span>{" "}
          <span className="italic font-light">inspired,</span> WORN
          <br />
          <span className="block mt-2 text-6xl md:text-7xl font-extrabold">
            WORLDWIDE.
          </span>
        </h2>

        {/* See All Button */}
        <div className="absolute right-12 top-20 flex flex-col items-center text-gray-500 text-xs tracking-wide">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <span className="mt-2">SEE ALL</span>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          {/* Left Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-md">
              <Image
                src="/assets/images/hand.png" // replace with your actual image path
                alt="Hands with sun"
                width={600}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                YAQEEN THE MAISON&apos;S RARE OFFERING
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Yaqeen is a unique three–piece set in The Maison Collector
                Series — a rare abaya crafted from sketch to stitch in 100% pure
                silk for only 9 women in the world.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                THE HOUSE THAT QUIETLY GIVES
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
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
  return (
    <section className="bg-[#2a2a2a] text-white py-20 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Large Card */}
        <div className="bg-white text-black rounded-md overflow-hidden shadow-lg">
          <Image
            src="/assets/images/left-1.webp"
            alt="Wrapped in Meaning"
            width={600}
            height={500}
            className="w-full h-[350px] object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-medium mb-3">
              Wrapped in Meaning: Gifting as Ritual at Selhaya
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Introduction In the House of Selhaya, packaging is not an
              afterthought. It is an offering. A quiet gesture of reverence. A
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">June 9, 2025</span>
              <a href="#" className="text-gray-700 hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 flex flex-col justify-between items-center">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-3xl font-light italic">
              Press{" "}
              <span className="not-italic font-semibold">& Quiet Praise</span>
            </h2>
            <p className="text-sm text-gray-300 mt-3 max-w-2xl">
              A curated space for every mention, every whisper, every headline.
              As Selhaya finds its way into hearts and homes, these features
              tell our story through other eyes.
            </p>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white text-black rounded-md overflow-hidden shadow-lg">
              <Image
                src="/assets/images/right-1.webp"
                alt="The Maison Registry"
                width={400}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3">
                  The Maison Registry: Designed to Remember You
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">June 2, 2025</span>
                  <a href="#" className="text-gray-700 hover:underline">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black rounded-md overflow-hidden shadow-lg">
              <Image
                src="/assets/images/right-2.jpg"
                alt="Crafted in Rarity"
                width={400}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3">
                  Crafted in Rarity: Why Selhaya Does Not Mass Produce
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">May 26, 2025</span>
                  <a href="#" className="text-gray-700 hover:underline">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* See All Button */}
          <div className="flex justify-center lg:justify-end mt-10">
            <a
              href="#"
              className="flex items-center text-sm text-gray-300 hover:text-white transition"
            >
              <span className="mr-3">SEE ALL</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400">
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
  return (
    <section className="bg-white">
      <div className="relative w-full">
        {/* Two Side-by-Side Images */}
        <div className="grid grid-cols-2 gap-3 w-full justify-around">
          <div className="relative h-[550px] w-full p-2">
            <Image
              src="/assets/images/pure-left.webp" // replace with actual image path
              alt="Close up woman with horse"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative h-[550px] w-full p-2">
            <Image
              src="/assets/images/horse-side.png" // replace with actual image path
              alt="Woman with horse portrait"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Newsletter Overlay positioned midway over second image */}
        <div className="absolute top-6/7 right-29 -translate-y-1/2 z-20">
          <div className="w-[520px] bg-neutral-900 text-white rounded-2xl shadow-2xl p-10 text-center">
            <h2 className="text-3xl font-serif mb-4 leading-tight">
              Let The <em className="italic font-normal">house</em>
              <br />
              remember You
            </h2>

            <p className="text-gray-300 text-xs leading-relaxed mb-8">
              Be quietly invited to capsule previews, sacred unveilings, and private offerings.
              <br /> Your name becomes part of the registry. The house remembers.
            </p>

            {/* Email Input */}
            <div className="space-y-4 flex flex-col items-center">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-[80%] px-4 py-4 bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 rounded-full focus:bg-white/15 focus:border-white/30 focus:outline-none transition-all duration-300"
              />

              <button
                type="button"
                className=" flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 py-4 px-4 rounded-full text-sm font-semibold tracking-widest transition-colors duration-300"
              >
                <ArrowRight
                  size={20}
                  className="w-4 h-4"
                />
              </button>
                <span className="text-sm font-light text-gray-300">SUBSCRIBE</span>
            </div>

            {/* Fine Print */}
            <p className="text-xs text-gray-400 mt-6">
              No Spam, only quality articles to help you be more mindful. You can opt out anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-8xl mx-auto px-6 py-16">
      <div className="w-full flex justify-start">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600 max-w-3xl">
    <div className="w-2/3">
      <h4 className="font-xs mb-3">EXPLORE</h4>
      <ul className="space-y-1">
        <li>Registry</li>
        <li>Returns Policy</li>
        <li>Privacy Policy</li>
        <li>Terms Of Service</li>
        <li>Shipping Policy</li>
      </ul>
    </div>
    <div className="w-2/3">
      <h4 className="font-semibold mb-3">EXPLORE</h4>
      <ul className="space-y-1">
        <li>The Founder & The House</li>
        <li>The House Journal</li>
        <li>The Quiet Offering</li>
        <li>Speak With</li>
        <li>The House Press</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-3">THE HOUSE CONCIERGE</h4>
      <p>
        For discreet gifting enquiries, thoughtful gestures or kind words to The House:
        <br /> concierge@selhaya.com
      </p>
      <p className="mt-2">
        Correspondence Only: 6 South Molton Street, Mayfair, London, W1K 5QF
      </p>
    </div>
  </div>
</div>


        {/* Bottom Logo & Icons */}
        <div className="mt-12 border-t pt-8 text-xs text-gray-500">
  {/* Top row */}
    {/* Left side: Logo + Socials */}
    <div className="mb-2">

      <Image src="/assets/logo/logo.png" alt="Selhaya Logo" width={80} height={40}  />
    </div>
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="flex items-center gap-3">
      <a href="#" aria-label="Instagram">
        <Image src="/assets/icon/instagram.png" alt="Instagram" width={20} height={20} />
      </a>
      <a href="#" aria-label="YouTube">
        <Image src="/assets/icon/youtube.png" alt="YouTube" width={20} height={20} />
      </a>
    </div>

    {/* Right side: Payment icons */}
    <div className="flex gap-4 mt-4 md:mt-0">
      <Image src="/assets/icon/paypal.png" alt="PayPal" width={40} height={24} />
      <Image src="/assets/icon/amex.png" alt="Amex" width={40} height={24} />
      <Image src="/assets/icon/visa.png" alt="Visa" width={40} height={24} />
      <Image src="/assets/icon/mastercard.png" alt="Mastercard" width={40} height={24} />
    </div>
  </div>

  {/* Bottom text */}
  <p className="mt-4 text-left max-w-3xl">
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
  
    return (
      <section className="py-12 bg-white overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
            {/* First row */}
            <div className="flex flex-nowrap min-w-full">
              {logos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 mx-10 md:mx-[70px] flex items-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate row */}
            <div className="flex flex-nowrap min-w-full">
              {logos.map((logo, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 mx-10 md:mx-[70px] flex items-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  

// Main Homepage Component
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = containerRef.current?.querySelectorAll(".hero-section");
    if (sections && sections.length > 0) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () =>
            `+=${
              (containerRef.current?.offsetWidth || window.innerWidth) *
              (sections.length - 1)
            }`,
          invalidateOnRefresh: true,
        },
      });
    }
  }, []);

  const heroSections = [
    {
      image: "/assets/images/1.png",
      title: "Not just attire, but a silhouette of strength & elegance.",
      subtitle:
        "A collection that transcends time, a legacy woven in every thread.",
      ctaText: "EXPLORE ALL PRODUCTS",
      textPosition: "right" as const,
      darkText: true,
      showButton: true,
    },
    {
      image: "/assets/images/2.webp",
      title: "A pause, a breath, a connection with what is sacred.",
      subtitle:
        "Where every moment is an opportunity to embrace the divine beauty within. Our collection speaks to the soul, offering garments that honor tradition while celebrating the modern woman's journey.",
      textPosition: "left" as const,
      darkText: false,
      showButton: false,
    },
    {
      image: "/assets/images/3_edited.png",
      title: "Not just a brand. A House. A presence.",
      subtitle:
        "Where every stitch tells a story, and every garment holds a soul.",
      textPosition: "right" as const,
      darkText: false,
      showButton: false,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="relative">
        <div ref={containerRef} className="w-[300vw] flex min-h-screen">
          {heroSections.map((section, index) => (
            <div key={index} className="w-screen h-screen flex-shrink-0">
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
        </div>

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
  );
}
