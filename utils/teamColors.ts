// utils/teamColors.ts

export const TEAM_THEMES: Record<string, string> = {
  'Arsenal FC': 'from-red-600 to-red-900',
  'Aston Villa FC': 'from-rose-800 to-sky-900',
  'AFC Bournemouth': 'from-red-600 to-slate-900',
  'Brentford FC': 'from-red-500 to-orange-700',
  'Brighton & Hove Albion FC': 'from-cyan-500 to-blue-600',
  'Chelsea FC': 'from-blue-600 to-blue-900',
  'Crystal Palace FC': 'from-blue-700 to-red-700',
  'Everton FC': 'from-blue-700 to-slate-900',
  'Fulham FC': 'from-slate-500 to-slate-900',
  'Ipswich Town FC': 'from-blue-600 to-blue-800',
  'Leicester City FC': 'from-blue-500 to-blue-700',
  'Liverpool FC': 'from-red-700 to-red-950',
  'Manchester City FC': 'from-sky-400 to-sky-700',
  'Manchester United FC': 'from-red-700 to-black',
  'Newcastle United FC': 'from-slate-700 to-black',
  'Nottingham Forest FC': 'from-red-500 to-red-800',
  'Southampton FC': 'from-red-500 to-red-700',
  'Tottenham Hotspur FC': 'from-slate-700 to-slate-900',
  'West Ham United FC': 'from-rose-800 to-sky-900',
  'Wolverhampton Wanderers FC': 'from-amber-500 to-amber-700',
};

// Returns the hover style for the standings table
export const getTeamHoverColor = (teamName: string) => {
  if (teamName.includes('Arsenal')) return 'hover:shadow-[inset_4px_0_0_#ef4444] hover:bg-red-500/10';
  if (teamName.includes('City')) return 'hover:shadow-[inset_4px_0_0_#38bdf8] hover:bg-sky-500/10';
  if (teamName.includes('Liverpool')) return 'hover:shadow-[inset_4px_0_0_#dc2626] hover:bg-red-600/10';
  if (teamName.includes('Chelsea')) return 'hover:shadow-[inset_4px_0_0_#2563eb] hover:bg-blue-600/10';
  if (teamName.includes('United') && teamName.includes('Manchester')) return 'hover:shadow-[inset_4px_0_0_#b91c1c] hover:bg-red-700/10';
  if (teamName.includes('Villa')) return 'hover:shadow-[inset_4px_0_0_#9f1239] hover:bg-rose-900/10';
  if (teamName.includes('Tottenham')) return 'hover:shadow-[inset_4px_0_0_#f8fafc] hover:bg-white/5';
  
  // Default fallback
  return 'hover:shadow-[inset_4px_0_0_#ffffff] hover:bg-white/5';
};

export const getTeamTheme = (teamName: string) => {
  return TEAM_THEMES[teamName] || 'from-neutral-800 to-neutral-950';
};