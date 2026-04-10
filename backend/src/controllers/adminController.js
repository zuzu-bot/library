const db = require('../config/db');

exports.getAllStudents = async (req, res) => {
  try {
    const result = await db.query("SELECT id, name, email, role, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email, role',
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await db.query('SELECT SUM(quantity) as count FROM books');
    const issuedBooks = await db.query("SELECT COUNT(*) as count FROM issued_books WHERE status = 'issued'");
    const totalUsers = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const totalFines = await db.query("SELECT SUM(amount) as sum FROM fines");

    res.json({
      totalBooks: totalBooks.rows[0].count || 0,
      issuedBooks: issuedBooks.rows[0].count || 0,
      totalUsers: totalUsers.rows[0].count || 0,
      totalFines: totalFines.rows[0].sum || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.getFineReports = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT f.*, u.name as student_name, b.title as book_title
      FROM fines f
      JOIN users u ON f.user_id = u.id
      JOIN issued_books ib ON f.issued_book_id = ib.id
      JOIN books b ON ib.book_id = b.id
      ORDER BY f.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch fine reports' });
  }
};
