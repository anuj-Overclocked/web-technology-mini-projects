
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { pool, checkDatabaseConnection } = require('./db');

const app = express();
const port = Number(process.env.PORT) || 8081;
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(frontendPath));

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await checkDatabaseConnection();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Health check failed:', error.message);
    res.status(503).json({
      status: 'error',
      database: 'unavailable',
      message: 'Database connection is unavailable.'
    });
  }
});

// Register
app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body || {};
  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';
  const trimmedName =
    typeof fullName === 'string' ? fullName.trim() : '';

  if (!trimmedName || !normalizedEmail || !password) {
    return res.status(400).json({
      message: 'Full name, email, and password are required.'
    });
  }

  if (!validateEmail(normalizedEmail)) {
    return res.status(400).json({
      message: 'Please provide a valid email address.'
    });
  }

  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long.'
    });
  }

  try {
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await pool.execute(
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
      [trimmedName, normalizedEmail, passwordHash]
    );

    return res.status(201).json({
      message: 'Account created successfully.'
    });
  } catch (error) {
    console.error('Registration failed:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    return res.status(500).json({
      message: 'Registration could not be completed right now.'
    });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!normalizedEmail || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  if (!validateEmail(normalizedEmail)) {
    return res.status(400).json({
      message: 'Please provide a valid email address.'
    });
  }

  try {
    const [users] = await pool.execute(
      'SELECT id, full_name, email, password FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (
      users.length === 0 ||
      !(await bcrypt.compare(password, users[0].password))
    ) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    return res.json({
      message: 'Login successful.',
      user: {
        id: users[0].id,
        fullName: users[0].full_name,
        email: users[0].email
      }
    });
  } catch (error) {
    console.error('Login failed:', error.message);

    return res.status(500).json({
      message: 'Login could not be completed right now.'
    });
  }
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const [books] = await pool.execute(
      `SELECT id, title, author, category, price, description,
              image_url AS imageUrl, created_at AS createdAt
       FROM books
       ORDER BY id`
    );

    return res.json(books);
  } catch (error) {
    console.error('Book list failed:', error.message);

    return res.status(500).json({
      message: 'Books could not be loaded right now.'
    });
  }
});

// Get one book
app.get('/api/books/:id', async (req, res) => {
  const bookId = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(bookId) || bookId < 1) {
    return res.status(400).json({
      message: 'Book ID must be a positive number.'
    });
  }

  try {
    const [books] = await pool.execute(
      `SELECT id, title, author, category, price, description,
              image_url AS imageUrl, created_at AS createdAt
       FROM books
       WHERE id = ?`,
      [bookId]
    );

    if (books.length === 0) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    return res.json(books[0]);
  } catch (error) {
    console.error('Book details failed:', error.message);

    return res.status(500).json({
      message: 'Book details could not be loaded right now.'
    });
  }
});

// Unknown API endpoints
app.use('/api', (req, res) => {
  return res.status(404).json({
    message: 'API endpoint not found.'
  });
});

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server — only one listener
app.listen(port, () => {
  console.log(`BOOKHUB server running at http://localhost:${port}`);

  checkDatabaseConnection()
    .then(() => console.log('MySQL database connected.'))
    .catch((error) => {
      console.warn(`MySQL connection unavailable: ${error.message}`);
    });
});
