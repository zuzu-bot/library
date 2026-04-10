const multer = require('multer');
const path = require('path');
const db = require('../config/db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadFile = async (req, res) => {
  const { title, type, category_id } = req.body;
  const file_path = req.file.path;
  try {
    const result = await db.query(
      'INSERT INTO notes_pyqs (title, type, category_id, file_path) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, type, category_id, file_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT n.*, c.name as category_name
      FROM notes_pyqs n
      LEFT JOIN categories c ON n.category_id = c.id
      ORDER BY n.uploaded_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

exports.deleteFile = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM notes_pyqs WHERE id = $1', [id]);
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
}
