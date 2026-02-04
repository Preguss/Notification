import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tiktok-monitor';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ Erro ao conectar MongoDB: ${error.message}`);
    console.log('⚡ Continuando sem MongoDB - usando memória (dados não persistem)');
    
    // Não sair do processo - continuar mesmo sem MongoDB
    // Dados ficarão em memória durante esta sessão
  }
};

export default connectDB;
