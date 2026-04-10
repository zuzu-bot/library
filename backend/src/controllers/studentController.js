const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getStudentDashboard = async (req, res) => {
  const userId = req.user.id;
  try {
    const issuedBooks = await db.query(`
      SELECT ib.*, b.title, b.author
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      WHERE ib.user_id = $1 AND ib.status = 'issued'
    `, [userId]);

    const fines = await db.query(`
      SELECT f.*, b.title
      FROM fines f
      JOIN issued_books ib ON f.issued_book_id = ib.id
      JOIN books b ON ib.book_id = b.id
      WHERE f.user_id = $1
    `, [userId]);

    res.json({
      issuedBooks: issuedBooks.rows,
      fines: fines.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

exports.requestIssue = async (req, res) => {
  const userId = req.user.id;
  const { book_id } = req.body;
  try {
    // Check if already requested
    const existing = await db.query(
      "SELECT * FROM issue_requests WHERE user_id = $1 AND book_id = $2 AND status = 'pending'",
      [userId, book_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Request already pending' });
    }

    const result = await db.query(
      'INSERT INTO issue_requests (user_id, book_id) VALUES ($1, $2) RETURNING *',
      [userId, book_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to request issue' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;
  try {
    let query = 'UPDATE users SET name=$1, email=$2';
    let params = [name, email, userId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password=$4';
      params.push(hashedPassword);
    }

    query += ' WHERE id=$3 RETURNING id, name, email, role';
    const result = await db.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.getPersonalHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await db.query(`
      SELECT ib.*, b.title, b.author
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      WHERE ib.user_id = $1
      ORDER BY ib.issue_date DESC
    `, [userId]);
    res.json(history.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

exports.getMyIssuedBooks = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(`
            SELECT ib.*, b.title, b.author
            FROM issued_books ib
            JOIN books b ON ib.book_id = b.id
            WHERE ib.user_id = $1
            ORDER BY ib.issue_date DESC
        `, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your books' });
    }
}
