'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 mb-10">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          🎰 Casino Game
        </Link>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/spin" className="hover:underline">Spin</Link>
              <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
              <button onClick={handleLogout} className="hover:underline text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={toggleMenu} className="hover:underline">Dashboard</Link>
              <Link href="/spin" onClick={toggleMenu} className="hover:underline">Spin</Link>
              <Link href="/leaderboard" onClick={toggleMenu} className="hover:underline">Leaderboard</Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="hover:underline text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={toggleMenu} className="hover:underline">Login</Link>
              <Link href="/register" onClick={toggleMenu} className="hover:underline">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
