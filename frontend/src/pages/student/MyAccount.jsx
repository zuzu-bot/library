import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Clock, Book, DollarSign, User } from 'lucide-react';

const MyAccount = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/api/student/history');
      setHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const activeBooks = history.filter(b => b.status === 'issued');
  const totalFines = history.reduce((acc, curr) => acc + (curr.fine_amount || 0), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-blue-600 p-3 rounded-full text-white">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <Book size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Currently Issued</p>
            <p className="text-xl font-bold">{activeBooks.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Borrowed</p>
            <p className="text-xl font-bold">{history.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Fines</p>
            <p className="text-xl font-bold">${totalFines}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Book</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Issue Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Due Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Return Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.author}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(item.issue_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(item.due_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.return_date ? new Date(item.return_date).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'issued' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAccount;
