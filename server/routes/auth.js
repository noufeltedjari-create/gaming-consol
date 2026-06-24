const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// ─── Seller Login ─────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { "password": "1234" }
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  const correctPassword = process.env.SELLER_PASSWORD || '1234';

  if (password !== correctPassword) {
    return res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة' });
  }

  // Generate JWT token valid for 8 hours
  const token = jwt.sign(
    { role: 'seller' },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '8h' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    token,
    expiresIn: '8h',
  });
});

// ─── Verify Token ─────────────────────────────────────────────────────────────
// GET /api/auth/verify
// Header: Authorization: Bearer <token>
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    res.json({ success: true, role: decoded.role });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
