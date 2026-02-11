'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getTeamHoverColor } from '@/utils/teamColors';

export default function StandingsTable({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-12 px-4 py-3 border-b border-white/10 text-xs font-bold text-neutral-500 uppercase tracking-widest">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5 md:col-span-4 pl-2">Club</div>
        <div className="col-span-1 text-center">MP</div>
        <div className="col-span-1 text-center hidden md:block">W</div>
        <div className="col-span-1 text-center hidden md:block">D</div>
        <div className="col-span-1 text-center hidden md:block">L</div>
        <div className="col-span-1 text-center">GD</div>
        <div className="col-span-2 text-center text-white">Pts</div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {data.map((row, index) => {
          // Dynamic Hover Color
          const hoverStyle = getTeamHoverColor(row.team.name);
          
          // Win Rate Calculation for Mini-Bar
          const winRate = Math.round((row.won / row.playedGames) * 100) || 0;

          return (
            <motion.div
              key={row.team.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link 
                href={`/teams/${row.team.id}`}
                className={`group grid grid-cols-12 items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${hoverStyle} border border-transparent hover:border-white/5`}
              >
                {/* 1. Rank */}
                <div className="col-span-1 flex justify-center">
                    <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold
                        ${row.position <= 4 ? 'text-[#00ff85] bg-[#00ff85]/10' : 
                          row.position >= 18 ? 'text-red-500 bg-red-500/10' : 'text-neutral-500'}
                    `}>
                        {row.position}
                    </span>
                </div>

                {/* 2. Team Name */}
                <div className="col-span-5 md:col-span-4 flex items-center gap-4 pl-2">
                  <img 
                    src={row.team.crest} 
                    alt={row.team.name} 
                    className="h-8 w-8 object-contain drop-shadow-lg grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                  />
                  <div className="flex flex-col">
                     <span className="font-bold text-neutral-300 group-hover:text-white text-sm tracking-tight transition-colors">
                        {row.team.name}
                     </span>
                  </div>
                </div>

                {/* 3. Stats Grid */}
                <div className="col-span-1 text-center text-neutral-500 font-mono text-sm">{row.playedGames}</div>
                <div className="col-span-1 text-center text-neutral-500 font-mono text-sm hidden md:block">{row.won}</div>
                <div className="col-span-1 text-center text-neutral-500 font-mono text-sm hidden md:block">{row.draw}</div>
                <div className="col-span-1 text-center text-neutral-500 font-mono text-sm hidden md:block">{row.lost}</div>
                
                <div className="col-span-1 text-center font-mono text-sm font-bold">
                    <span className={row.goalDifference > 0 ? 'text-emerald-500' : row.goalDifference < 0 ? 'text-red-500' : 'text-neutral-500'}>
                        {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
                    </span>
                </div>

                {/* 4. Points & Win Bar */}
                <div className="col-span-2 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-lg leading-none">{row.points}</span>
                    {/* Tiny Win Rate Line */}
                    <div className="w-12 h-0.5 bg-neutral-800 mt-1 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00ff85]" style={{ width: `${winRate}%` }} />
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