'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

const SpinPage = () => {
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [wager, setWager] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch balance');
    }
  };

  const handleSpin = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!wager || isNaN(Number(wager)) || Number(wager) <= 0) {
      setError('Enter a valid wager');
      return;
    }

    setLoading(true);
    setError('');
    setResult([]);
    setWinAmount(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/spin`,
        { wager: Number(wager) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResult(res.data.result);
      setWinAmount(res.data.winAmount);
      setBalance(res.data.newBalance);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Spin failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="p-2">
      <Navbar />
      <div className="pt-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎰 Spin the Slot!</h1>

        {balance !== null && (
          <p className="text-xl mb-4">
            Balance: <span className="text-green-600">{balance} coins</span>
          </p>
        )}

        <input
          type="number"
          placeholder="Enter wager"
          value={wager}
          onChange={(e) => setWager(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          disabled={loading}
        />

        <button
          onClick={handleSpin}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full disabled:opacity-50"
        >
          {loading ? 'Spinning...' : 'Spin'}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {loading && (
          <p className="mt-4 text-center text-gray-600">🎲 Spinning the reels...</p>
        )}

        {result.length > 0 && !loading && (
          <div className="mt-6 text-center">
            <p className="text-2xl mb-2">🎲 Result: {result.join(' ')}</p>
            <p className={`text-xl ${winAmount! > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {winAmount! > 0 ? `You won ${winAmount} coins!` : 'No win this time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinPage;
