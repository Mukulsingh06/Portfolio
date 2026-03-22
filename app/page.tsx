"use client";

import { useEffect, useState, Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Grid, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { ReactLenis } from "lenis/react";
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Code2, Database, Layers, X, Award, Cpu, ExternalLink, Gamepad2, ArrowRight, ShieldAlert, Crosshair, MonitorSmartphone } from "lucide-react";
import * as THREE from "three";

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Teko:wght@500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Press+Start+2P&display=swap');
    
    .font-display { font-family: 'Teko', sans-serif; text-transform: uppercase; line-height: 0.9; }
    .font-mono { font-family: 'Space Mono', monospace; }
    
    .cut-corner { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%); }
    .cut-corner-reverse { clip-path: polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px); }
    .cut-corner-both { clip-path: polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px); }
    
    .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2)); background-size: 100% 4px; pointer-events: none; }
    
    @keyframes marquee-forward { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
    @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
    .animate-marquee-forward { display: flex; width: max-content; animation: marquee-forward 40s linear infinite; }
    .animate-marquee-reverse { display: flex; width: max-content; animation: marquee-reverse 40s linear infinite; }

    .bg-cyber-grid {
      background-size: 60px 60px;
      background-image: 
        linear-gradient(to right, rgba(255, 0, 60, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 0, 60, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
    }
    @keyframes panGrid {
      0% { transform: translateY(0); }
      100% { transform: translateY(60px); }
    }
    .animate-grid-pan {
      animation: panGrid 10s linear infinite;
    }

    body.retro-pixel-mode * { font-family: 'Press Start 2P', cursive !important; border-radius: 0 !important; clip-path: none !important; letter-spacing: 0 !important; }
    body.retro-pixel-mode .scanlines { opacity: 1; background-size: 100% 8px; }
  `}} />
);

function useKonamiCode() {
  const [retroMode, setRetroMode] = useState(false);
  useEffect(() => {
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) { setRetroMode(p => !p); konamiIndex = 0; }
      } else { konamiIndex = 0; }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (retroMode) document.body.classList.add("retro-pixel-mode");
    else document.body.classList.remove("retro-pixel-mode");
  }, [retroMode]);
  return retroMode;
}

function GameplayPreloader({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    "INITIALIZING CORE_ARCHITECT_V3...",
    "LOADING NEURAL_INTERFACE_ASSETS...",
    "LINKING C++_ALGORITHMIC_MODULES...",
    "MOUNTING NEXT.JS_FRAMEWORK...",
    "ESTABLISHING SECURE_HANDSHAKE...",
    "READY TO INITIALIZE."
  ];

  useEffect(() => {
    let msgIndex = 0;
    const logInterval = setInterval(() => {
      if (msgIndex < bootMessages.length) {
        setLogs(prev => [...prev, `> ${bootMessages[msgIndex]}`].slice(-5));
        msgIndex++;
      }
    }, 400);

    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return p + Math.random() * 8;
      });
    }, 150);
    
    return () => { clearInterval(logInterval); clearInterval(progInterval); };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", transition: { duration: 0.8, ease: "circIn" } }} 
      className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col justify-center items-center font-mono"
    >
      <div className="absolute top-10 left-10 text-[#FF003C] text-[10px] opacity-40">
        <p>BUILD_ID: 2026.03.20_MS</p>
        <p>LOC: CHANDIGARH_NODE_01</p>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2] }} 
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="w-16 h-16 border-2 border-[#FF003C] mb-8 flex items-center justify-center rotate-45"
        >
          <div className="w-8 h-8 bg-[#FF003C] animate-pulse" />
        </motion.div>
        
        <div className="h-32 mb-4 overflow-hidden text-left w-64">
          {logs.map((log, i) => (
            <p key={i} className="text-[#FF003C] text-xs mb-1">{log}</p>
          ))}
        </div>

        <div className="w-64 h-1 bg-white/10 relative">
          <motion.div 
             className="absolute inset-0 bg-[#FF003C] shadow-[0_0_15px_#FF003C]" 
             style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </motion.div>
  );
}

const CyberDecodeText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startAnimation, delay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, delay]);

  return <span className="inline-block">{displayText || text.replace(/./g, "0")}</span>;
};

function CrosshairCursor() {
  const cursorX = useSpring(-100, { stiffness: 1000, damping: 40 });
  const cursorY = useSpring(-100, { stiffness: 1000, damping: 40 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => { 
      cursorX.set(e.clientX); 
      cursorY.set(e.clientY); 
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .interactive, .tilt-card, input, textarea")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted || isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div 
        animate={{ scale: isHovered ? 1.5 : 1, rotate: isHovered ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative flex items-center justify-center text-[#FF003C]"
      >
        <Crosshair size={isHovered ? 48 : 32} strokeWidth={1} />
        {isHovered && <div className="absolute w-2 h-2 bg-[#FF003C] rounded-full animate-ping" />}
      </motion.div>
    </motion.div>
  );
}

function CameraRig({ isBooting }: { isBooting: boolean }) {
  const { camera } = useThree();

  useFrame(() => {
    if (isBooting) {
      camera.position.z = 40;
      camera.rotation.z = Math.PI / 4;
    } else {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.03);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, 0, 0.03);
    }
  });
  return null;
}

function MouseReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport, pointer } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      const targetX = (pointer.x * viewport.width) / 2;
      const targetY = (pointer.y * viewport.height) / 2;
      lightRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 2), 0.1);
    }
  });
  return <pointLight ref={lightRef} color="#FF003C" intensity={50} distance={20} decay={2} />;
}

function BloodGrid({ isBooting }: { isBooting: boolean }) {
  const gridRef = useRef<THREE.Group>(null);
  const [sparkleCount, setSparkleCount] = useState(100);

  useEffect(() => {
    setSparkleCount(window.innerWidth > 768 ? 250 : 100);
  }, []);
  
  useFrame((state) => {
    if (gridRef.current) {
      const speed = isBooting ? 5 : 1.5;
      gridRef.current.position.z = (state.clock.elapsedTime * speed) % 3;
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <>
      <CameraRig isBooting={isBooting} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#FF003C" />
      <MouseReactiveLight />

      <group ref={gridRef}>
        <Grid position={[0, -4, 0]} args={[150, 150]} cellColor="#FF003C" sectionColor="#FF003C" sectionSize={4} cellSize={1} fadeDistance={40} cellThickness={0.8} />
      </group>

      <Sparkles count={sparkleCount} scale={40} size={isBooting ? 10 : 4} speed={isBooting ? 10 : 0.5} opacity={0.8} color="#FF003C" />

      <Float speed={2} rotationIntensity={4} floatIntensity={3}>
        <mesh position={[6, 2, -8]} scale={2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
          <lineSegments>
            <edgesGeometry attach="geometry" args={[new THREE.OctahedronGeometry(1, 0)]} />
            <lineBasicMaterial attach="material" color="#FF003C" linewidth={2} />
          </lineSegments>
        </mesh>
      </Float>

      <EffectComposer enableNormalPass>
        <Bloom luminanceThreshold={0.2} intensity={isBooting ? 3 : 1.5} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
      </EffectComposer>
    </>
  );
}

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div className="relative overflow-hidden inline-block">
      <motion.div
        initial={{ y: "100%", skewY: 10, opacity: 0 }}
        whileInView={{ y: 0, skewY: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ContinuousFloat = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay }}>
    {children}
  </motion.div>
);

const TiltCard = ({ children, className = "", floatDelay = 0 }: { children: React.ReactNode, className?: string, floatDelay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ContinuousFloat delay={floatDelay}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`tilt-card relative bg-[#0A0A0A] border border-[#FF003C]/30 cut-corner group transition-colors duration-300 hover:border-[#FF003C] hover:shadow-[0_0_40px_rgba(255,0,60,0.4)] ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF003C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 w-full h-full p-8 md:p-12 transform-[translateZ(30px)]">
            {children}
          </div>
        </motion.div>
      </ContinuousFloat>
    </motion.div>
  );
};

function TerminalContactForm() {
  const [status, setStatus] = useState<"idle" | "transmitting" | "complete">("idle");
  const [consoleOutput, setConsoleOutput] = useState("");
  
  const transmissionSequence = [
    "> ESTABLISHING SECURE CONNECTION...",
    "> ENCRYPTING PAYLOAD...",
    "> UPLOADING TO ARCHITECT MAIN-FRAME...",
    "> TRANSMISSION SUCCESSFUL. STAND BY."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("transmitting");
    let currentLine = 0;
    setConsoleOutput("");
    
    const interval = setInterval(() => {
      if (currentLine < transmissionSequence.length) {
        setConsoleOutput((prev) => prev + transmissionSequence[currentLine] + "\n");
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStatus("complete"), 1000);
      }
    }, 600);
  };

  if (status !== "idle") {
    return (
      <div className="w-full h-full min-h-[400px] bg-[#050505] border border-[#FF003C] p-8 cut-corner flex flex-col justify-center">
        <pre className="font-mono text-[#FF003C] text-sm md:text-lg whitespace-pre-wrap animate-pulse">
          {consoleOutput}
          {status === "transmitting" && <span className="inline-block w-3 h-5 bg-[#FF003C] ml-2" />}
        </pre>
        {status === "complete" && (
          <button onClick={() => setStatus("idle")} className="mt-8 font-mono text-white text-sm border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors w-fit interactive">
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-10 interactive" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs text-[#FF003C] tracking-widest uppercase font-bold">PLAYER_NAME</label>
        <input required type="text" className="bg-[#050505] border border-white/20 p-4 text-white font-mono text-lg focus:outline-none focus:border-[#FF003C] transition-colors cut-corner" />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs text-[#FF003C] tracking-widest uppercase font-bold">CONTACT_EMAIL</label>
        <input required type="email" className="bg-[#050505] border border-white/20 p-4 text-white font-mono text-lg focus:outline-none focus:border-[#FF003C] transition-colors cut-corner" />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs text-[#FF003C] tracking-widest uppercase font-bold">MESSAGE_DATA</label>
        <textarea required className="bg-[#050505] border border-white/20 p-4 text-white font-mono text-lg focus:outline-none focus:border-[#FF003C] transition-colors cut-corner resize-none h-32" />
      </div>
      <button type="submit" className="w-full py-6 bg-[#FF003C] text-white font-display text-3xl tracking-widest hover:bg-white hover:text-black transition-colors mt-4 cut-corner flex justify-center items-center gap-4 group shadow-[0_0_20px_rgba(255,0,60,0.3)]">
        SEND TRANSMISSION <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </form>
  );
}

function CertificateStream({ items, reverse = false, onSelect }: { items: any[], reverse?: boolean, onSelect: (item: any) => void }) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className={`flex gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee-forward'}`}>
        {[...items, ...items].map((cert, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(cert)}
            className="group relative w-72 h-44 bg-[#0A0A0A] border border-white/10 hover:border-[#FF003C] transition-all p-6 text-left cut-corner-reverse flex-shrink-0 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-100 transition-opacity">
              <Award className="text-[#FF003C]" size={24} />
            </div>
            <span className="font-mono text-[10px] text-[#FF003C] tracking-widest border border-[#FF003C]/30 px-2 py-0.5">{cert.rarity}</span>
            <h4 className="font-display text-2xl text-white mt-4 leading-tight uppercase group-hover:text-[#FF003C] transition-colors">{cert.title}</h4>
            <div className="mt-auto flex justify-between items-end">
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-tighter">{cert.org}</p>
              <p className="font-mono text-[10px] text-[#FF003C]">{cert.date}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF003C] group-hover:w-full transition-all duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
}

function LowPowerBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020202] overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020202_90%)] z-10" />

      <div className="absolute text-[15vw] font-display text-white/[0.03] tracking-[0.2em] whitespace-nowrap select-none">
        Develop..
      </div>

      <div className="absolute inset-0 bg-cyber-grid animate-grid-pan opacity-100" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF003C] rounded-full blur-[150px] opacity-[0.05]" />

      <motion.div 
        animate={{ y: ["-10vh", "110vh"] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[2px] bg-[#FF003C] opacity-20 shadow-[0_0_20px_#FF003C] z-10"
      />

      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute text-[#FF003C] font-mono text-xs opacity-20"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            +
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 flex justify-around w-full opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{ 
              duration: 5 + Math.random() * 10,
              repeat: Infinity, 
              ease: "linear", 
              delay: Math.random() * 5
            }}
            style={{ height: `${Math.random() * 150 + 50}px` }}
            className="w-[1px] bg-gradient-to-b from-transparent via-[#FF003C]/60 to-transparent"
          />
        ))}
      </div>
    </div>
  );
}

export default function CrimsonAnimatedPortfolio() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [vfxEnabled, setVfxEnabled] = useState(true);
  
  const handleBootComplete = useCallback(() => setIsBooting(false), []);
  const isRetroMode = useKonamiCode();

  const certificates = [
    { id: "C1", title: "Full Stack Dev", org: "Board Infinity", date: "Jan 2024", rarity: "LEGENDARY", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000" },
    { id: "C2", title: "CSS Basics", org: "HackerRank", date: "Oct 2025", rarity: "RARE", img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000" },
    { id: "C3", title: "Problem Solving", org: "HackerRank", date: "Dec 2023", rarity: "EPIC", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000" },
    { id: "C4", title: "C++ Advanced", org: "GeeksForGeeks", date: "Mar 2024", rarity: "LEGENDARY", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000" },
    { id: "C5", title: "System Design", org: "Arpit Bhayani", date: "May 2025", rarity: "EPIC", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000" },
    { id: "C6", title: "Web Architect", org: "FreeCodeCamp", date: "Aug 2025", rarity: "RARE", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000" }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <GlobalStyles />
      
      <AnimatePresence mode="wait">
        {isBooting && <GameplayPreloader key="preloader" onComplete={handleBootComplete} />}
      </AnimatePresence>

      <CrosshairCursor />

      <AnimatePresence>
        {activeItem && (
          <motion.div 
            key="modal-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(10px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-[#050505]/90 p-4 md:p-12"
          >
            <motion.div 
              key="modal-content"
              initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-[#0A0A0A] border border-[#FF003C] cut-corner-both shadow-[0_0_50px_rgba(255,0,60,0.6)] flex flex-col relative"
            >
              <div className="bg-[#FF003C] px-6 py-4 flex justify-between items-center text-white">
                <span className="font-mono text-sm font-bold tracking-widest uppercase">ITEM_INSPECTION // {activeItem.id}</span>
                <button onClick={() => setActiveItem(null)} className="interactive hover:text-black transition-colors font-bold"><X /></button>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-stretch">
                <div className="w-full md:w-1/2 h-64 md:h-auto border border-[#FF003C]/30 relative flex items-center justify-center overflow-hidden cut-corner">
                  <img src={activeItem.img} alt="Cert" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale" />
                  <div className="absolute inset-0 bg-[#FF003C] mix-blend-overlay opacity-50" />
                  <Award size={100} className="text-white relative z-10 drop-shadow-[0_0_20px_#FF003C]" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                   <span className="font-mono text-[#FF003C] text-sm tracking-widest mb-4 block border border-[#FF003C] px-3 py-1 w-fit animate-pulse">{activeItem.rarity} ITEM</span>
                   <h3 className="font-display text-5xl md:text-6xl text-white mb-6 leading-none tracking-wide">{activeItem.title}</h3>
                   <div className="font-mono text-white/70 space-y-4 mb-8">
                     <p className="flex justify-between border-b border-white/10 pb-2"><span>ISSUER:</span> <span className="text-white font-bold">{activeItem.org}</span></p>
                     <p className="flex justify-between border-b border-white/10 pb-2"><span>ACQUIRED:</span> <span className="text-white font-bold">{activeItem.date}</span></p>
                   </div>
                   <div className="mt-auto p-4 bg-[#FF003C]/10 border border-[#FF003C] text-[#FF003C] font-mono text-sm flex items-center justify-center gap-3">
                     <ShieldAlert size={18} /> STATUS: VERIFIED CREDENTIAL
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {vfxEnabled ? (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
          <Canvas camera={{ position: [0, 2, 10], fov: 50 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
            <Suspense fallback={null}>
               <BloodGrid isBooting={isBooting} />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <LowPowerBackground />
      )}

      <div className="fixed inset-0 scanlines z-[100] mix-blend-overlay opacity-30 pointer-events-none" />

      <main className="relative z-20 w-full text-white selection:bg-[#FF003C] selection:text-white pb-24 overflow-hidden">
        
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 pointer-events-none">
           <div className="flex flex-col pointer-events-auto">
             <span className="font-display text-4xl tracking-widest leading-none drop-shadow-[0_0_10px_#FF003C]">Mukul.CV</span>
           </div>
           <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={() => setVfxEnabled(!vfxEnabled)}
               className="interactive font-mono text-xs text-white border border-white/30 bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-3 hover:border-[#FF003C] transition-colors cut-corner-reverse hidden md:block"
             >
               VFX: {vfxEnabled ? "ON" : "OFF"}
             </button>
             <div className="font-mono text-xs text-white border border-[#FF003C] bg-[#0A0A0A]/80 backdrop-blur-md px-6 py-3 hidden md:flex items-center gap-3 shadow-[0_0_20px_rgba(255,0,60,0.3)] cut-corner-reverse">
               <span className="w-2 h-2 bg-[#FF003C] animate-pulse" /> {vfxEnabled ? "ONLINE" : "LOW_POWER"}
             </div>
           </div>
        </nav>

        <section className="min-h-screen flex flex-col justify-center px-[6vw] md:px-[10vw] pt-20">
          <div className="w-full max-w-screen-2xl mx-auto">
            
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-8 inline-flex items-center gap-3 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#FF003C]/50 px-6 py-2 cut-corner shadow-[0_0_15px_rgba(255,0,60,0.3)]">
              <Gamepad2 className="text-[#FF003C]" size={20} />
              <span className="font-mono text-sm text-white/80 tracking-widest">Full Stack Developer</span>
            </motion.div>
            
            <div className="flex flex-col">
              <RevealText>
                <h1 className="font-display text-[18vw] md:text-[14vw] text-white drop-shadow-[0_10px_30px_rgba(255,0,60,0.5)] leading-none">
                  {!isBooting ? <CyberDecodeText text="MUKUL" delay={300} /> : "MUKUL"}
                </h1>
              </RevealText>
              <RevealText delay={0.2}>
                <h1 className="font-display text-[18vw] md:text-[14vw] text-transparent [-webkit-text-stroke:2px_#FF003C] md:ml-[10vw] leading-none">
                  {!isBooting ? <CyberDecodeText text="SINGH" delay={800} /> : "SINGH"}
                </h1>
              </RevealText>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-12 border-t border-white/10 pt-12">
              <p className="font-mono text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed border-l-4 border-[#FF003C] pl-6 bg-[#0A0A0A]/40 backdrop-blur-sm py-4">
                &gt; About:- <span className="text-white font-bold">Tech Enthusiast</span><br/>
                &gt; Motive <span className="text-white font-bold">Learning through the Process</span><br/>
                &gt; MISSION:<span className="text-white font-bold"> Construct flawless digital systems</span>
              </p>

              <div className="flex flex-wrap gap-6">
                 <a href="#quests" className="interactive font-display text-3xl tracking-widest bg-[#FF003C] text-white px-12 py-4 cut-corner hover:bg-white hover:text-black transition-colors shadow-[0_0_30px_rgba(255,0,60,0.4)]">
                   Projects -&gt;
                 </a>
              </div>
            </motion.div>

          </div>
        </section>

        <section className="py-8 bg-[#FF003C] border-y-4 border-[#050505] shadow-[0_0_50px_rgba(255,0,60,0.8)] overflow-hidden rotate-1 scale-105 my-12 z-20 relative">
          <div className="animate-marquee-forward gap-16 items-center">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-16 items-center">
                <span className="font-display text-4xl md:text-5xl text-black uppercase tracking-widest">⭐ 5-STAR C++</span>
                <span className="font-mono text-3xl text-black/30">///</span>
                <span className="font-display text-4xl md:text-5xl text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">400+ Problem Solved Across Platforms</span>
                <span className="font-mono text-3xl text-black/30">///</span>
                <span className="font-display text-4xl md:text-5xl text-black uppercase tracking-widest">⭐ 5-STAR PYTHON</span>
                <span className="font-mono text-3xl text-black/30">///</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-32 px-[6vw] md:px-[10vw] relative z-10">
          <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealText><h2 className="font-display text-7xl md:text-8xl text-white tracking-wider">01 // TECH STACK</h2></RevealText>
              <p className="font-mono text-[#FF003C] text-sm tracking-[0.3em] uppercase mt-2">My Technology Stack</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
            
            <TiltCard className="md:col-span-2" floatDelay={0}>
               <div className="flex items-center gap-6 mb-8">
                 <div className="p-4 bg-[#FF003C]/10 border border-[#FF003C]/30 cut-corner"><Layers className="text-[#FF003C]" size={40} /></div>
                 <h3 className="font-display text-5xl tracking-widest text-white">FRONTEND</h3>
               </div>
               <p className="font-mono text-white/60 mb-10 leading-relaxed text-lg">Pixel-perfect, Responsive layouts and SEO-optimized structures.</p>
               <div className="flex flex-wrap gap-3">
                 {['REACTJS', 'TAILWIND', 'HTML/CSS', 'JAVASCRIPT', 'EJS'].map(s => (
                   <span key={s} className="px-5 py-3 bg-[#050505] border border-white/20 font-mono text-sm text-white hover:border-[#FF003C] hover:text-[#FF003C] transition-colors cursor-default cut-corner">{s}</span>
                 ))}
               </div>
            </TiltCard>

            <TiltCard floatDelay={1}>
               <div className="flex items-center gap-6 mb-8">
                 <div className="p-4 bg-[#FF003C]/10 border border-[#FF003C]/30 cut-corner"><Database className="text-[#FF003C]" size={40} /></div>
                 <h3 className="font-display text-5xl tracking-widest text-white">BACKEND</h3>
               </div>
               <p className="font-mono text-white/60 mb-10 leading-relaxed text-lg">Robust server data logic and management.</p>
               <div className="flex flex-wrap gap-3">
                 {['NODE.JS', 'EXPRESS.JS', 'MONGODB', 'MYSQL', 'POSTGRESQL'].map(s => (
                   <span key={s} className="px-5 py-3 bg-[#050505] border border-white/20 font-mono text-sm text-white hover:border-[#FF003C] hover:text-[#FF003C] transition-colors cursor-default cut-corner">{s}</span>
                 ))}
               </div>
            </TiltCard>

            <TiltCard className="md:col-span-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 border-l-[8px] border-l-[#FF003C]" floatDelay={2}>
               <div className="max-w-2xl">
                 <div className="flex items-center gap-6 mb-8">
                   <div className="p-4 bg-white/5 border border-white/20 cut-corner"><Code2 className="text-white" size={40} /></div>
                   <h3 className="font-display text-5xl tracking-widest text-white">CORE LOGIC</h3>
                 </div>
                 <p className="font-mono text-white/60 leading-relaxed text-lg">Competitive programming, algorithm optimization, and memory management.</p>
               </div>
               <div className="flex flex-wrap gap-4 md:justify-end">
                 {['C', 'C#', 'C++', 'PYTHON'].map(s => (
                   <span key={s} className="px-8 py-4 bg-white text-black font-display text-3xl tracking-widest cut-corner shadow-[0_0_20px_rgba(255,255,255,0.2)]">{s}</span>
                 ))}
               </div>
            </TiltCard>

          </div>
        </section>

        <section id="quests" className="py-32 px-[6vw] md:px-[10vw]">
          <div className="mb-24 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealText><h2 className="font-display text-6xl md:text-8xl text-white tracking-wider">02 // Projects</h2></RevealText>
              <p className="font-mono text-[#FF003C] text-sm tracking-[0.3em] uppercase mt-2">Digital Architecture Implementations</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-32 max-w-screen-2xl mx-auto">
            
            <TiltCard className="p-0 border-none bg-transparent hover:border-transparent hover:shadow-none" floatDelay={0}>
              <div className="flex flex-col lg:flex-row gap-0 group bg-[#0A0A0A] border border-[#FF003C]/30 cut-corner overflow-hidden">
                <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] bg-[#050505] border-b lg:border-b-0 lg:border-r border-[#FF003C]/30 relative flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale group-hover:scale-110 group-hover:opacity-50 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                  <MonitorSmartphone className="text-[#FF003C] w-32 h-32 relative z-10 drop-shadow-[0_0_20px_rgba(255,0,60,0.5)] group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="font-mono text-[#FF003C] text-xs border border-[#FF003C] px-4 py-2 tracking-widest bg-[#FF003C]/10 cut-corner w-fit mb-6">AUG 2025</span>
                  <h3 className="font-display text-5xl md:text-6xl text-white tracking-widest mb-6 leading-none">APPLE INTERFACE CLONE</h3>
                  <p className="font-mono text-white/60 text-lg leading-relaxed mb-10">
                    Highly accurate clone replicating the design and layout of the original Apple site. Built with strict SEO protocols, meta-tag optimization, and responsive logic.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-10 border-l-2 border-[#FF003C] pl-4">
                    <span className="font-mono text-sm text-white/80 uppercase">► HTML/CSS</span>
                    <span className="font-mono text-sm text-white/80 uppercase">► SEO ARCHITECTURE</span>
                    <span className="font-mono text-sm text-white/80 uppercase">► RESPONSIVE UI</span>
                  </div>
                  <div className="flex gap-6 mt-auto">
                    <a href="#" className="font-display text-3xl tracking-widest bg-[#FF003C] text-white px-8 py-3 hover:bg-white hover:text-black transition-colors cut-corner interactive flex items-center gap-2">
                      <ExternalLink size={24} /> PREVIEW
                    </a>
                    <a href="#" className="font-display text-3xl tracking-widest bg-transparent border border-white text-white px-8 py-3 hover:bg-white/10 transition-colors cut-corner interactive flex items-center gap-2">
                      <Github size={24} /> GITHUB
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="p-0 border-none bg-transparent hover:border-transparent hover:shadow-none" floatDelay={1.5}>
              <div className="flex flex-col lg:flex-row-reverse gap-0 group bg-[#0A0A0A] border border-[#FF003C]/30 cut-corner-reverse overflow-hidden">
                <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] bg-[#050505] border-b lg:border-b-0 lg:border-l border-[#FF003C]/30 relative flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale group-hover:scale-110 group-hover:opacity-50 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                  <MonitorSmartphone className="text-white w-32 h-32 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="font-mono text-white text-xs border border-white px-4 py-2 tracking-widest bg-white/10 cut-corner w-fit mb-6">JUN 2023</span>
                  <h3 className="font-display text-5xl md:text-6xl text-white tracking-widest mb-6 leading-none">NGO PHILANTHROPIC PORTAL</h3>
                  <p className="font-mono text-white/60 text-lg leading-relaxed mb-10">
                    Engineered a seamless cross-device donation platform. Designed a structured content hierarchy with intuitive calls-to-action to maximize user engagement and conversion routing.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-10 border-l-2 border-white pl-4">
                    <span className="font-mono text-sm text-white/80 uppercase">► FRONTEND UX</span>
                    <span className="font-mono text-sm text-white/80 uppercase">► CROSS-DEVICE</span>
                    <span className="font-mono text-sm text-white/80 uppercase">► CONVERSIONS</span>
                  </div>
                  <div className="flex gap-6 mt-auto">
                    <a href="#" className="font-display text-3xl tracking-widest bg-white text-black px-8 py-3 hover:bg-[#FF003C] hover:text-white transition-colors cut-corner interactive flex items-center gap-2">
                      <ExternalLink size={24} /> PREVIEW
                    </a>
                    <a href="#" className="font-display text-3xl tracking-widest bg-transparent border border-white text-white px-8 py-3 hover:bg-white/10 transition-colors cut-corner interactive flex items-center gap-2">
                      <Github size={24} /> GITHUB
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>

          </div>
        </section>

        {/* --- 3. LORE (TRAINING & EDUCATION) --- */}
        <section className="py-32 px-[6vw] md:px-[10vw] relative">
          <div className="mb-24 border-b border-white/10 pb-8">
            <RevealText><h2 className="font-display text-6xl md:text-8xl text-white tracking-wider">03 // LORE & STATS</h2></RevealText>
            <p className="font-mono text-[#FF003C] text-sm tracking-[0.3em] uppercase mt-2">Academic History Records</p>
          </div>

          <div className="max-w-screen-2xl mx-auto flex flex-col gap-10">
            
            <TiltCard className="border-l-[8px] border-l-[#FF003C] !p-0" floatDelay={0}>
               <div className="flex flex-col lg:flex-row items-stretch">
                 <div className="p-10 md:p-12 bg-[#FF003C]/10 border-r border-[#FF003C]/30 flex flex-col justify-center w-full lg:w-2/5 relative overflow-hidden">
                   <Cpu className="text-[#FF003C] opacity-10 absolute -right-10 -bottom-10 w-64 h-64" />
                   <h3 className="font-display text-5xl md:text-6xl text-white tracking-widest mb-4 relative z-10 leading-none">INTENSIVE DSA TRAINING (C++)</h3>
                   <p className="font-mono text-[#FF003C] text-sm tracking-widest relative z-10 border border-[#FF003C] px-3 py-1 w-fit bg-[#FF003C]/10 cut-corner">JUN 23 - JUL 23</p>
                 </div>
                 
                 <div className="p-10 md:p-12 font-mono text-white/70 space-y-6 text-lg w-full lg:w-3/5">
                   <p className="flex gap-4"><span className="text-[#FF003C] font-bold">&gt;</span> Mastered core Data Structures and Algorithms using C++.</p>
                   <p className="flex gap-4"><span className="text-[#FF003C] font-bold">&gt;</span> Engineered optimal solutions for competitive programming challenges.</p>
                   <p className="flex gap-4"><span className="text-[#FF003C] font-bold">&gt;</span> Focused heavily on reducing Big-O time and space complexity.</p>
                 </div>
               </div>
            </TiltCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <TiltCard className="flex flex-col justify-between !p-10" floatDelay={1}>
                 <div>
                   <span className="font-mono text-white/30 text-sm tracking-widest uppercase mb-6 block">AUG 2023 - PRESENT</span>
                   <h4 className="font-display text-5xl text-white tracking-widest mb-2">LOVELY PROFESSIONAL UNIV.</h4>
                   <p className="font-mono text-white/50 text-lg mb-12">B.Tech - Computer Science</p>
                 </div>
                 <div className="bg-[#050505] border border-white/20 p-6 cut-corner w-fit shadow-[0_0_15px_rgba(255,0,60,0.2)]">
                   <p className="font-display text-6xl text-[#FF003C] tracking-widest leading-none">6.63 <span className="text-lg text-white/40">CGPA</span></p>
                 </div>
              </TiltCard>

              <div className="flex flex-col gap-10">
                <TiltCard className="!p-8" floatDelay={1.5}>
                   <div className="flex justify-between items-start mb-6">
                     <div>
                       <h4 className="font-display text-4xl text-white tracking-widest mb-1">BALAJI PUBLIC SCHOOL</h4>
                       <p className="font-mono text-sm text-white/50">Intermediate (PCM) | 2022-2023</p>
                     </div>
                     <span className="font-display text-5xl text-white">68.4%</span>
                   </div>
                </TiltCard>
                <TiltCard className="!p-8 border-l-4 border-l-white/20" floatDelay={2}>
                   <div className="flex justify-between items-start mb-6">
                     <div>
                       <h4 className="font-display text-4xl text-white tracking-widest mb-1">BALAJI PUBLIC SCHOOL</h4>
                       <p className="font-mono text-sm text-white/50">Matriculation | 2020-2021</p>
                     </div>
                     <span className="font-display text-5xl text-white">83.0%</span>
                   </div>
                </TiltCard>
              </div>
            </div>
            
          </div>
        </section>

        {/* --- 04 // BADGES (NEW MARQUEE VERSION) --- */}
        <section className="py-32 relative overflow-hidden">
          <div className="px-[6vw] md:px-[10vw] mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealText>
                <h2 className="font-display text-6xl md:text-8xl text-white tracking-wider">04 // BADGES</h2>
              </RevealText>
              <p className="font-mono text-[#FF003C] text-sm tracking-[0.3em] uppercase mt-2">
                Verified Achievement Loot Stream
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-white/30">
              <span className="w-2 h-2 bg-[#FF003C] animate-ping" /> SCROLLING_ARCHIVE_ACTIVE
            </div>
          </div>
          
          <div className="relative">
            {/* ROW 1: Moves Forward (Left) */}
            <CertificateStream 
              items={certificates} 
              onSelect={setActiveItem} 
            />

            {/* ROW 2: Moves Reverse (Right) */}
            <CertificateStream 
              items={[...certificates].reverse()} 
              reverse={true} 
              onSelect={setActiveItem} 
            />

            {/* Side Masks for that "Fade In/Out" look */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          </div>

          <div className="mt-12 text-center">
             <p className="font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase">Click any badge to inspect metadata</p>
          </div>
        </section>

        {/* --- 5. SAVE GAME (CONTACT) --- */}
        <section id="save" className="py-32 px-[6vw] md:px-[10vw] border-t-4 border-[#FF003C] bg-[#050505] relative z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-t from-[#FF003C]/20 to-transparent pointer-events-none mix-blend-screen" />
          
          <div className="mb-24 text-center">
             <RevealText><h2 className="font-display text-7xl md:text-[8vw] text-white tracking-widest leading-none drop-shadow-[0_0_40px_rgba(255,0,60,0.4)]">Contact Me?</h2></RevealText>
             <p className="font-mono text-[#FF003C] text-sm tracking-[0.3em] uppercase mt-6">Transmit Data.....</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-20 max-w-screen-2xl mx-auto relative z-10">
            
            <div className="w-full lg:w-1/2 bg-[#0A0A0A] border border-[#FF003C]/50 p-8 md:p-12 cut-corner shadow-[0_0_50px_rgba(255,0,60,0.15)] relative group">
              <TerminalContactForm />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="mb-12 border-l-4 border-[#FF003C] pl-8 py-2">
                <p className="font-mono text-xl md:text-2xl text-white/80 leading-relaxed">
                  Currently seeking new opportunities for <span className="text-[#FF003C] font-bold">engineering roles</span> and <span className="text-white font-bold"> collaborations. </span>.
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:mukulsinghweb@gmail.com" className="bg-[#0A0A0A] border border-white/10 p-8 flex items-center justify-between hover:border-[#FF003C] hover:bg-[#FF003C]/5 transition-all duration-300 cut-corner interactive group shadow-lg">
                  <div className="flex items-center gap-6">
                    <Mail className="text-white/50 group-hover:text-[#FF003C] transition-colors" size={32} />
                    <p className="font-mono text-sm md:text-lg text-white font-bold">mukulsinghweb@gmail.com</p>
                  </div>
                  <ArrowRight className="text-white/20 group-hover:text-[#FF003C] group-hover:translate-x-2 transition-transform" />
                </a>

                <a href="tel:+917388600306" className="bg-[#0A0A0A] border border-white/10 p-8 flex items-center justify-between hover:border-[#FF003C] hover:bg-[#FF003C]/5 transition-all duration-300 cut-corner interactive group shadow-lg">
                  <div className="flex items-center gap-6">
                    <Phone className="text-white/50 group-hover:text-[#FF003C] transition-colors" size={32} />
                    <p className="font-mono text-sm md:text-lg text-white font-bold">+91 7388600306</p>
                  </div>
                  <ArrowRight className="text-white/20 group-hover:text-[#FF003C] group-hover:translate-x-2 transition-transform" />
                </a>

                <div className="flex gap-6 mt-4">
                  <a href="https://linkedin.com/in/mukulsingh06" target="_blank" className="flex-1 bg-[#0077b5] border border-black p-6 flex items-center justify-center gap-4 hover:bg-white hover:text-black text-white transition-all duration-300 cut-corner interactive shadow-[0_0_15px_rgba(0,119,181,0.4)]">
                    <Linkedin size={28} /> <span className="font-display tracking-widest text-2xl pt-1">LINKEDIN</span>
                  </a>
                  <a href="https://github.com/Mukulsingh06" target="_blank" className="flex-1 bg-white border border-black p-6 flex items-center justify-center gap-4 hover:bg-[#FF003C] hover:text-white text-black transition-all duration-300 cut-corner interactive shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    <Github size={28} /> <span className="font-display tracking-widest text-2xl pt-1">GITHUB</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </ReactLenis>
  );
}