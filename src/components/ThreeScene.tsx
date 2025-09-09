"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  Box, 
  Text3D, 
  Center, 
  Float, 
  Environment, 
  Lightformer,
  useTexture,
  PerspectiveCamera,
  OrbitControls,
  Stars,
  Cloud,
  Sparkles
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Floating particles component
function FloatingParticles({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      temp.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      temp.scale.setScalar(s);
      temp.rotation.set(s * 5, s * 5, s * 5);
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#d4af37" />
    </instancedMesh>
  );
}

// Animated text component
function AnimatedText({ children, position = [0, 0, 0] }: { children: string; position?: [number, number, number] }) {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Center>
        <Text3D
          ref={textRef}
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={position}
        >
          {children}
          <meshStandardMaterial color="#d4af37" />
        </Text3D>
      </Center>
    </Float>
  );
}

// Morphing geometry component
function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry1, geometry2] = useMemo(() => [
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.BoxGeometry(1.5, 1.5, 1.5)
  ], []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = Math.sin(time) * 0.5;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.material, {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry1}>
        <meshStandardMaterial 
          color="#d4af37" 
          transparent 
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Interactive sphere that follows mouse
function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = mouse.x * viewport.width / 2;
      meshRef.current.position.y = mouse.y * viewport.height / 2;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#d4af37" 
        transparent 
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// Main Three.js Scene
export function ThreeScene({ type = "hero" }: { type?: "hero" | "background" | "interactive" }) {
  const sceneRef = useRef<THREE.Scene>(null);
  const [hasError, setHasError] = useState(false);

  const renderScene = () => {
    if (hasError) {
      return null; // Graceful fallback
    }

    switch (type) {
      case "hero":
        return (
          <>
            <Environment preset="sunset" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <FloatingParticles count={200} />
            <MorphingGeometry />
            <AnimatedText position={[0, 2, 0]}>SELHAYA</AnimatedText>
            <Sparkles count={100} scale={10} size={6} speed={0.4} />
          </>
        );
      case "background":
        return (
          <>
            {/* Very subtle background effects that don't interfere with design */}
            <FloatingParticles count={20} />
            <Cloud position={[0, 10, 0]} speed={0.2} opacity={0.1} />
          </>
        );
      case "interactive":
        return (
          <>
            <Environment preset="studio" />
            <InteractiveSphere />
            <FloatingParticles count={100} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onError={() => setHasError(true)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        
        {/* Scene content */}
        {renderScene()}
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.001, 0.001]}
          />
        </EffectComposer>
        
        {type === "interactive" && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
}
