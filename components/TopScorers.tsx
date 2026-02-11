'use client';

import { motion } from 'framer-motion';

export default function TopScorers({ scorers }: { scorers: any[] }) {
  // Top 5 only
  const top5 = scorers.slice(0, 5);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <h2 className="mb-4 text-xl font-bold text-[#00ff85]">Golden Boot Race</h2>
      
      <div className="space-y-4">
        {top5.map((player, i) => (
          <motion.div 
            key={player.player.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div className={`
                flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black
                ${i === 0 ? 'bg-yellow-400' : 'bg-slate-700 text-white'}
              `}>
                {i + 1}
              </div>
              
              {/* Player Info */}
              <div>
                <p className="text-sm font-bold text-white">{player.player.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <img src={player.team.crest} alt="Team" className="h-3 w-3" />
                  {player.team.name}
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="text-lg font-bold text-[#00ff85]">
              {player.goals}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}