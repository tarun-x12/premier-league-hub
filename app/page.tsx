import { getStandings, getMatches, getTopScorers } from "@/utils/api";
import StandingsTable from "@/components/StandingsTable";
import NextMatchTimer from "@/components/NextMatchTimer";
import TopScorers from "@/components/TopScorers";
import MatchList from "@/components/MatchList";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const [standings, matches, scorers] = await Promise.all([
    getStandings(),
    getMatches(),
    getTopScorers()
  ]);

  return (
    <HomeClient>
      <main className="min-h-screen relative selection:bg-cyan-500/30 selection:text-white pb-20">

        {/* ═══ BACKGROUND LAYERS ═══ */}
        <div className="aurora-container">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
          <div className="aurora-blob aurora-3" />
          <div className="aurora-blob aurora-4" />
        </div>
        <div className="bg-noise" />
        <div className="particle-grid" />

        {/* ═══ FLOATING NAV ═══ */}
        <nav className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
          <div className="glass-card rounded-full px-8 py-3.5 flex items-center gap-8 pointer-events-auto border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl hover:border-white/20 transition-all duration-500 group">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
              <span className="font-bold text-white tracking-tight text-sm">PREMIER HUB</span>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Nav Links */}
            <div className="flex gap-8 text-xs font-semibold tracking-wider uppercase text-white/50">
              <a href="#countdown" className="hover:text-cyan-400 transition-all duration-300 hover:text-glow-cyan cursor-pointer relative group/link">
                Live
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
              </a>
              <a href="#standings" className="hover:text-cyan-400 transition-all duration-300 cursor-pointer relative group/link">
                Table
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
              </a>
              <a href="#scorers" className="hover:text-cyan-400 transition-all duration-300 cursor-pointer relative group/link">
                Stats
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
              </a>
              <a href="#fixtures" className="hover:text-cyan-400 transition-all duration-300 cursor-pointer relative group/link">
                Fixtures
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
        </nav>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="container mx-auto px-6 pt-36 max-w-[1200px] relative z-10">

          {/* ═══ HERO ═══ */}
          <div className="mb-28 text-center relative">
            {/* Decorative glow behind hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Season 2025/26 • Live</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black tracking-[-0.04em] text-white mb-6 leading-[0.9]">
              <span className="block">Match</span>
              <span className="block gradient-text">Center.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/40 font-medium max-w-xl mx-auto leading-relaxed tracking-tight">
              Real-time standings, live countdown, and the pulse of every Premier League matchday.
            </p>

            {/* Scroll indicator */}
            <div className="mt-16 flex flex-col items-center gap-2 opacity-30">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
            </div>
          </div>

          {/* ═══ COUNTDOWN WIDGET ═══ */}
          <section id="countdown" className="mb-28 scroll-mt-24">
            <NextMatchTimer matches={matches} />
          </section>

          {/* ═══ GLOW DIVIDER ═══ */}
          <hr className="divider-glow mb-28" />

          {/* ═══ BENTO GRID ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ═══ STANDINGS ═══ */}
            <div id="standings" className="lg:col-span-8 space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600" />
                  <h3 className="text-2xl font-bold tracking-tight text-white">Standings</h3>
                </div>
                <span className="text-xs font-bold text-cyan-400/70 cursor-pointer hover:text-cyan-400 transition-colors uppercase tracking-wider">View Full Table ›</span>
              </div>
              <div className="glass-card rounded-[28px] overflow-hidden border border-white/[0.06]">
                <StandingsTable data={standings} />
              </div>
            </div>

            {/* ═══ SIDEBAR ═══ */}
            <div className="lg:col-span-4 space-y-10">

              {/* Top Scorers */}
              <div id="scorers" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-yellow-400 to-amber-600" />
                  <h3 className="text-xl font-bold tracking-tight text-white">Golden Boot</h3>
                </div>
                <TopScorers scorers={scorers} />
              </div>

              {/* Fixtures */}
              <div id="fixtures" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600" />
                  <h3 className="text-xl font-bold tracking-tight text-white">Up Next</h3>
                </div>
                <MatchList matches={matches} />
              </div>
            </div>
          </div>

          {/* ═══ FOOTER ═══ */}
          <footer className="mt-32 pb-8 text-center">
            <hr className="divider-glow mb-8" />
            <p className="text-[11px] text-white/20 font-medium tracking-wider uppercase">
              Premier Hub • Data by Football-Data.org • Built with Next.js
            </p>
          </footer>
        </div>
      </main>
    </HomeClient>
  );
}