'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlowCard, AnimatedCounter } from './AnimatedLayout';

export default function TopScorers({ scorers }: { scorers: any[] }) {
  const top5 = scorers.slice(0, 5);
  const maxGoals = top5[0]?.goals || 1;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <GlowCard className="rounded-[28px] p-6 relative overflow-hidden" glowColor="gold">
      {/* Golden glow accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/8 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="space-y-2 relative z-10" ref={ref}>
        {top5.map((player, i) => {
          const barWidth = (player.goals / maxGoals) * 100;
          const isFirst = i === 0;

          return (
            <motion.div
              key={player.player.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`group relative rounded-xl p-3.5 transition-all duration-300 hover:bg-white/[0.04] ${isFirst ? 'bg-white/[0.03]' : ''}`}
            >
              {/* Background goal bar */}
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-xl ${isFirst ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : 'bg-gradient-to-r from-white/[0.02] to-transparent'}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${barWidth}%` } : {}}
                transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
              />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black shrink-0 transition-all duration-300
                    ${isFirst
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-black shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                      : i === 1
                        ? 'bg-white/10 text-white/70 border border-white/10'
                        : i === 2
                          ? 'bg-white/[0.06] text-white/50 border border-white/[0.06]'
                          : 'text-white/30'
                    }
                  `}>
                    {isFirst ? '👑' : i + 1}
                  </div>

                  {/* Player Info */}
                  <div className="min-w-0">
                    <p className={`text-sm font-bold truncate transition-colors ${isFirst ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {player.player.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <img src={player.team.crest} alt="Team" className="h-3.5 w-3.5 object-contain" />
                      <span className="text-[10px] text-white/30 font-medium truncate">{player.team.name}</span>
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className={`text-right shrink-0 ml-3 ${isFirst ? '' : ''}`}>
                  <span className={`text-xl font-black tabular-nums ${isFirst ? 'gradient-text-gold' : 'text-white/70'}`}>
                    <AnimatedCounter value={player.goals} duration={1.5} />
                  </span>
                  <span className="block text-[8px] font-bold text-white/20 uppercase tracking-wider">goals</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlowCard>
  );
}