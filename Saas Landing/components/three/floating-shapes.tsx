"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Icosahedron, Octahedron, Torus, Box, Sphere, Ring } from "@react-three/drei"
import type * as THREE from "three"

function MorphingSphere({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.5 * scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

function GlowingRing({ position, rotation = [0, 0, 0], size = 1, color = "#8b5cf6" }: { 
  position: [number, number, number]
  rotation?: [number, number, number]
  size?: number
  color?: string
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Ring ref={ringRef} args={[size * 0.8, size, 64]} position={position} rotation={rotation}>
      <meshBasicMaterial color={color} transparent opacity={0.4} side={2} />
    </Ring>
  )
}

function FloatingIcosahedron({ position, color, speed = 1, distort = 0.4, scale = 1 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[0.6 * scale, 1]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Icosahedron>
    </Float>
  )
}

function FloatingOctahedron({ position, color, speed = 1, scale = 1 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.25 * speed
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Octahedron ref={meshRef} args={[0.5 * scale]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </Octahedron>
    </Float>
  )
}

function FloatingTorus({ position, color, speed = 1, scale = 1 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
      <Torus ref={meshRef} args={[0.4 * scale, 0.15 * scale, 16, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={3}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.5}
        />
      </Torus>
    </Float>
  )
}

function FloatingCube({ position, color, speed = 1, scale = 1 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35 * speed
    }
  })

  return (
    <Float speed={2.2} rotationIntensity={0.9} floatIntensity={2}>
      <Box ref={meshRef} args={[0.4 * scale, 0.4 * scale, 0.4 * scale]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </Box>
    </Float>
  )
}

function Particles({ count = 100 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a855f7" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ec4899" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#8b5cf6" />
      
      {/* Morphing spheres */}
      <MorphingSphere position={[-3, 1.5, -2]} scale={1.2} />
      <MorphingSphere position={[4, -0.5, -3]} scale={0.8} />
      
      {/* Glowing rings */}
      <GlowingRing position={[-2, 0, -4]} rotation={[Math.PI / 3, 0, 0]} size={2} color="#8b5cf6" />
      <GlowingRing position={[3, 1, -5]} rotation={[0, Math.PI / 4, Math.PI / 6]} size={1.5} color="#3b82f6" />
      
      {/* Geometric shapes - smaller and distributed */}
      <FloatingIcosahedron position={[-5, 2, -4]} color="#a855f7" speed={0.8} distort={0.5} scale={0.8} />
      <FloatingIcosahedron position={[5, -1, -5]} color="#6366f1" speed={1.2} distort={0.3} scale={0.6} />
      <FloatingOctahedron position={[4, 3, -6]} color="#3b82f6" speed={1} scale={0.8} />
      <FloatingOctahedron position={[-4, -2, -5]} color="#8b5cf6" speed={0.7} scale={0.6} />
      <FloatingTorus position={[0, 3, -7]} color="#a855f7" speed={0.9} scale={0.7} />
      <FloatingTorus position={[-6, 0, -6]} color="#6366f1" speed={1.1} scale={0.5} />
      <FloatingCube position={[6, 1, -4]} color="#3b82f6" speed={0.6} scale={0.6} />
      <FloatingCube position={[-3, -3, -5]} color="#8b5cf6" speed={1.3} scale={0.5} />
      
      {/* Additional accent shapes */}
      <FloatingIcosahedron position={[7, -2, -7]} color="#ec4899" speed={1.5} distort={0.2} scale={0.4} />
      <FloatingOctahedron position={[-7, 1, -6]} color="#06b6d4" speed={0.5} scale={0.5} />
      
      {/* Particles */}
      <Particles count={150} />
    </>
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
