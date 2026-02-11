'use client';

import { useState, useEffect } from 'react';
import { getTeamTheme } from '@/utils/teamColors';

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

  // Dynamic Backgrounds
  const homeTheme = getTeamTheme(nextMatch.homeTeam.name).split(' ')[1].replace('to-', 'bg-');
  const awayTheme = getTeamTheme(nextMatch.awayTeam.name).split(' ')[1].replace('to-', 'bg-');

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl mb-12 group">
      {/* Background Glows */}
      <div className={`absolute -left-20 -top-20 w-96 h-96 ${homeTheme} opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity duration-700`} />
      <div className={`absolute -right-20 -bottom-20 w-96 h-96 ${awayTheme} opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity duration-700`} />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
        
        {/* MATCHUP GRAPHIC */}
        <div className="flex items-center gap-8 md:gap-16 w-full justify-center lg:justify-start">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-3 w-32">
                <img src={nextMatch.homeTeam.crest} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-white text-center leading-none">{nextMatch.homeTeam.tla}</h2>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
                <span className="text-6xl md:text-8xl font-black text-white/10 italic select-none">VS</span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-3 w-32">
                <img src={nextMatch.awayTeam.crest} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-white text-center leading-none">{nextMatch.awayTeam.tla}</h2>
            </div>
        </div>

        {/* TIMER SECTION */}
        <div className="mt-8 lg:mt-0 lg:pl-12 lg:border-l border-white/5 flex flex-col items-center lg:items-end w-full lg:w-auto">
            <div className="text-[#00ff85] font-bold tracking-[0.2em] text-xs uppercase mb-3">Next Kickoff</div>
            
            <div className="flex gap-2">
                <TimeBox val={timeLeft.d} label="DAYS" />
                <TimeBox val={timeLeft.h} label="HRS" />
                <TimeBox val={timeLeft.m} label="MIN" />
                <TimeBox val={timeLeft.s} label="SEC" highlight />
            </div>

            <div className="mt-4 flex items-center gap-2 text-neutral-500 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                {new Date(nextMatch.utcDate).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
        </div>
      </div>
    </div>
  );
}

const TimeBox = ({ val, label, highlight }: any) => (
    <div className={`flex flex-col items-center justify-center w-14 h-16 md:w-16 md:h-20 bg-neutral-800/50 backdrop-blur-sm rounded border ${highlight ? 'border-[#00ff85]/30' : 'border-white/5'}`}>
        <span className={`text-2xl md:text-3xl font-bold font-mono ${highlight ? 'text-[#00ff85]' : 'text-white'}`}>{val}</span>
        <span className="text-[9px] text-neutral-500 font-bold mt-1">{label}</span>
    </div>
);