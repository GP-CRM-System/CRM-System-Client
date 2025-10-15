/* eslint-env node */
// Simple mock API for local frontend development (CommonJS)
// Run: npm run mock

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// In-memory "DB"
const users = {};
const tokens = {}; // token -> email

function generateToken() {
  return 'tok_' + Math.random().toString(36).slice(2, 12);
}

// Seed an admin user for convenience
const adminUser = { name: 'Admin User', email: 'admin@local', role: 'admin', permissions: ['user:create','user:delete','project:view','project:edit','settings:manage', 'employees:view'] };
users[adminUser.email] = { ...adminUser, password: 'password' };

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  if (users[email]) return res.status(400).json({ message: 'User already exists' });
  const user = { name: name || email.split('@')[0], email, role: 'user', permissions: ['project:view'] };
  users[email] = { ...user, password };
  const token = generateToken();
  tokens[token] = email;
  res.cookie('token', token, { httpOnly: true });
  return res.json({ user, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const u = users[email];
  if (!u || u.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
  const user = { name: u.name, email: u.email, role: u.role, permissions: u.permissions };
  const token = generateToken();
  tokens[token] = email;
  res.cookie('token', token, { httpOnly: true });
  return res.json({ user, token });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token || !tokens[token]) return res.status(401).json({ message: 'Not authenticated' });
  const email = tokens[token];
  const u = users[email];
  if (!u) return res.status(404).json({ message: 'User not found' });
  const user = { name: u.name, email: u.email, role: u.role, permissions: u.permissions };
  return res.json({ user });
});

app.listen(port, () => console.log(`Mock API running on http://localhost:${port}`));
