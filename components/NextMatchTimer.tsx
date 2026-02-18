'use client';

import { useState, useEffect } from 'react';

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
    <div className="relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl group">
      
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[200%] bg-blue-600/20 blur-[120px] opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[70%] h-[200%] bg-purple-600/20 blur-[120px] opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
      </div>

      <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Matchup */}
        <div className="flex items-center gap-8 md:gap-16 w-full justify-center md:justify-start">
            <TeamDisplay crest={nextMatch.homeTeam.crest} name={nextMatch.homeTeam.tla} />
            <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-medium text-white/40">VS</span>
            </div>
            <TeamDisplay crest={nextMatch.awayTeam.crest} name={nextMatch.awayTeam.tla} />
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-2 mb-6 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Kickoff Countdown</span>
            </div>

            <div className="flex gap-4 md:gap-6">
                <TimeUnit val={timeLeft.d} label="DAYS" />
                <div className="text-4xl font-light text-white/10 self-start mt-2">:</div>
                <TimeUnit val={timeLeft.h} label="HRS" />
                <div className="text-4xl font-light text-white/10 self-start mt-2">:</div>
                <TimeUnit val={timeLeft.m} label="MIN" />
                <div className="text-4xl font-light text-white/10 self-start mt-2">:</div>
                <TimeUnit val={timeLeft.s} label="SEC" />
            </div>
        </div>

      </div>
    </div>
  );
}

const TeamDisplay = ({ crest, name }: any) => (
    <div className="flex flex-col items-center gap-6 group cursor-pointer">
        <div className="relative transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <img src={crest} className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10 drop-shadow-2xl" />
        </div>
        <span className="text-3xl font-bold tracking-tight text-white">{name}</span>
    </div>
);

const TimeUnit = ({ val, label }: any) => (
    <div className="flex flex-col items-center">
        <span className="text-5xl md:text-6xl font-semibold tracking-tighter text-white tabular-nums">
            {val}
        </span>
        <span className="text-[10px] font-bold text-white/40 mt-2 tracking-widest">{label}</span>
    </div>
);