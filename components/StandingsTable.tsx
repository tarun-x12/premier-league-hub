'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StandingsTable({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 text-xs font-bold text-white/40 uppercase tracking-widest">
        <div className="col-span-1 text-center">Pos</div>
        <div className="col-span-5 md:col-span-4">Club</div>
        <div className="col-span-1 text-center">MP</div>
        <div className="col-span-1 text-center hidden md:block">W</div>
        <div className="col-span-1 text-center hidden md:block">D</div>
        <div className="col-span-1 text-center hidden md:block">L</div>
        <div className="col-span-1 text-center">GD</div>
        <div className="col-span-2 text-center text-white">Pts</div>
      </div>

      <div className="flex flex-col">
        {data.map((row, index) => {
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
                className="group grid grid-cols-12 items-center px-6 py-4 transition-colors duration-200 cursor-pointer hover:bg-white/5 border-b border-white/5 last:border-0"
              >
                {/* 1. Rank */}
                <div className="col-span-1 flex justify-center">
                    <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold
                        ${row.position <= 4 ? 'text-blue-400 bg-blue-500/10' : 
                          row.position >= 18 ? 'text-red-400 bg-red-500/10' : 'text-white/40'}
                    `}>
                        {row.position}
                    </span>
                </div>

                {/* 2. Team Name */}
                <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                  <img 
                    src={row.team.crest} 
                    alt={row.team.name} 
                    className="h-8 w-8 object-contain drop-shadow-lg grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                  />
                  <span className="font-semibold text-white/80 group-hover:text-white text-sm tracking-tight transition-colors">
                    {row.team.name}
                  </span>
                </div>

                {/* 3. Stats Grid */}
                <div className="col-span-1 text-center text-white/60 font-mono text-sm">{row.playedGames}</div>
                <div className="col-span-1 text-center text-white/60 font-mono text-sm hidden md:block">{row.won}</div>
                <div className="col-span-1 text-center text-white/60 font-mono text-sm hidden md:block">{row.draw}</div>
                <div className="col-span-1 text-center text-white/60 font-mono text-sm hidden md:block">{row.lost}</div>
                
                <div className="col-span-1 text-center font-mono text-sm font-bold">
                    <span className={row.goalDifference > 0 ? 'text-emerald-400' : row.goalDifference < 0 ? 'text-red-400' : 'text-white/40'}>
                        {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
                    </span>
                </div>

                {/* 4. Points */}
                <div className="col-span-2 flex flex-col items-center justify-center">
                    <span className="text-white font-bold text-lg leading-none">{row.points}</span>
                    <div className="w-12 h-0.5 bg-white/10 mt-1 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${winRate}%` }} />
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