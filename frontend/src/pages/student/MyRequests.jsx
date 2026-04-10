import React, { useState, useEffect } from 'react';
import api from '../../api';

const MyRequests = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchMyBooks();
    }, []);

    const fetchMyBooks = async () => {
        try {
            const res = await api.get('/api/student/my-books', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Issued Books & History</h1>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Book Title</th>
                            <th className="px-6 py-3">Issue Date</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Return Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {books.map(book => (
                            <tr key={book.id}>
                                <td className="px-6 py-4 font-medium">{book.title}</td>
                                <td className="px-6 py-4 text-sm">{new Date(book.issue_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm">{new Date(book.due_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm">{book.return_date ? new Date(book.return_date).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'issued' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                        {book.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No books found in your history.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRequests;
