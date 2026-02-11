// utils/api.ts

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4/competitions/PL'; // Premier League Base URL

if (!API_KEY) {
  throw new Error('API Key is missing in .env.local');
}

// Helper function to fetch data
const fetchData = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-Auth-Token': API_KEY,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// 1. Get the current Standings
export const getStandings = async () => {
  const data = await fetchData('/standings');
  return data.standings[0].table;
};

// 2. Get the Top Scorers
export const getTopScorers = async () => {
  const data = await fetchData('/scorers');
  return data.scorers;
};

// 3. Get Upcoming Matches
export const getMatches = async () => {
  const data = await fetchData('/matches?status=SCHEDULED');
  return data.matches;
};

// 4. Get Single Team Details
export const getTeamDetails = async (teamId: string) => {
  // Team details use a different URL structure, so we fetch directly here
  const fullUrl = `https://api.football-data.org/v4/teams/${teamId}`;
  
  const res = await fetch(fullUrl, {
    headers: {
      'X-Auth-Token': API_KEY,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // This logs the specific error to your terminal
    console.error(`❌ API Error for Team ID ${teamId}: Status ${res.status}`);
    
    if (res.status === 429) {
      throw new Error("Rate Limit Exceeded. Please wait 1 minute.");
    }

    throw new Error(`Failed to fetch team data. Status: ${res.status}`);
  }

  return res.json();
};