'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

interface Transaction {
  _id: string;
  amount: number;
  win: number;
  symbols: string[];
  createdAt: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const balanceRes = await axios.get('https://casino-slot-game.vercel.app/api/balance', config);
      const txRes = await axios.get(`https://casino-slot-game.vercel.app/api/balance/transactions?page=${page}&limit=${limit}`, config);

      setBalance(balanceRes.data.balance);
      setTransactions(txRes.data.transactions);
      setTotalPages(Math.ceil(txRes.data.totalCount / limit));
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch data. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      {balance !== null && (
        <div className="mb-6">
          <p className="text-xl font-semibold">
            Current Balance: <span className="text-green-600">{balance} coins</span>
          </p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-2">Recent Transactions</h2>
        <div className="bg-white rounded shadow p-4 text-black">
          {loading ? (
            <p className="text-center py-4 text-gray-600">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Amount</th>
                    <th className="py-2">Win</th>
                    <th className="py-2">Symbols</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx._id} className="border-b">
                      <td className="py-1">{tx.amount}</td>
                      <td className={`py-1 ${tx.win > 0 ? 'text-green-600' : 'text-red-500'}`}>{tx.win}</td>
                      <td className="py-1">{tx.symbols.join(' ')}</td>
                      <td className="py-1">{new Date(tx.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
