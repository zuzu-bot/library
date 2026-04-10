const db = require('../config/db');

exports.issueBook = async (req, res) => {
  const { user_id, book_id, due_date } = req.body;
  try {
    await db.query('BEGIN');

    // Check book availability
    const bookRes = await db.query('SELECT available_quantity FROM books WHERE id = $1', [book_id]);
    if (bookRes.rows[0].available_quantity <= 0) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Book not available' });
    }

    // Insert into issued_books
    await db.query(
      'INSERT INTO issued_books (user_id, book_id, due_date) VALUES ($1, $2, $3)',
      [user_id, book_id, due_date]
    );

    // Update available quantity
    await db.query('UPDATE books SET available_quantity = available_quantity - 1 WHERE id = $1', [book_id]);

    // Update issue request if exists
    await db.query(
      "UPDATE issue_requests SET status = 'approved' WHERE user_id = $1 AND book_id = $2 AND status = 'pending'",
      [user_id, book_id]
    );

    await db.query('COMMIT');
    res.json({ message: 'Book issued successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to issue book' });
  }
};

exports.returnBook = async (req, res) => {
  const { issued_book_id } = req.body;
  try {
    await db.query('BEGIN');

    const issuedBookRes = await db.query('SELECT * FROM issued_books WHERE id = $1', [issued_book_id]);
    const issuedBook = issuedBookRes.rows[0];

    if (issuedBook.status === 'returned') {
       await db.query('ROLLBACK');
       return res.status(400).json({ error: 'Book already returned' });
    }

    const return_date = new Date();
    await db.query(
      "UPDATE issued_books SET return_date = $1, status = 'returned' WHERE id = $2",
      [return_date, issued_book_id]
    );

    await db.query('UPDATE books SET available_quantity = available_quantity + 1 WHERE id = $1', [issuedBook.book_id]);

    // Calculate fine
    const dueDate = new Date(issuedBook.due_date);
    if (return_date > dueDate) {
      const diffTime = Math.abs(return_date - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const fineAmount = diffDays * 10; // 10 currency units per day
      await db.query(
        'INSERT INTO fines (user_id, issued_book_id, amount) VALUES ($1, $2, $3)',
        [issuedBook.user_id, issued_book_id, fineAmount]
      );
    }

    await db.query('COMMIT');
    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to return book' });
  }
};

exports.getAllIssuedBooks = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT ib.*, b.title, u.name as user_name, u.email as user_email
            FROM issued_books ib
            JOIN books b ON ib.book_id = b.id
            JOIN users u ON ib.user_id = u.id
            ORDER BY ib.issue_date DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch issued books' });
    }
};

exports.getIssueRequests = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT ir.*, b.title, u.name as user_name, u.email as user_email
            FROM issue_requests ir
            JOIN books b ON ir.book_id = b.id
            JOIN users u ON ir.user_id = u.id
            WHERE ir.status = 'pending'
            ORDER BY ir.request_date DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch issue requests' });
    }
}
