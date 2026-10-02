"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, Compass, Layers, RotateCcw, ZoomIn, Info, ShieldCheck, Play, Pause } from "lucide-react";

type CameraPreset = "overview" | "exploded" | "tourbillon" | "geartrain";

interface WatchLayer {
  id: string;
  name: string;
  mesh: THREE.Object3D;
  baseZ: number;
  explodeZ: number;
  rotSpeed?: number;
  rotAxis?: "x" | "y" | "z";
}

export default function CinematicMechanism3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<CameraPreset>("overview");
  const [explodeSlider, setExplodeSlider] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedPartId, setSelectedPartId] = useState<string>("tourbillon");

  // State refs for animation loop
  const layersRef = useRef<WatchLayer[]>([]);
  const targetExplodeRef = useRef<number>(0);
  const currentExplodeRef = useRef<number>(0);
  const balanceWheelRef = useRef<THREE.Group | null>(null);
  const masterWatchGroupRef = useRef<THREE.Group | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 7.2));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const partsInfo: Record<string, { name: string; category: string; description: string; metallurgy: string; tolerance: string }> = {
    case: {
      name: "Grade 5 Titanium Bezel & Outer Case",
      category: "Exterior Architecture",
      description: "Machined from a single block of aerospace Ti-6Al-4V alloy with mirror-polished bevels and 6 recessed hexagonal titanium screws.",
      metallurgy: "Ti-6Al-4V Aerospace Titanium",
      tolerance: "± 0.002 mm Precision CNC",
    },
    crystal: {
      name: "Double-Domed Sapphire Crystal",
      category: "Optical Protection",
      description: "Synthetic corundum crystal with 9 Mohs hardness and 7-layer anti-reflective coating on both interior and exterior surfaces.",
      metallurgy: "Monocrystalline Al₂O₃",
      tolerance: "9 Mohs Scratch Proof",
    },
    dial: {
      name: "Openworked Skeleton Chapter Ring",
      category: "Dial & Chronometry",
      description: "Laser-perforated indices filled with Swiss Super-LumiNova BGW9 emitting vivid cyan luminescence in low-light environments.",
      metallurgy: "Satin Anthracite Brass & Lume",
      tolerance: "Geneva Hallmark Standard",
    },
    bridges: {
      name: "Hand-Chamfered Openwork Titanium Bridges",
      category: "Structural Support",
      description: "Curved skeletal bridges that hold the gear train in place with 34 sharp interior angles polished by hand using gentian wood pegs.",
      metallurgy: "Grade 5 Titanium & Ruby Bearings",
      tolerance: "82 Hours Hand Anglage",
    },
    geartrain: {
      name: "High-Torque Differential Gear Train",
      category: "Kinetic Transmission",
      description: "Cycloidal profile gear teeth transferring kinetic energy from twin barrels to the tourbillon with minimum friction coefficient.",
      metallurgy: "24K Gold-Plated CuBe Alloy",
      tolerance: "0.005 mm Mesh Clearance",
    },
    tourbillon: {
      name: "60-Second Flying Tourbillon Assembly",
      category: "Gravitational Escapement",
      description: "Ultralight titanium carriage weighing only 0.28g rotating once every 60 seconds with an adjusted Glucydur balance wheel and 4 gold micro-screws.",
      metallurgy: "Titanium, 18K Solid Gold & Nivarox",
      tolerance: "28,800 VPH (4.00 Hz) / -1/+2 sec/24h",
    },
    mainplate: {
      name: "Solid Mainplate & Exhibition Caseback",
      category: "Calibre Baseplate",
      description: "Rigid foundation with circular perlage graining, blued steel screws, and sapphire exhibition window showcasing manufacture hallmarks.",
      metallurgy: "Anthracite Coated German Silver",
      tolerance: "50m Water Resistance Sealed",
    },
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const goldLight = new THREE.DirectionalLight(0xd4af37, 3.2);
    goldLight.position.set(-6, -5, 5);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.5, 20);
    rimLight.position.set(0, 4, 4);
    scene.add(rimLight);

    // 5. Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.22,
    });

    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe0a96d,
      metalness: 0.9,
      roughness: 0.24,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x888e99,
      metalness: 0.88,
      roughness: 0.3,
    });

    const titaniumDarkMat = new THREE.MeshStandardMaterial({
      color: 0x374151,
      metalness: 0.85,
      roughness: 0.35,
    });

    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x15161e,
      metalness: 0.7,
      roughness: 0.45,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.2,
    });

    const rubyMat = new THREE.MeshPhysicalMaterial({
      color: 0xd90429,
      transmission: 0.65,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
    });

    const bluedMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.95,
      roughness: 0.2,
    });

    // Helper: Gear Builder
    const buildGear = (teeth: number, radius: number, thickness: number, spokes: number, mat = goldMat) => {
      const group = new THREE.Group();
      const toothAngle = (Math.PI * 2) / teeth;

      // Outer rim teeth
      for (let i = 0; i < teeth; i++) {
        const ang = i * toothAngle;
        const toothG = new THREE.BoxGeometry(radius * 0.1, radius * 0.18, thickness);
        const toothM = new THREE.Mesh(toothG, mat);
        toothM.position.set(Math.cos(ang) * (radius + radius * 0.05), Math.sin(ang) * (radius + radius * 0.05), 0);
        toothM.rotation.z = ang;
        group.add(toothM);
      }

      // Outer Ring
      const ringG = new THREE.TorusGeometry(radius, radius * 0.07, 16, 40);
      const ringM = new THREE.Mesh(ringG, mat);
      group.add(ringM);

      // Hub & Ruby
      const hubG = new THREE.CylinderGeometry(radius * 0.25, radius * 0.25, thickness, 20);
      hubG.rotateX(Math.PI / 2);
      const hubM = new THREE.Mesh(hubG, mat);
      group.add(hubM);

      const rubyG = new THREE.CylinderGeometry(radius * 0.1, radius * 0.1, thickness * 1.1, 16);
      rubyG.rotateX(Math.PI / 2);
      const rubyM = new THREE.Mesh(rubyG, rubyMat);
      group.add(rubyM);

      // Spokes
      for (let s = 0; s < spokes; s++) {
        const sAng = (s * Math.PI * 2) / spokes;
        const spokeG = new THREE.BoxGeometry(radius * 0.85, radius * 0.05, thickness * 0.9);
        const spokeM = new THREE.Mesh(spokeG, mat);
        spokeM.position.set(Math.cos(sAng) * (radius * 0.45), Math.sin(sAng) * (radius * 0.45), 0);
        spokeM.rotation.z = sAng;
        group.add(spokeM);
      }

      return group;
    };

    // Master Watch Container
    const masterWatch = new THREE.Group();
    scene.add(masterWatch);
    masterWatchGroupRef.current = masterWatch;

    const layers: WatchLayer[] = [];

    // ==========================================
    // LAYER 1: Front Sapphire Crystal
    // ==========================================
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.CylinderGeometry(2.7, 2.7, 0.05, 48);
    crystalGeo.rotateX(Math.PI / 2);
    const crystalMesh = new THREE.Mesh(crystalGeo, glassMat);
    crystalGroup.add(crystalMesh);
    masterWatch.add(crystalGroup);
    layers.push({
      id: "crystal",
      name: "Double-Domed Sapphire Crystal",
      mesh: crystalGroup,
      baseZ: 0.9,
      explodeZ: 2.8,
    });

    // ==========================================
    // LAYER 2: Titanium Outer Bezel with Screws
    // ==========================================
    const caseGroup = new THREE.Group();
    const bezelGeo = new THREE.TorusGeometry(2.8, 0.22, 16, 64);
    const bezelMesh = new THREE.Mesh(bezelGeo, titaniumMat);
    caseGroup.add(bezelMesh);

    // 6 Bezel Screws
    for (let i = 0; i < 6; i++) {
      const bAng = (i * Math.PI * 2) / 6;
      const bScrewG = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12);
      bScrewG.rotateX(Math.PI / 2);
      const bScrewM = new THREE.Mesh(bScrewG, titaniumDarkMat);
      bScrewM.position.set(Math.cos(bAng) * 2.8, Math.sin(bAng) * 2.8, 0.05);
      caseGroup.add(bScrewM);
    }
    masterWatch.add(caseGroup);
    layers.push({
      id: "case",
      name: "Grade 5 Titanium Bezel",
      mesh: caseGroup,
      baseZ: 0.75,
      explodeZ: 2.1,
    });

    // ==========================================
    // LAYER 3: Skeleton Chapter Ring (Dial)
    // ==========================================
    const dialGroup = new THREE.Group();
    const ringDialGeo = new THREE.TorusGeometry(2.5, 0.12, 16, 48);
    const ringDialMesh = new THREE.Mesh(ringDialGeo, titaniumDarkMat);
    dialGroup.add(ringDialMesh);

    // Hour Markers
    for (let h = 0; h < 12; h++) {
      const hAng = (h * Math.PI * 2) / 12;
      const hGeo = new THREE.BoxGeometry(0.06, 0.3, 0.06);
      const hMesh = new THREE.Mesh(hGeo, goldMat);
      hMesh.position.set(Math.cos(hAng) * 2.38, Math.sin(hAng) * 2.38, 0.02);
      hMesh.rotation.z = hAng;
      dialGroup.add(hMesh);
    }
    masterWatch.add(dialGroup);
    layers.push({
      id: "dial",
      name: "Openworked Chapter Ring",
      mesh: dialGroup,
      baseZ: 0.55,
      explodeZ: 1.4,
    });

    // ==========================================
    // LAYER 4: Skeletonized Titanium Bridges
    // ==========================================
    const bridgeGroup = new THREE.Group();
    const brGeo1 = new THREE.BoxGeometry(2.4, 0.28, 0.1);
    const brMesh1 = new THREE.Mesh(brGeo1, titaniumMat);
    brMesh1.position.set(0, 0.2, 0);
    brMesh1.rotation.z = -0.25;
    bridgeGroup.add(brMesh1);

    const brGeo2 = new THREE.BoxGeometry(1.6, 0.22, 0.1);
    const brMesh2 = new THREE.Mesh(brGeo2, titaniumMat);
    brMesh2.position.set(0.6, -0.6, 0);
    brMesh2.rotation.z = 0.5;
    bridgeGroup.add(brMesh2);

    masterWatch.add(bridgeGroup);
    layers.push({
      id: "bridges",
      name: "Skeleton Titanium Bridges",
      mesh: bridgeGroup,
      baseZ: 0.35,
      explodeZ: 0.7,
    });

    // ==========================================
    // LAYER 5: Intermeshed Gear Train & Barrels
    // ==========================================
    const geartrainGroup = new THREE.Group();

    // Twin Barrels (Top Left & Top Right)
    const barrelL = buildGear(26, 0.85, 0.16, 5, roseGoldMat);
    barrelL.position.set(-0.95, 1.1, 0);
    geartrainGroup.add(barrelL);

    const barrelR = buildGear(26, 0.85, 0.16, 5, roseGoldMat);
    barrelR.position.set(0.95, 1.1, 0);
    geartrainGroup.add(barrelR);

    // Center Wheel
    const centerWheel = buildGear(34, 1.05, 0.1, 6, goldMat);
    centerWheel.position.set(0, 0.1, 0);
    geartrainGroup.add(centerWheel);

    // Third Wheel
    const thirdWheel = buildGear(20, 0.6, 0.08, 4, goldMat);
    thirdWheel.position.set(0.85, -0.65, 0);
    geartrainGroup.add(thirdWheel);

    masterWatch.add(geartrainGroup);
    layers.push({
      id: "geartrain",
      name: "Differential Kinetic Geartrain",
      mesh: geartrainGroup,
      baseZ: 0.15,
      explodeZ: 0.0,
      rotSpeed: 0.2,
    });

    // ==========================================
    // LAYER 6: 60-Second Flying Tourbillon
    // ==========================================
    const tourbillonGroup = new THREE.Group();
    tourbillonGroup.position.set(0, -1.25, 0);

    // Outer Carriage Ring
    const cageTorus = new THREE.TorusGeometry(0.8, 0.045, 16, 36);
    const cageMesh = new THREE.Mesh(cageTorus, titaniumMat);
    tourbillonGroup.add(cageMesh);

    // 3 Carriage Arms
    for (let a = 0; a < 3; a++) {
      const aAng = (a * Math.PI * 2) / 3;
      const aGeo = new THREE.BoxGeometry(0.8, 0.04, 0.06);
      const aMesh = new THREE.Mesh(aGeo, titaniumMat);
      aMesh.position.set(Math.cos(aAng) * 0.38, Math.sin(aAng) * 0.38, 0);
      aMesh.rotation.z = aAng;
      tourbillonGroup.add(aMesh);
    }

    // Oscillating Balance Wheel
    const balanceGroup = new THREE.Group();
    const balGeo = new THREE.TorusGeometry(0.62, 0.035, 16, 32);
    const balMesh = new THREE.Mesh(balGeo, roseGoldMat);
    balanceGroup.add(balMesh);

    // 4 Balance Gold Inertia Screws
    for (let s = 0; s < 4; s++) {
      const sAng = (s * Math.PI) / 2;
      const scrGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10);
      scrGeo.rotateX(Math.PI / 2);
      const scrMesh = new THREE.Mesh(scrGeo, goldMat);
      scrMesh.position.set(Math.cos(sAng) * 0.62, Math.sin(sAng) * 0.62, 0);
      balanceGroup.add(scrMesh);
    }

    // Spiraling Hairspring
    const springPts = [];
    for (let t = 0; t < Math.PI * 7; t += 0.2) {
      const r = (t / (Math.PI * 7)) * 0.32;
      springPts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0.02));
    }
    const springGeo = new THREE.BufferGeometry().setFromPoints(springPts);
    const springLine = new THREE.Line(springGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
    balanceGroup.add(springLine);

    balanceWheelRef.current = balanceGroup;
    tourbillonGroup.add(balanceGroup);

    masterWatch.add(tourbillonGroup);
    layers.push({
      id: "tourbillon",
      name: "60-Second Flying Tourbillon",
      mesh: tourbillonGroup,
      baseZ: 0.05,
      explodeZ: -0.7,
      rotSpeed: 0.6,
    });

    // ==========================================
    // LAYER 7: Mainplate Foundation & Exhibition Back
    // ==========================================
    const mainplateGroup = new THREE.Group();
    const plateGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.15, 64);
    plateGeo.rotateX(Math.PI / 2);
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    mainplateGroup.add(plateMesh);

    // Caseback Ring
    const backRingGeo = new THREE.TorusGeometry(2.82, 0.18, 16, 64);
    const backRingMesh = new THREE.Mesh(backRingGeo, titaniumMat);
    mainplateGroup.add(backRingMesh);

    // Blued Screws around perimeter
    for (let sc = 0; sc < 6; sc++) {
      const scAng = (sc * Math.PI * 2) / 6;
      const scGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.18, 12);
      scGeo.rotateX(Math.PI / 2);
      const scMesh = new THREE.Mesh(scGeo, bluedMat);
      scMesh.position.set(Math.cos(scAng) * 2.5, Math.sin(scAng) * 2.5, 0.06);
      mainplateGroup.add(scMesh);
    }

    masterWatch.add(mainplateGroup);
    layers.push({
      id: "mainplate",
      name: "Mainplate & Caseback Foundation",
      mesh: mainplateGroup,
      baseZ: -0.15,
      explodeZ: -1.6,
    });

    layersRef.current = layers;

    // Initialize all baseline positions
    layers.forEach((l) => {
      l.mesh.position.z = l.baseZ;
    });

    // Mouse Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !masterWatchGroupRef.current) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      masterWatchGroupRef.current.rotation.y += dx * 0.007;
      masterWatchGroupRef.current.rotation.x += dy * 0.007;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Exploded Separation Lerp
      currentExplodeRef.current += (targetExplodeRef.current - currentExplodeRef.current) * 0.08;

      layersRef.current.forEach((l) => {
        // Interpolate smoothly between baseZ and explodeZ
        l.mesh.position.z = l.baseZ + (l.explodeZ - l.baseZ) * currentExplodeRef.current;

        // Individual layer internal rotations
        if (l.id === "geartrain") {
          barrelL.rotation.z -= 0.04 * delta * speedMultiplier;
          barrelR.rotation.z += 0.04 * delta * speedMultiplier;
          centerWheel.rotation.z += 0.12 * delta * speedMultiplier;
          thirdWheel.rotation.z -= 0.3 * delta * speedMultiplier;
        } else if (l.id === "tourbillon") {
          tourbillonGroup.rotation.z += 0.5 * delta * speedMultiplier;
        }
      });

      // 4Hz Balance wheel oscillation
      if (balanceWheelRef.current) {
        balanceWheelRef.current.rotation.z = Math.sin(elapsed * 25 * speedMultiplier) * 0.85;
      }

      // Gentle auto-rotation when user is not dragging
      if (autoRotate && !isDragging && masterWatchGroupRef.current) {
        masterWatchGroupRef.current.rotation.y += 0.003 * speedMultiplier;
      }

      // Smooth Camera Positioning & LookAt Lerp
      camera.position.lerp(targetCamPosRef.current, 0.06);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.06);
      camera.lookAt(currentLookAtRef.current);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, [speedMultiplier, autoRotate]);

  // Handle Explode Slider (0.0 to 1.0)
  const handleSliderChange = (val: number) => {
    setExplodeSlider(val);
    targetExplodeRef.current = val;
    if (val > 0.1) {
      setActivePreset("exploded");
    } else {
      setActivePreset("overview");
    }
  };

  // Switch Camera Presets Cleanly
  const applyPreset = (preset: CameraPreset) => {
    setActivePreset(preset);
    if (preset === "overview") {
      targetExplodeRef.current = 0;
      setExplodeSlider(0);
      targetCamPosRef.current.set(0, 0, 7.2);
      targetLookAtRef.current.set(0, 0, 0);
      setSelectedPartId("case");
    } else if (preset === "exploded") {
      targetExplodeRef.current = 1;
      setExplodeSlider(1);
      targetCamPosRef.current.set(2.4, 1.6, 7.8);
      targetLookAtRef.current.set(0, 0, 0);
      setSelectedPartId("geartrain");
    } else if (preset === "tourbillon") {
      targetExplodeRef.current = 0.2;
      setExplodeSlider(0.2);
      targetCamPosRef.current.set(0, -1.25, 3.2);
      targetLookAtRef.current.set(0, -1.25, 0);
      setSelectedPartId("tourbillon");
    } else if (preset === "geartrain") {
      targetExplodeRef.current = 0.35;
      setExplodeSlider(0.35);
      targetCamPosRef.current.set(0, 0.6, 3.6);
      targetLookAtRef.current.set(0, 0.4, 0);
      setSelectedPartId("bridges");
    }
  };

  const resetRotation = () => {
    if (masterWatchGroupRef.current) {
      masterWatchGroupRef.current.rotation.set(0, 0, 0);
    }
    targetCamPosRef.current.set(0, 0, 7.2);
    targetLookAtRef.current.set(0, 0, 0);
  };

  const currentInfo = partsInfo[selectedPartId] || partsInfo.tourbillon;

  return (
    <section id="mechanism-3d" className="relative py-28 bg-[#06060a] text-white border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-glow)] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--accent-secondary)] mb-3">
              <span>HADI ATELIER 3D LAB</span>
              <span>•</span>
              <span>CINEMATIC CALIBRE REVELATION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
              WATCH MECHANISM <span className="italic gold-gradient-text">&amp; PARTS DISASSEMBLY</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Seamlessly inspect the complete assembled timepiece or slide into fully exploded multi-layer mechanical disassembly with real-time 4Hz gear kinematics.
          </p>
        </div>

        {/* 3D Viewport & Inspection Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main 3D Canvas Canvas */}
          <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-[var(--border-accent)] bg-gradient-to-b from-[#0c0d14] via-[#08080f] to-[#040407] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing">
            {/* 3D Mount Canvas */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Top Interactive Preset Badges */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 pointer-events-auto">
                <button
                  onClick={() => applyPreset("overview")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    activePreset === "overview" && explodeSlider === 0
                      ? "bg-[var(--accent-primary)] text-black font-bold shadow-md"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  Assembled Overview
                </button>
                <button
                  onClick={() => applyPreset("exploded")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activePreset === "exploded"
                      ? "bg-[var(--accent-primary)] text-black font-bold shadow-md"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Exploded Parts</span>
                </button>
                <button
                  onClick={() => applyPreset("tourbillon")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    activePreset === "tourbillon"
                      ? "bg-[var(--accent-primary)] text-black font-bold shadow-md"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  Tourbillon Macro
                </button>
                <button
                  onClick={() => applyPreset("geartrain")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    activePreset === "geartrain"
                      ? "bg-[var(--accent-primary)] text-black font-bold shadow-md"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  Wheel Train &amp; Barrels
                </button>
              </div>

              {/* Reset & Auto-Rotate Controls */}
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-colors ${
                    autoRotate
                      ? "bg-[var(--accent-glow)] border-[var(--accent-primary)] text-[var(--accent-secondary)]"
                      : "bg-black/80 border-white/10 text-neutral-400 hover:text-white"
                  }`}
                  title={autoRotate ? "Pause Auto Orbit" : "Resume Auto Orbit"}
                >
                  {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={resetRotation}
                  className="p-2 rounded-xl bg-black/80 hover:bg-white/10 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
                  title="Reset 3D Angle"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Explode Range Slider Bar */}
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-secondary)] uppercase">
                <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Explode Mechanism Range:</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-64">
                <span className="text-[10px] font-mono text-neutral-400">0%</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeSlider}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent-primary)] cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
                />
                <span className="text-[10px] font-mono text-[#f3e5ab] font-bold">
                  {Math.round(explodeSlider * 100)}%
                </span>
              </div>

              {/* Speed Multiplier */}
              <div className="flex items-center gap-1">
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      speedMultiplier === spd
                        ? "bg-[var(--accent-primary)] text-black font-bold"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {spd}X
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Component Deep-Dive Inspection Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#0e0f17]/95 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[var(--accent-primary)] uppercase mb-2">
                <Info className="w-3.5 h-3.5" />
                <span>ACTIVE COMPONENT DOSSIER</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-1">
                {currentInfo.name}
              </h3>
              <div className="text-xs font-mono text-[var(--accent-secondary)] mb-4">
                {currentInfo.category}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {currentInfo.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Metallurgy:</span>
                  <span className="text-white">{currentInfo.metallurgy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tolerance Benchmark:</span>
                  <span className="text-[var(--accent-secondary)] font-bold">{currentInfo.tolerance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Escapement Frequency:</span>
                  <span className="text-emerald-400 font-bold">28,800 VPH (4.00 Hz)</span>
                </div>
              </div>
            </div>

            {/* Quick Component Selection Grid */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-[10px] font-mono text-neutral-400 uppercase mb-3">
                Select Calibre Assembly Layer:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(partsInfo).map(([key, part]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedPartId(key);
                      if (key === "tourbillon") applyPreset("tourbillon");
                      else if (key === "geartrain") applyPreset("geartrain");
                      else if (key === "case" || key === "crystal") applyPreset("overview");
                      else if (key === "bridges" || key === "mainplate") applyPreset("exploded");
                    }}
                    className={`p-2 rounded-lg text-left text-xs transition-colors border ${
                      selectedPartId === key
                        ? "bg-[var(--accent-glow)] border-[var(--accent-primary)] text-[var(--accent-secondary)] font-bold"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="truncate">{part.name.split(" ")[0]} {part.name.split(" ")[1]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
