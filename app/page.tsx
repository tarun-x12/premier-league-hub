import { getStandings, getMatches, getTopScorers } from "@/utils/api";
import StandingsTable from "@/components/StandingsTable";
import NextMatchTimer from "@/components/NextMatchTimer";
import TopScorers from "@/components/TopScorers";
import MatchList from "@/components/MatchList";

export default async function Home() {
  const [standings, matches, scorers] = await Promise.all([
    getStandings(),
    getMatches(),
    getTopScorers()
  ]);

  return (
    <main className="min-h-screen relative selection:bg-blue-500 selection:text-white pb-20">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="aurora-container">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>
      <div className="bg-noise" />

      {/* --- FLOATING NAV --- */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="glass-card rounded-full px-6 py-3 flex items-center gap-6 pointer-events-auto border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
          <span className="font-bold text-white tracking-tight">Premier Hub</span>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <div className="flex gap-6 text-sm font-medium text-white/70">
            <span className="hover:text-white transition-colors cursor-pointer">Matches</span>
            <span className="hover:text-white transition-colors cursor-pointer">Table</span>
            <span className="hover:text-white transition-colors cursor-pointer">Stats</span>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 pt-32 max-w-[1200px] relative z-10">
        
        {/* HERO */}
        <div className="mb-20 text-center">
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-6 drop-shadow-2xl">
              Matchday <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Center</span>.
            </h1>
            <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
              Live coverage, real-time stats, and the pulse of the Premier League season.
            </p>
        </div>

        {/* COUNTDOWN WIDGET */}
        <section className="mb-24">
            <NextMatchTimer matches={matches} />
        </section>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Table */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-semibold tracking-tight text-white">Standings</h3>
                <span className="text-sm font-medium text-blue-400 cursor-pointer hover:text-blue-300">View Full Table ›</span>
            </div>
            <div className="glass-card rounded-[32px] overflow-hidden p-1">
                <StandingsTable data={standings} />
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-8">
            {/* Top Scorers */}
            <div>
                <h3 className="text-xl font-semibold tracking-tight text-white mb-6 px-2">Golden Boot</h3>
                <div className="glass-card rounded-[32px] p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-yellow-500/30 transition-colors duration-500" />
                    <TopScorers scorers={scorers} />
                </div>
            </div>

            {/* Fixtures */}
            <div>
                <h3 className="text-xl font-semibold tracking-tight text-white mb-6 px-2">Up Next</h3>
                <div className="glass-card rounded-[32px] p-6">
                    <MatchList matches={matches} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}