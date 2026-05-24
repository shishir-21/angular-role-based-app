import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DB_PATH = path.join(__dirname, '../db.json');

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper to simulate delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login API
app.post('/api/login', async (req, res) => {
  const { userId, password, role, delay = 0 } = req.body;
  if (delay) await simulateDelay(delay);

  const db = readDB();
  const user = db.users.find((u: any) => u.userId === userId && u.password === password && u.role === role);

  if (user) {
    // Basic response without token for dummy API
    res.json({ success: true, user: { id: user.id, userId: user.userId, role: user.role, name: user.name } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials or role' });
  }
});

// Get Records API (Filtered by user access level)
app.get('/api/records', async (req, res) => {
  const userId = req.query.userId as string;
  const role = req.query.role as string;
  const delay = parseInt(req.query.delay as string) || 0;

  if (delay) await simulateDelay(delay);

  const db = readDB();
  
  if (role === 'Admin') {
    // Admin sees all records
    res.json(db.records);
  } else {
    // General user sees only their records
    const userRecords = db.records.filter((r: any) => r.userId === userId);
    res.json(userRecords);
  }
});

// Get all users (Admin only)
app.get('/api/users', async (req, res) => {
  const role = req.query.role as string;
  const delay = parseInt(req.query.delay as string) || 0;

  if (delay) await simulateDelay(delay);

  if (role !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden. Admin access required.' });
  }

  const db = readDB();
  res.json(db.users.map((u: any) => ({ id: u.id, userId: u.userId, role: u.role, name: u.name })));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
