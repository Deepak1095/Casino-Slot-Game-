'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';

interface LeaderboardEntry {
  username: string;
  netWin: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats/leaderboard?days=${days}`);
        setLeaderboard(res.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [days]);

  return (
    <div className="p-6 text-white">
        <Navbar/>
      <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>

      <div className="mb-4">
        <label htmlFor="days" className="mr-2 font-medium">Filter by days:</label>
        <select
          id="days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={1}>1 Day</option>
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
        </select>
      </div>

      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="py-2 px-4 border">Rank</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Net Win</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.username}>
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{entry.username}</td>
                <td className="py-2 px-4 border text-right">{entry.netWin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
