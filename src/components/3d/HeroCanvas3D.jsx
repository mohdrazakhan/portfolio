import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroCanvas3D({ className = "" }) {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3, 50); // Indigo
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2.5, 50); // Violet
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 2, 50); // Cyan
    pointLight3.position.set(0, 4, -4);
    scene.add(pointLight3);

    // 3D OBJECTS GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Geodesic Core (Icosahedron Wireframe + Translucent Shell)
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      wireframe: true,
      emissive: 0x312e81,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    mainGroup.add(icoMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Orbiting Torus Rings
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.65,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 3. Floating Orbital Tech Satellites
    const satellites = [];
    const satCount = 4;
    const satColors = [0x60a5fa, 0x34d399, 0xf472b6, 0xfbbf24];
    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.18);
      const satMat = new THREE.MeshStandardMaterial({
        color: satColors[i],
        emissive: satColors[i],
        emissiveIntensity: 0.6,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push({
        mesh: sat,
        radius: 2.5 + i * 0.45,
        speed: 0.015 + i * 0.006,
        angle: (i * Math.PI * 2) / satCount,
        tiltX: (Math.random() - 0.5) * 1.5,
        tiltY: (Math.random() - 0.5) * 1.5,
      });
      scene.add(sat);
    }

    // 4. Starlight Particle Field
    const particleCount = 400;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const pColors = [
      new THREE.Color(0x818cf8),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x38bdf8),
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Sphere distribution around center
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 5.5 + 2.0;

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);

      const chosenColor = pColors[Math.floor(Math.random() * pColors.length)];
      colorArray[i] = chosenColor.r;
      colorArray[i + 1] = chosenColor.g;
      colorArray[i + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // MOUSE PARALLAX TRACKING
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let pulseSpeed = 1;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.8;
      targetRotX = -y * 0.8;
    };

    const handlePointerDown = () => {
      pulseSpeed = 3.5;
      setIsInteracting(true);
    };

    const handlePointerUp = () => {
      setIsInteracting(false);
    };

    window.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 300;
      const newH = container.clientHeight || 300;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // INTERSECTION OBSERVER TO PAUSE WHEN NOT VISIBLE
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // ANIMATION LOOP
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera/object damping
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      mainGroup.rotation.x = currentRotX + elapsed * 0.15;
      mainGroup.rotation.y = currentRotY + elapsed * 0.25;

      // Inner core counter-rotates
      innerMesh.rotation.x -= 0.01;
      innerMesh.rotation.y -= 0.015;

      // Rings spin along unique axes
      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.009;

      // Satellites orbiting
      satellites.forEach((sat) => {
        sat.angle += sat.speed * (pulseSpeed > 1 ? 2 : 1);
        sat.mesh.position.x =
          Math.cos(sat.angle) * sat.radius * Math.cos(sat.tiltX);
        sat.mesh.position.y =
          Math.sin(sat.angle) * sat.radius * Math.sin(sat.tiltY);
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius * 0.7;
        sat.mesh.rotation.x += 0.03;
        sat.mesh.rotation.y += 0.02;
      });

      // Particle background subtle rotation
      particleSystem.rotation.y = elapsed * 0.03;
      particleSystem.rotation.x = elapsed * 0.015;

      // Damping pulse speed back to normal
      if (pulseSpeed > 1) {
        pulseSpeed = Math.max(1, pulseSpeed - delta * 2.5);
      }

      // Breathing scale effect
      const breathe = 1 + Math.sin(elapsed * 2) * 0.03;
      icoMesh.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Ambient Radial Glow Backlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-30 dark:opacity-40 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 45%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* Interactive Helper Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide bg-zinc-900/80 dark:bg-zinc-900/90 backdrop-blur-xl text-zinc-200 border border-indigo-500/40 shadow-xl pointer-events-none opacity-85 hover:opacity-100 transition whitespace-nowrap z-20 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D Interactive Core • Drag & Move</span>
      </div>
    </div>
  );
}
