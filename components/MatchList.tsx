'use client';

import { motion } from 'framer-motion';

// Helper to format date (e.g., "Sat, 12:30 PM")
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function MatchList({ matches }: { matches: any[] }) {
  // Take only the first 5 matches to keep it clean
  const nextMatches = matches.slice(0, 5);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <h2 className="mb-4 text-xl font-bold text-[#00ff85]">Upcoming Fixtures</h2>
      
      <div className="space-y-3">
        {nextMatches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between rounded-lg bg-black/20 p-3 hover:bg-white/5 transition-colors"
          >
            {/* Home Team */}
            <div className="flex flex-col items-center w-1/3">
              <img 
                src={match.homeTeam.crest} 
                alt={match.homeTeam.name} 
                className="h-8 w-8 object-contain mb-1"
              />
              <span className="text-xs text-center text-slate-300 truncate w-full">
                {match.homeTeam.tla}
              </span>
            </div>

            {/* VS / Time */}
            <div className="flex flex-col items-center w-1/3">
              <span className="text-xs font-bold text-slate-500">VS</span>
              <div className="mt-1 rounded px-2 py-0.5 text-[10px] font-bold bg-[#38003c] text-white">
                {formatDate(match.utcDate)}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center w-1/3">
              <img 
                src={match.awayTeam.crest} 
                alt={match.awayTeam.name} 
                className="h-8 w-8 object-contain mb-1"
              />
              <span className="text-xs text-center text-slate-300 truncate w-full">
                {match.awayTeam.tla}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}