import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Search, Send, Info, X } from 'lucide-react';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const res = await api.get('/api/books');
    setBooks(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get('/api/books/categories');
    setCategories(res.data);
  };

  const handleRequest = async (bookId) => {
    try {
      await api.post('/api/student/request-issue', { book_id: bookId });
      alert('Issue request submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to request book');
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Book Catalog</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search title or author..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                  {book.genre || book.category_name}
                </span>
                <button
                  onClick={() => setSelectedBook(book)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Info size={18} />
                </button>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-4">by {book.author}</p>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {book.description || 'No description available.'}
              </p>
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className={`text-xs font-medium ${book.available_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {book.available_quantity > 0 ? `${book.available_quantity} copies left` : 'Out of stock'}
              </span>
              <button
                onClick={() => handleRequest(book.id)}
                disabled={book.available_quantity <= 0}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm flex items-center gap-2"
              >
                <Send size={14} />
                Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                {selectedBook.genre || 'General'}
              </span>
              <h2 className="text-3xl font-bold mt-4 text-gray-900">{selectedBook.title}</h2>
              <p className="text-lg text-gray-600">by {selectedBook.author}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">ISBN</p>
                <p className="font-mono text-sm">{selectedBook.isbn || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Category</p>
                <p className="text-sm font-medium">{selectedBook.category_name}</p>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{selectedBook.description}</p>
              </section>

              {selectedBook.summary && (
                <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    AI-Generated Summary
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed italic">
                    "{selectedBook.summary}"
                  </p>
                </section>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  handleRequest(selectedBook.id);
                  setSelectedBook(null);
                }}
                disabled={selectedBook.available_quantity <= 0}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                Request this Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;
