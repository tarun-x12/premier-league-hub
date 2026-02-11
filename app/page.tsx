import { getStandings, getMatches, getTopScorers } from "@/utils/api";
import StandingsTable from "@/components/StandingsTable";
import NextMatchTimer from "@/components/NextMatchTimer";
import MatchList from "@/components/MatchList"; // Assuming you have this
import TopScorers from "@/components/TopScorers"; // Assuming you have this

export default async function Home() {
  const [standings, matches, scorers] = await Promise.all([
    getStandings(),
    getMatches(),
    getTopScorers()
  ]);

  return (
    // THEME: "Neutral-950" is the new professional dark. No more "Slate" or "Purple".
    <main className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-white selection:text-black">
      
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Minimalist Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Premier League
            </h1>
            <p className="text-neutral-500 text-sm mt-1">Season 2025/26 Data Hub</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE UPDATES
          </div>
        </header>

        {/* Feature Block: Next Match */}
        <section className="mb-12">
            <NextMatchTimer matches={matches} />
        </section>

        {/* The Grid: Data First */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content: Table (8 cols) */}
          <div className="lg:col-span-8">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">League Standings</h3>
            <StandingsTable data={standings} />
          </div>

          {/* Sidebar: Context (4 cols) */}
          <div className="lg:col-span-4 space-y-10">
            <div>
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Fixtures</h3>
                <MatchList matches={matches} />
            </div>
            <div>
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Top Scorers</h3>
                <TopScorers scorers={scorers} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}