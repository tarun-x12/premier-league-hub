'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowCard, FlipDigit, ParticleField, ScrollReveal } from './AnimatedLayout';

export default function NextMatchTimer({ matches }: { matches: any[] }) {
  const nextMatch = matches[0];
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!nextMatch) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = new Date(nextMatch.utcDate).getTime();
      const distance = matchTime - now;
      if (distance < 0) { clearInterval(interval); return; }

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeLeft({
        d: pad(Math.floor(distance / (1000 * 60 * 60 * 24))),
        h: pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        m: pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        s: pad(Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [nextMatch]);

  if (!mounted || !nextMatch) return null;

  return (
    <ScrollReveal>
      <GlowCard className="rounded-[32px]" glowColor="cyan">
        <div className="relative w-full overflow-hidden rounded-[32px]">

          {/* Particle decoration */}
          <ParticleField count={15} />

          {/* Background Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[200%] bg-cyan-500/10 blur-[150px] opacity-40" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[70%] h-[200%] bg-purple-600/10 blur-[150px] opacity-40" />
          </div>

          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Matchup */}
            <div className="flex items-center gap-10 md:gap-16 w-full justify-center md:justify-start">
              <TeamDisplay crest={nextMatch.homeTeam.crest} name={nextMatch.homeTeam.tla} delay={0.2} />

              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm"
                >
                  <span className="text-sm font-black text-white/50 tracking-widest">VS</span>
                </motion.div>
              </div>

              <TeamDisplay crest={nextMatch.awayTeam.crest} name={nextMatch.awayTeam.tla} delay={0.4} />
            </div>

            {/* Timer */}
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-2 mb-8 bg-white/5 px-5 py-2 rounded-full border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">Kickoff Countdown</span>
              </div>

              <div className="flex items-center gap-3 md:gap-5">
                <TimeUnit val={timeLeft.d} label="DAYS" />
                <TimeSeparator />
                <TimeUnit val={timeLeft.h} label="HRS" />
                <TimeSeparator />
                <TimeUnit val={timeLeft.m} label="MIN" />
                <TimeSeparator />
                <TimeUnit val={timeLeft.s} label="SEC" />
              </div>
            </div>

          </div>
        </div>
      </GlowCard>
    </ScrollReveal>
  );
}

const TeamDisplay = ({ crest, name, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="flex flex-col items-center gap-5 group cursor-pointer"
  >
    <div className="relative">
      {/* Glow ring on hover */}
      <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 blur-xl transition-all duration-700" />
      <div className="absolute inset-[-3px] rounded-full border border-white/0 group-hover:border-white/10 transition-all duration-500" />
      <motion.img
        src={crest}
        alt={name}
        className="w-20 h-20 md:w-28 md:h-28 object-contain relative z-10 drop-shadow-2xl"
        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <span className="text-2xl md:text-3xl font-black tracking-tight text-white/90 group-hover:text-white transition-colors">{name}</span>
  </motion.div>
);

const TimeUnit = ({ val, label }: any) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3 md:px-5 md:py-4 min-w-[70px] md:min-w-[85px] flex justify-center">
      <FlipDigit
        value={val}
        className="text-4xl md:text-5xl font-black tracking-tighter text-white"
      />
    </div>
    <span className="text-[8px] md:text-[9px] font-bold text-white/30 mt-3 tracking-[0.2em]">{label}</span>
  </div>
);

const TimeSeparator = () => (
  <motion.div
    animate={{ opacity: [0.2, 0.6, 0.2] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    className="text-3xl md:text-4xl font-light text-cyan-400/40 self-start mt-3"
  >
    :
  </motion.div>
);