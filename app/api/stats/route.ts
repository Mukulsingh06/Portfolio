import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Fetch LeetCode (Username: mukulsingh06)
  let leetcodeStats = { totalSolved: "N/A", easy: "N/A", medium: "N/A", hard: "N/A", ranking: "N/A" };
  try {
    const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/mukulsingh06', { next: { revalidate: 3600 } });
    if (lcRes.ok) {
      const lcData = await lcRes.json();
      if (lcData.status === "success") {
        leetcodeStats = {
          totalSolved: lcData.totalSolved,
          easy: lcData.easySolved,
          medium: lcData.mediumSolved,
          hard: lcData.hardSolved,
          ranking: lcData.ranking
        };
      }
    }
  } catch (e) { console.error("LeetCode fetch error:", e); }

  // 2. Fetch GFG (Username: mukulsingh01)
  let gfgStats = { totalSolved: "N/A", codingScore: "N/A", institutionRank: "N/A", badges: ["ACTIVE_CODER", "PROBLEM_SOLVER"] };
  try {
    const gfgRes = await fetch('https://geeks-for-geeks-api.vercel.app/mukulsingh01', { next: { revalidate: 3600 } });
    if (gfgRes.ok) {
      const gfgData = await gfgRes.json();
      gfgStats = {
        totalSolved: gfgData.info?.totalProblemsSolved || gfgData.totalProblemsSolved || "N/A",
        codingScore: gfgData.info?.codingScore || gfgData.codingScore || "N/A",
        institutionRank: gfgData.info?.institutionRank || gfgData.institutionRank || "N/A",
        badges: ["50_DAY_STREAK", "EXPERT_CODER"] // The GFG API wrapper doesn't send actual badges, so we pass these from the backend to control them dynamically.
      };
    }
  } catch (e) { console.error("GFG fetch error:", e); }

  // Return combined payload
  return NextResponse.json({
    leetcode: leetcodeStats,
    gfg: gfgStats,
    status: "ONLINE"
  });
}