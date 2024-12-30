import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              Traffic Violation System
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/notifications" className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </Link>
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}