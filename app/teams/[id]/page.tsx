import { getTeamDetails, getTopScorers } from "@/utils/api";
import { getTeamTheme } from "@/utils/teamColors";
import Link from "next/link";
import { ArrowLeft, MapPin, User, Shield, Zap, AlertCircle } from "lucide-react";

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
      <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Could not load team data</h1>
        <p className="text-neutral-500 mb-6">{error}</p>
        <Link href="/" className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-neutral-200">Return</Link>
      </main>
    );
  }

  // Use the theme for the gradient
  const teamGradient = getTeamTheme(team.name);

  return (
    <main className="min-h-screen bg-neutral-950 text-white pb-20 font-sans">
      
      {/* HEADER SECTION */}
      <div className={`relative h-[400px] w-full overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${teamGradient} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link href="/" className="absolute top-8 left-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} /> <span className="text-sm font-bold uppercase tracking-widest">Dashboard</span>
          </Link>
          
          <div className="flex items-end gap-6">
            <img src={team.crest} alt={team.name} className="w-32 h-32 object-contain drop-shadow-2xl" />
            <div className="mb-2">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                    {team.name}
                </h1>
                <div className="flex gap-6 mt-4 text-sm font-medium text-neutral-300">
                    <span className="flex items-center gap-2"><MapPin size={16} /> {team.venue}</span>
                    {team.coach?.name && <span className="flex items-center gap-2"><User size={16} /> {team.coach.name}</span>}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* SQUAD GRID */}
      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <SquadSection title="Attackers" players={squad.Offence} icon={<Zap />} color="border-red-500/50" textColor="text-red-500" stats={statsMap} />
        <SquadSection title="Midfielders" players={squad.Midfield} icon={<User />} color="border-emerald-500/50" textColor="text-emerald-500" stats={statsMap} />
        <SquadSection title="Defenders" players={squad.Defence} icon={<Shield />} color="border-blue-500/50" textColor="text-blue-500" stats={statsMap} />
        <SquadSection title="Goalkeepers" players={squad.Goalkeeper} icon={<Shield />} color="border-yellow-500/50" textColor="text-yellow-500" stats={statsMap} />
      </div>
    </main>
  );
}

// THE FIFA CARD COMPONENT
function PlayerCard({ player, color, textColor, goals }: any) {
    return (
        <div className="group relative overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
            {/* Colored Top Bar */}
            <div className={`h-1.5 w-full bg-neutral-800 group-hover:${textColor.replace('text-', 'bg-')} transition-colors duration-300`} />
            
            <div className="p-6 flex flex-col h-full justify-between">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${textColor}`}>{player.position}</span>
                        {player.nationality && <span className="text-[10px] font-bold text-neutral-500">{player.nationality.substring(0,3).toUpperCase()}</span>}
                    </div>
                    
                    {/* Name & Number */}
                    <div className="flex justify-between items-end mt-2">
                        <h3 className="text-xl font-black text-white uppercase leading-tight tracking-tight max-w-[70%]">
                            {player.name}
                        </h3>
                        <span className="text-4xl font-black text-neutral-800 group-hover:text-neutral-700 transition-colors font-mono leading-none">
                            {player.shirtNumber || '-'}
                        </span>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5">
                    <div>
                        <span className="block text-[9px] text-neutral-600 font-bold uppercase">Age</span>
                        <span className="font-mono text-neutral-300">{player.dateOfBirth ? 2026 - new Date(player.dateOfBirth).getFullYear() : 'N/A'}</span>
                    </div>
                    {goals !== undefined && (
                        <div className="text-right">
                             <span className="block text-[9px] text-emerald-500 font-bold uppercase">Goals</span>
                             <span className="font-mono text-white text-lg font-bold">{goals}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function SquadSection({ title, players, icon, color, textColor, stats }: any) {
  if (!players || players.length === 0) return null;
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
        <h3 className="text-4xl font-black text-white uppercase tracking-tighter opacity-10">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map((player: any) => (
            <PlayerCard 
                key={player.id} 
                player={player} 
                color={color} 
                textColor={textColor}
                goals={stats[player.id]} 
            />
        ))}
      </div>
    </div>
  );
}