"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Animated geometric scene — rotating icosahedron + distorted sphere + orbital rings.
 * Designed to be cheap (single mesh + light, no shadows).
 *
 * Loaded with `dynamic(() => import('./HeroScene'), { ssr: false })`.
 * Respects `prefers-reduced-motion` via the parent Hero component.
 */

type GroupProps = {
  reduced: boolean;
};

function SpinningIcosahedron({ reduced }: GroupProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
  });
  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.6}
      floatIntensity={reduced ? 0 : 0.6}
    >
      <mesh ref={meshRef} scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0066FF"
          roughness={0.25}
          metalness={0.6}
          emissive="#003D99"
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

function DistortedSphere({ reduced }: GroupProps) {
  return (
    <Float
      speed={reduced ? 0 : 1.5}
      rotationIntensity={reduced ? 0 : 0.4}
      floatIntensity={reduced ? 0 : 0.8}
    >
      <mesh position={[2.2, -0.8, -1.5]} scale={0.9}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00F5FF"
          roughness={0.4}
          metalness={0.2}
          distort={reduced ? 0 : 0.45}
          speed={reduced ? 0 : 1.8}
          emissive="#00C4CC"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.1;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2.5, 0.015, 16, 200]} />
      <meshStandardMaterial
        color="#6A0DAD"
        emissive="#6A0DAD"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.4}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function ParticleField({ count = 250 }: { count?: number }) {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute within a sphere of radius 6.
      const r = Math.cbrt(Math.random()) * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = React.useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00F5FF"
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    // Subtle parallax based on cursor / time.
    const t = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(t) * 0.3;
    camera.position.y = Math.cos(t * 0.8) * 0.15;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      frameloop={reducedMotion ? "demand" : "always"}
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.1} color="#00F5FF" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#6A0DAD" />
      <SpinningIcosahedron reduced={reducedMotion} />
      <DistortedSphere reduced={reducedMotion} />
      <OrbitalRing />
      <ParticleField />
      <CameraRig />
    </Canvas>
  );
}