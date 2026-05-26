"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, shaderMaterial, Ring } from "@react-three/drei"
import * as THREE from "three"
import { extend } from "@react-three/fiber"

// Custom shader for a more dynamic, smaller globe
const GlobeMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#a855f7"),
    uColor2: new THREE.Color("#3b82f6"),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Create latitude and longitude grid
      float lat = abs(vPosition.y);
      float lon = atan(vPosition.z, vPosition.x);
      
      // Grid lines - thinner and more elegant
      float latLine = smoothstep(0.015, 0.0, abs(fract(lat * 10.0) - 0.5) - 0.47);
      float lonLine = smoothstep(0.015, 0.0, abs(fract(lon * 5.0 / 3.14159) - 0.5) - 0.47);
      float grid = max(latLine, lonLine);
      
      // Animated pulse
      float pulse = sin(vUv.y * 30.0 - uTime * 3.0) * 0.5 + 0.5;
      
      // Mix colors based on position and time
      vec3 color = mix(uColor1, uColor2, vUv.y + sin(uTime * 0.5) * 0.3);
      
      // Fresnel effect for edge glow - stronger
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      
      // Scanline effect
      float scanline = sin(vPosition.y * 50.0 + uTime * 2.0) * 0.1 + 0.9;
      
      // Final color with grid, glow, and scanlines
      vec3 finalColor = color * (grid * 0.9 + 0.1) * scanline + fresnel * color * 0.8;
      float alpha = grid * 0.7 + fresnel * 0.5 + 0.1;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
)

extend({ GlobeMaterial })

// Declare the JSX intrinsic element
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      globeMaterial: React.DetailedHTMLProps<React.HTMLAttributes<THREE.ShaderMaterial>, THREE.ShaderMaterial> & {
        uTime?: number
        uColor1?: THREE.Color
        uColor2?: THREE.Color
        transparent?: boolean
        side?: THREE.Side
        depthWrite?: boolean
      }
    }
  }
}

function AnimatedGlobe({ size = 1 }: { size?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const globeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group>
      {/* Main globe - smaller */}
      <Sphere ref={globeRef} args={[size, 64, 64]}>
        <globeMaterial
          ref={materialRef}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Orbital rings */}
      <OrbitalRing radius={size * 1.3} rotationX={Math.PI / 2} rotationY={0} color="#a855f7" />
      <OrbitalRing radius={size * 1.5} rotationX={Math.PI / 3} rotationY={Math.PI / 4} color="#6366f1" />
      <OrbitalRing radius={size * 1.7} rotationX={Math.PI / 4} rotationY={Math.PI / 2} color="#3b82f6" />
      
      {/* Glowing particles */}
      <GlobeParticles size={size} />
      
      {/* Connection dots */}
      <ConnectionDots size={size} />
    </group>
  )
}

function OrbitalRing({ radius, rotationX, rotationY, color }: {
  radius: number
  rotationX: number
  rotationY: number
  color: string
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Ring ref={ringRef} args={[radius - 0.01, radius, 128]} rotation={[rotationX, rotationY, 0]}>
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </Ring>
  )
}

function GlobeParticles({ size }: { size: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = size * 1.1 + Math.random() * size * 0.8
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [size])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03
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
      <pointsMaterial size={0.02} color="#a855f7" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function ConnectionDots({ size }: { size: number }) {
  const dotsRef = useRef<THREE.Group>(null)
  
  const dotPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const count = 8
    
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const phi = Math.PI / 2 + (Math.random() - 0.5) * 0.5
      
      positions.push([
        size * Math.sin(phi) * Math.cos(theta),
        size * Math.cos(phi),
        size * Math.sin(phi) * Math.sin(theta)
      ])
    }
    
    return positions
  }, [size])

  useFrame((state) => {
    if (dotsRef.current) {
      dotsRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={dotsRef}>
      {dotPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      ))}
    </group>
  )
}

export function Globe3D({ className = "", size = 1.2 }: { className?: string, size?: number }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
        <AnimatedGlobe size={size} />
      </Canvas>
    </div>
  )
}

// Smaller inline globe for hero section
export function MiniGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-3, -3, -3]} intensity={0.4} color="#3b82f6" />
        <AnimatedGlobe size={0.9} />
      </Canvas>
    </div>
  )
}
