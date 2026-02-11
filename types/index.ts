// types/index.ts

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string; // e.g., "W,L,W,D,W"
}

export interface Scorer {
  player: {
    id: number;
    name: string;
    section: string;
  };
  team: Team;
  goals: number;
  assists: number; // API might return null sometimes
}