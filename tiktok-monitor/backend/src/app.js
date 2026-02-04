import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import startMonitoringScheduler from './utils/scheduler.js';
import accountRoutes from './routes/accountRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://preguss.github.io',
  'https://preguss.github.io/Notification',
  'https://preguss.github.io/Notification/tiktok-monitor'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS não permitido'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Conectar ao banco de dados
let dbStatus = 'connecting';
connectDB()
  .then(() => {
    dbStatus = 'connected';
    console.log('✅ Database status: connected');
  })
  .catch((error) => {
    dbStatus = 'error';
    console.error('⚠️ Database status: error -', error.message);
  });

// Iniciar agendador de monitoramento
try {
  startMonitoringScheduler();
  console.log('✅ Monitoring scheduler iniciado');
} catch (error) {
  console.error('⚠️ Erro ao iniciar scheduler:', error.message);
}

// Health check endpoint (Render usa isso para saber se o app está vivo)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎵 TikTok Monitor API',
    version: '1.0.0',
    status: 'running',
    database: dbStatus,
    endpoints: {
      health: '/health',
      accounts: '/api/accounts',
      notifications: '/api/notifications'
    }
  });
});

// Rotas API
app.use('/api/accounts', accountRoutes);
app.use('/api/notifications', notificationRoutes);

// Servir arquivos estáticos do React
const distPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

// SPA fallback - servir index.html para todas as rotas não encontradas
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handler
app.use((error, req, res, next) => {
  console.error('❌ Erro:', error);
  res.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor',
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

export default app;
