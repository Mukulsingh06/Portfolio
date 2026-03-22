"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { ArrowLeft, ExternalLink, Download, Target, ShieldCheck, Crosshair } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";

function ArtifactViewer() {
  const searchParams = useSearchParams();
  const img = searchParams.get("img");
  
  // --- Custom Cursor Logic ---
  const cursorX = useSpring(-100, { stiffness: 1000, damping: 40 });
  const cursorY = useSpring(-100, { stiffness: 1000, damping: 40 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .interactive")) {
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
  // ---------------------------

  const [hudData, setHudData] = useState({ hex: "0x0000", ping: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setHudData({
        hex: `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`,
        ping: Math.floor(Math.random() * 99) + 1
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  if (!img) return <div className="min-h-screen bg-[#020202] text-[#FF003C] font-mono flex items-center justify-center animate-pulse text-2xl tracking-[0.5em]">ARTIFACT_NOT_FOUND</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-hidden selection:bg-[#FF003C] selection:text-white cursor-none">
      
      {/* Custom Cursor Component */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference items-center justify-center flex -translate-x-1/2 -translate-y-1/2"
          style={{ x: cursorX, y: cursorY }}
        >
          <motion.div 
            animate={{ scale: isHovered ? 1.5 : 1, rotate: isHovered ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="text-[#FF003C]"
          >
            <Crosshair size={32} strokeWidth={1} />
          </motion.div>
        </motion.div>
      )}

      {/* Visual background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />

      {/* Persistent HUD elements */}
      <header className="absolute top-0 w-full z-40 px-6 md:px-12 py-8 flex justify-between items-center">
        <Link 
          href="/"
          className="font-mono text-xs text-white border border-white/20 bg-[#0A0A0A]/80 px-6 py-3 hover:border-[#FF003C] hover:text-[#FF003C] transition-all flex items-center gap-3 backdrop-blur-md group interactive"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="tracking-[0.2em] uppercase">Return_to_Node</span>
        </Link>

        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#FF003C] tracking-[0.3em]">
            <span className="w-2 h-2 bg-[#FF003C] animate-ping" /> SYSTEM_STABLE
          </div>
          <span className="font-mono text-[10px] text-white/20 tracking-widest">
            {hudData.hex} // LATENCY: {hudData.ping}MS
          </span>
        </div>
      </header>

      {/* Main Focus Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-10 relative z-10">
        <div className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center group">
          
          <div className="absolute inset-0 border border-white/10 pointer-events-none">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FF003C]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FF003C]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FF003C]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FF003C]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden"
          >
            <motion.div 
              animate={{ top: ["-5%", "105%"] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-[#FF003C] shadow-[0_0_20px_#FF003C] z-20 pointer-events-none opacity-50"
            />

            <img 
              src={img} 
              alt="Verification Artifact" 
              className="w-full h-full object-contain relative z-10 transition-all duration-700" 
            />

            <div className="absolute bottom-6 left-6 z-30 flex items-center gap-4 bg-[#0A0A0A]/90 border border-[#FF003C]/30 px-5 py-3 backdrop-blur-xl">
              <ShieldCheck size={20} className="text-[#FF003C]" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-white tracking-[0.2em] uppercase">Status: Verified</span>
                <span className="font-mono text-[8px] text-white/40 tracking-widest">ENCRYPTION: AES-256</span>
              </div>
            </div>

            <div className="absolute top-6 right-6 z-30 flex flex-col gap-3">
              <a 
                href={img} 
                download 
                className="bg-[#0A0A0A]/90 p-4 border border-white/10 hover:border-[#FF003C] hover:bg-[#FF003C] text-white transition-all backdrop-blur-xl group/btn interactive"
                title="Download Record"
              >
                <Download size={20} className="group-hover/btn:scale-110 transition-transform" />
              </a>
              <a 
                href={img} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0A0A0A]/90 p-4 border border-white/10 hover:border-[#FF003C] hover:bg-[#FF003C] text-white transition-all backdrop-blur-xl group/btn interactive"
                title="Open Source File"
              >
                <ExternalLink size={20} className="group-hover/btn:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          <Target className="absolute -top-8 -left-8 text-[#FF003C] opacity-20 w-12 h-12" />
          <Target className="absolute -top-8 -right-8 text-[#FF003C] opacity-20 w-12 h-12" />
        </div>
      </main>

      <footer className="absolute bottom-0 w-full p-8 flex justify-center pointer-events-none">
        <p className="font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase">
          Neural_Link // Established // {hudData.hex}
        </p>
      </footer>
    </div>
  );
}

export default function ArtifactIsolationChamber() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border border-[#FF003C] animate-spin" />
          <span className="font-mono text-xs text-[#FF003C] tracking-widest">LOADING_ACHIEVEMENT</span>
        </div>
      </div>
    }>
      <ArtifactViewer />
    </Suspense>
  );
}