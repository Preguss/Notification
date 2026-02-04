import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import startMonitoringScheduler from './utils/scheduler.js';
import accountRoutes from './routes/accountRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://preguss.github.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Iniciar agendador de monitoramento
startMonitoringScheduler();

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

app.use('/api/accounts', accountRoutes);
app.use('/api/notifications', notificationRoutes);

export default app;
