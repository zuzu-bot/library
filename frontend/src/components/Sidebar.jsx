import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Book,
  Users,
  BookOpen,
  FileText,
  UserCircle,
  ClipboardList,
  PlusCircle
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Books Management', path: '/admin/books', icon: <Book size={20} /> },
    { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Issue/Return', path: '/admin/transactions', icon: <ClipboardList size={20} /> },
    { name: 'Fine Reports', path: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Upload Notes/PYQ', path: '/admin/uploads', icon: <PlusCircle size={20} /> },
  ];

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Browse Books', path: '/dashboard/books', icon: <BookOpen size={20} /> },
    { name: 'My Account', path: '/dashboard/account', icon: <UserCircle size={20} /> },
    { name: 'My Requests', path: '/dashboard/requests', icon: <ClipboardList size={20} /> },
    { name: 'Downloads', path: '/dashboard/downloads', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/dashboard/profile', icon: <UserCircle size={20} /> },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-16 overflow-y-auto">
      <div className="p-6">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/admin' || link.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
