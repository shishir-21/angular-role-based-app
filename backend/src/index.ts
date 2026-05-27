import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://angular-role-based-app-k8rq.vercel.app'
  ]
}));
app.use(express.json());

const PORT = 3000;
const DB_PATH = path.join(__dirname, '../db.json');

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
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
  res.json(db.users.map((u: any) => ({ id: u.id, userId: u.userId, role: u.role, name: u.name, password: u.password })));
});

// Create User (Admin only)
app.post('/api/users', async (req, res) => {
  const { role: adminRole, delay = 0 } = req.query;
  const { name, userId, password, role } = req.body;
  if (delay) await simulateDelay(parseInt(delay as string));

  if (adminRole !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const db = readDB();
  const newUser = {
    id: Date.now().toString(),
    userId,
    name,
    password,
    role
  };
  
  db.users.push(newUser);
  writeDB(db);

  res.json({ success: true, user: newUser });
});

// Update User (Admin only)
app.put('/api/users/:id', async (req, res) => {
  const { role: adminRole, delay = 0 } = req.query;
  const { id } = req.params;
  const { name, userId, password, role } = req.body;
  
  if (delay) await simulateDelay(parseInt(delay as string));

  if (adminRole !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const db = readDB();
  const userIndex = db.users.findIndex((u: any) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  db.users[userIndex] = { ...db.users[userIndex], name, userId, password, role };
  writeDB(db);

  res.json({ success: true, user: db.users[userIndex] });
});

// Delete User (Admin only)
app.delete('/api/users/:id', async (req, res) => {
  const { role: adminRole, delay = 0 } = req.query;
  const { id } = req.params;
  
  if (delay) await simulateDelay(parseInt(delay as string));

  if (adminRole !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const db = readDB();
  const userIndex = db.users.findIndex((u: any) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  db.users.splice(userIndex, 1);
  writeDB(db);

  res.json({ success: true, message: 'User deleted successfully' });
});
// Root Route
app.get('/', (req, res) => {
  res.send('Backend API is running successfully');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
