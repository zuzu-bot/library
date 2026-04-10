const db = require('../config/db');
const aiService = require('../services/aiService');

exports.getAllBooks = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT b.*, c.name as category_name
      FROM books b
      LEFT JOIN categories c ON b.category_id = c.id
      ORDER BY b.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, category_id, isbn, quantity, description } = req.body;
  try {
    // Fetch AI metadata
    const metadata = await aiService.getBookMetadata(title, author);

    const result = await db.query(
      'INSERT INTO books (title, author, category_id, isbn, quantity, available_quantity, description, summary, genre) VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8) RETURNING *',
      [title, author, category_id, isbn, quantity, description, metadata.summary, metadata.genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category_id, isbn, quantity, available_quantity, description } = req.body;
  try {
    const result = await db.query(
      'UPDATE books SET title=$1, author=$2, category_id=$3, isbn=$4, quantity=$5, available_quantity=$6, description=$7 WHERE id=$8 RETURNING *',
      [title, author, category_id, isbn, quantity, available_quantity, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM books WHERE id = $1', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

exports.getCategories = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}
