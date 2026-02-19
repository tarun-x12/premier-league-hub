import { getTeamDetails, getTopScorers } from "@/utils/api";
import { getTeamTheme } from "@/utils/teamColors";
import Link from "next/link";
import { ArrowLeft, MapPin, User, Shield, Zap, AlertCircle, Calendar } from "lucide-react";
import TeamPageClient from "@/components/TeamPageClient";

const groupPlayers = (squad: any[]) => {
  if (!squad) return { Goalkeeper: [], Defence: [], Midfield: [], Offence: [], Unknown: [] };

  return {
    Goalkeeper: squad.filter(p => p.position === "Goalkeeper"),
    Defence: squad.filter(p => ["Defence", "Defender", "Centre-Back", "Left-Back", "Right-Back"].includes(p.position)),
    Midfield: squad.filter(p => ["Midfield", "Midfielder", "Defensive Midfield", "Attacking Midfield"].includes(p.position)),
    Offence: squad.filter(p => ["Offence", "Forward", "Centre-Forward", "Right Winger", "Left Winger"].includes(p.position)),
    Unknown: squad.filter(p => !p.position)
  };
};

export default async function TeamPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const teamId = params.id;

  let team;
  let squad: any = { Goalkeeper: [], Defence: [], Midfield: [], Offence: [], Unknown: [] };
  let statsMap: Record<number, number> = {};
  let error = null;

  try {
    const [teamData, scorersData] = await Promise.all([
      getTeamDetails(teamId),
      getTopScorers()
    ]);

    team = teamData;
    squad = groupPlayers(team.squad);
    scorersData.forEach((scorer: any) => {
      statsMap[scorer.player.id] = scorer.goals;
    });

  } catch (err: any) {
    error = err.message || "An unexpected error occurred.";
  }

  if (error || !team) {
    return (
      <main className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <AlertCircle size={48} className="text-rose-500 mb-6 mx-auto" />
          <h1 className="text-2xl font-bold mb-3">Could not load team data</h1>
          <p className="text-white/40 mb-8 text-sm">{error}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors text-sm">
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const teamGradient = getTeamTheme(team.name);

  return (
    <TeamPageClient>
      <main className="min-h-screen bg-[#030305] text-white pb-20 font-sans relative overflow-hidden">

        {/* Background aurora */}
        <div className="aurora-container">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
        </div>
        <div className="bg-noise" />

        {/* ═══ CINEMATIC HEADER ═══ */}
        <div className="relative h-[450px] w-full overflow-hidden">
          {/* Team gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b ${teamGradient} opacity-50`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent" />

          {/* Animated mesh overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="particle-grid" style={{ position: 'absolute', opacity: 0.5 }} />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-14 max-w-7xl">
            {/* Back button */}
            <Link
              href="/"
              className="absolute top-8 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                <ArrowLeft size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
            </Link>

            {/* Team info */}
            <div className="flex items-end gap-8">
              <div className="relative shrink-0">
                {/* Crest glow */}
                <div className="absolute inset-[-20px] bg-white/10 blur-[40px] rounded-full" />
                <img
                  src={team.crest}
                  alt={team.name}
                  className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              <div className="mb-2 space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em] text-white leading-[0.95]">
                  {team.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-white/50">
                  {team.venue && (
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/[0.06]">
                      <MapPin size={14} className="text-white/30" /> {team.venue}
                    </span>
                  )}
                  {team.coach?.name && (
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/[0.06]">
                      <User size={14} className="text-white/30" /> {team.coach.name}
                    </span>
                  )}
                  {team.founded && (
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/[0.06]">
                      <Calendar size={14} className="text-white/30" /> Est. {team.founded}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SQUAD GRID ═══ */}
        <div className="container mx-auto px-6 max-w-7xl mt-16 relative z-10">
          <SquadSection title="Attackers" players={squad.Offence} icon={<Zap size={20} />} accentColor="rose" textColor="text-rose-400" stats={statsMap} />
          <SquadSection title="Midfielders" players={squad.Midfield} icon={<User size={20} />} accentColor="emerald" textColor="text-emerald-400" stats={statsMap} />
          <SquadSection title="Defenders" players={squad.Defence} icon={<Shield size={20} />} accentColor="cyan" textColor="text-cyan-400" stats={statsMap} />
          <SquadSection title="Goalkeepers" players={squad.Goalkeeper} icon={<Shield size={20} />} accentColor="amber" textColor="text-amber-400" stats={statsMap} />
        </div>

        {/* Footer */}
        <div className="container mx-auto px-6 max-w-7xl mt-20 relative z-10">
          <hr className="divider-glow mb-8" />
          <p className="text-[11px] text-white/15 font-medium text-center tracking-wider uppercase">
            Premier Hub • Squad Data via Football-Data.org
          </p>
        </div>
      </main>
    </TeamPageClient>
  );
}

// ═══ PLAYER CARD ═══
function PlayerCard({ player, textColor, accentColor, goals }: any) {
  const accentColors: Record<string, string> = {
    rose: 'from-rose-500 to-rose-700',
    emerald: 'from-emerald-500 to-emerald-700',
    cyan: 'from-cyan-400 to-blue-600',
    amber: 'from-amber-400 to-yellow-600',
  };

  const accentBg: Record<string, string> = {
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] h-full flex flex-col tilt-card">
      {/* Colored accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${accentColors[accentColor] || accentColors.cyan} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Hover glow */}
      <div className={`absolute top-0 left-0 right-0 h-20 ${accentBg[accentColor] || 'bg-cyan-500'} opacity-0 group-hover:opacity-[0.04] blur-[30px] transition-opacity duration-500`} />

      <div className="p-5 flex flex-col h-full justify-between relative z-10">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${textColor} opacity-70`}>
              {player.position || 'Player'}
            </span>
            {player.nationality && (
              <span className="text-[9px] font-bold text-white/25 bg-white/[0.04] px-2 py-0.5 rounded">
                {player.nationality.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name & Number */}
          <div className="flex justify-between items-end mt-3">
            <h3 className="text-lg font-black text-white/90 uppercase leading-tight tracking-tight max-w-[65%] group-hover:text-white transition-colors">
              {player.name}
            </h3>
            <span className="text-4xl font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors font-mono leading-none">
              {player.shirtNumber || '-'}
            </span>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/[0.04]">
          <div>
            <span className="block text-[8px] text-white/25 font-bold uppercase tracking-wider">Age</span>
            <span className="font-mono text-white/60 text-sm">
              {player.dateOfBirth ? 2026 - new Date(player.dateOfBirth).getFullYear() : 'N/A'}
            </span>
          </div>
          {goals !== undefined && (
            <div className="text-right">
              <span className="block text-[8px] text-emerald-400/70 font-bold uppercase tracking-wider">Goals</span>
              <span className="font-mono text-white text-lg font-black">{goals}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ SQUAD SECTION ═══
function SquadSection({ title, players, icon, accentColor, textColor, stats }: any) {
  if (!players || players.length === 0) return null;

  const accentLine: Record<string, string> = {
    rose: 'from-rose-500 to-rose-700',
    emerald: 'from-emerald-500 to-emerald-700',
    cyan: 'from-cyan-400 to-blue-600',
    amber: 'from-amber-400 to-yellow-600',
  };

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8 border-b border-white/[0.04] pb-5">
        <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${accentLine[accentColor] || accentLine.cyan}`} />
        <div className="flex items-center gap-3">
          <span className={`${textColor} opacity-50`}>{icon}</span>
          <h3 className="text-3xl font-black text-white/90 uppercase tracking-tight">{title}</h3>
        </div>
        <span className="text-xs font-bold text-white/15 ml-auto">{players.length} PLAYERS</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {players.map((player: any) => (
          <PlayerCard
            key={player.id}
            player={player}
            textColor={textColor}
            accentColor={accentColor}
            goals={stats[player.id]}
          />
        ))}
      </div>
    </div>
  );
}