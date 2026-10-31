import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0';

// Secret key for HMAC token signing
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'novafx-secret-key-production-8921-secure';
// Admin credentials read securely from server environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Novafx2007';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NovaFX#Pro2026!';

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Persistent registered users storage file
const usersFilePath = path.join(__dirname, 'registered_users.json');
interface RegisteredUserRecord {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  lastLoginAt: string;
}

function loadRegisteredUsers(): RegisteredUserRecord[] {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading registered_users.json:', err);
  }
  return [];
}

function saveRegisteredUsers(users: RegisteredUserRecord[]) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing registered_users.json:', err);
  }
}

// Helper: generate simple signed token
function generateToken(username: string): string {
  const payload = JSON.stringify({
    username,
    role: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const b64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(b64Payload).digest('base64url');
  return `${b64Payload}.${signature}`;
}

// Helper: verify signed token
function verifyToken(token: string): { valid: boolean; username?: string } {
  try {
    const [b64Payload, signature] = token.split('.');
    if (!b64Payload || !signature) return { valid: false };

    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(b64Payload).digest('base64url');
    if (signature !== expectedSig) return { valid: false };

    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) return { valid: false };

    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

// Middleware: Authenticate Admin Request
function requireAdminAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing admin bearer token' });
  }

  const token = authHeader.substring(7);
  const result = verifyToken(token);

  if (!result.valid) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }

  (req as any).adminUser = result.username;
  next();
}

// API: Admin Credentials Login
app.post('/api/admin/login', (req: Request, res: Response): any => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Strict comparison against server-side environment variables
  const isUserMatch = username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase();
  const isPassMatch = password === ADMIN_PASSWORD;

  if (!isUserMatch || !isPassMatch) {
    return res.status(401).json({ error: 'Invalid username or password credentials.' });
  }

  const token = generateToken(ADMIN_USERNAME);
  return res.json({
    success: true,
    token,
    user: {
      username: ADMIN_USERNAME,
      role: 'admin',
      displayName: 'NOVA FX Administrator',
    },
  });
});

// API: Verify Admin Token
app.get('/api/admin/verify', (req: Request, res: Response): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, error: 'Missing authorization header' });
  }

  const token = authHeader.substring(7);
  const result = verifyToken(token);

  if (!result.valid) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired session' });
  }

  return res.json({
    valid: true,
    user: {
      username: result.username,
      role: 'admin',
    },
  });
});

// API: User Sync Endpoint (called upon Google Sign-In)
app.post('/api/users/sync', (req: Request, res: Response): any => {
  try {
    const { uid, displayName, email, photoURL } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: 'Missing uid or email' });
    }

    const users = loadRegisteredUsers();
    const existingIndex = users.findIndex((u) => u.uid === uid || u.email === email);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      users[existingIndex].lastLoginAt = now;
      if (displayName) users[existingIndex].displayName = displayName;
      if (photoURL) users[existingIndex].photoURL = photoURL;
    } else {
      users.unshift({
        uid,
        displayName: displayName || email.split('@')[0],
        email,
        photoURL: photoURL || '',
        createdAt: now,
        lastLoginAt: now,
      });
    }

    saveRegisteredUsers(users);
    return res.json({ success: true, count: users.length });
  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).json({ error: 'Failed to sync user' });
  }
});

// API: Protected Admin Registered Users Endpoint
app.get('/api/admin/users', requireAdminAuth, (_req: Request, res: Response): any => {
  const users = loadRegisteredUsers();
  return res.json({ success: true, users });
});

// API: Image Upload & Storage Endpoint (Admin Protected)
app.post('/api/upload', (req: Request, res: Response): any => {
  try {
    const { imageBase64, fileName } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided.' });
    }

    // Extract base64 mime type and buffer
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already a URL, return it directly
      if (imageBase64.startsWith('http://') || imageBase64.startsWith('https://')) {
        return res.json({ url: imageBase64 });
      }
      return res.status(400).json({ error: 'Invalid base64 format.' });
    }

    const mimeType = matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    const ext = mimeType.split('/')[1] || 'jpg';
    const cleanFileName = `img_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
    const filePath = path.join(uploadsDir, cleanFileName);

    fs.writeFileSync(filePath, dataBuffer);

    const publicUrl = `/uploads/${cleanFileName}`;
    return res.json({ url: publicUrl, success: true });
  } catch (error) {
    console.error('Image upload server error:', error);
    return res.status(500).json({ error: 'Failed to process image upload.' });
  }
});

// Dev vs Prod Vite Integration
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`NOVA FX server listening on http://${HOST}:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});
