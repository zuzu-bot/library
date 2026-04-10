// Mock DB for verification
module.exports = {
  query: async (text, params) => {
    console.log('MOCK QUERY:', text, params);
    if (text.includes('SELECT * FROM users WHERE email = $1')) {
        return { rows: [{ id: 1, name: 'Admin', email: 'admin@test.com', password: 'hash', role: 'admin' }] };
    }
    if (text.includes('SELECT SUM(quantity) as count FROM books')) {
        return { rows: [{ count: 100 }] };
    }
    if (text.includes('SELECT COUNT(*) as count FROM issued_books')) {
        return { rows: [{ count: 10 }] };
    }
    if (text.includes('SELECT COUNT(*) as count FROM users')) {
        return { rows: [{ count: 50 }] };
    }
    if (text.includes('SELECT SUM(amount) as sum FROM fines')) {
        return { rows: [{ sum: 500 }] };
    }
    return { rows: [] };
  },
};
