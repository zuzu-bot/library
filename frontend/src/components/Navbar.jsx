import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center fixed w-full top-0 z-50">
      <div className="flex items-center">
        <img src="/SATI_Vidisha.jpg" alt="logo" className="w-10 h-10 mr-3" />
        <span className="text-xl font-bold text-gray-800">SATI Library</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <UserIcon size={20} />
          <span className="font-medium">{user?.name} ({user?.role})</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
