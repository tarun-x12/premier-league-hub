'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function StandingsTable({ data }: { data: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="w-full" ref={ref}>
      {/* Header */}
      <div className="grid grid-cols-12 px-6 py-4 border-b border-white/[0.04] text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5 md:col-span-4">Club</div>
        <div className="col-span-1 text-center">MP</div>
        <div className="col-span-1 text-center hidden md:block">W</div>
        <div className="col-span-1 text-center hidden md:block">D</div>
        <div className="col-span-1 text-center hidden md:block">L</div>
        <div className="col-span-1 text-center">GD</div>
        <div className="col-span-2 text-center text-white/50">Pts</div>
      </div>

      <div className="flex flex-col">
        {data.map((row, index) => {
          const winRate = Math.round((row.won / row.playedGames) * 100) || 0;
          const isChampionsLeague = row.position <= 4;
          const isRelegation = row.position >= 18;

          return (
            <motion.div
              key={row.team.id}
              initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{
                delay: index * 0.04,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href={`/teams/${row.team.id}`}
                className="group grid grid-cols-12 items-center px-6 py-3.5 transition-all duration-300 cursor-pointer border-b border-white/[0.03] last:border-0 hover:bg-white/[0.03] relative"
              >
                {/* Hover glow bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full" />

                {/* 1. Position Badge */}
                <div className="col-span-1 flex justify-center">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-black transition-all duration-300
                    ${isChampionsLeague
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : isRelegation
                        ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                        : 'text-white/30 bg-white/[0.03] border border-white/[0.04]'}
                  `}>
                    {row.position}
                  </span>
                </div>

                {/* 2. Team */}
                <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                  <motion.img
                    src={row.team.crest}
                    alt={row.team.name}
                    className="h-7 w-7 object-contain drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="font-semibold text-white/70 group-hover:text-white text-sm tracking-tight transition-colors duration-300">
                    {row.team.name}
                  </span>
                </div>

                {/* 3. Stats */}
                <div className="col-span-1 text-center text-white/40 font-mono text-sm">{row.playedGames}</div>
                <div className="col-span-1 text-center text-white/40 font-mono text-sm hidden md:block">{row.won}</div>
                <div className="col-span-1 text-center text-white/40 font-mono text-sm hidden md:block">{row.draw}</div>
                <div className="col-span-1 text-center text-white/40 font-mono text-sm hidden md:block">{row.lost}</div>

                <div className="col-span-1 text-center font-mono text-sm font-bold">
                  <span className={
                    row.goalDifference > 0 ? 'text-emerald-400' :
                      row.goalDifference < 0 ? 'text-rose-400' : 'text-white/30'
                  }>
                    {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
                  </span>
                </div>

                {/* 4. Points with animated bar */}
                <div className="col-span-2 flex flex-col items-center justify-center gap-1.5">
                  <span className={`font-black text-lg leading-none tabular-nums ${isChampionsLeague ? 'text-white' : 'text-white/80'}`}>
                    {row.points}
                  </span>
                  <div className="w-14 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isChampionsLeague ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-white/20'}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${winRate}%` } : {}}
                      transition={{ delay: index * 0.04 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}