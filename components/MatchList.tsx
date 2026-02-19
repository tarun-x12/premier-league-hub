'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlowCard } from './AnimatedLayout';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatDay = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
};

export default function MatchList({ matches }: { matches: any[] }) {
  const nextMatches = matches.slice(0, 5);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <GlowCard className="rounded-[28px] p-6 relative overflow-hidden" glowColor="purple">
      {/* Purple glow accent */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/8 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10" ref={ref}>
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent" />

          <div className="space-y-3">
            {nextMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-1/2 -translate-y-1/2 z-10">
                  <div className="w-[9px] h-[9px] rounded-full bg-white/20 border-2 border-white/10 group-hover:bg-purple-400 group-hover:border-purple-400/50 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </div>

                {/* Match Card */}
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5 hover:bg-white/[0.05] hover:border-white/[0.08] transition-all duration-300 group-hover:translate-x-1">
                  <div className="flex items-center justify-between">
                    {/* Home Team */}
                    <div className="flex items-center gap-2.5 w-[35%]">
                      <motion.img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        className="h-7 w-7 object-contain shrink-0"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-xs font-bold text-white/70 group-hover:text-white truncate transition-colors">
                        {match.homeTeam.tla}
                      </span>
                    </div>

                    {/* VS & Time */}
                    <div className="flex flex-col items-center w-[30%]">
                      <span className="text-[9px] font-black text-white/20 tracking-widest">VS</span>
                      <div className="mt-1 rounded-md px-2.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/10">
                        {formatDate(match.utcDate)}
                      </div>
                      <span className="text-[8px] text-white/20 mt-0.5 font-medium">{formatDay(match.utcDate)}</span>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-2.5 w-[35%] justify-end">
                      <span className="text-xs font-bold text-white/70 group-hover:text-white truncate transition-colors text-right">
                        {match.awayTeam.tla}
                      </span>
                      <motion.img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        className="h-7 w-7 object-contain shrink-0"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}