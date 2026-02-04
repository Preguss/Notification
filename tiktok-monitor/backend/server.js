import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Rejeição não tratada:', reason);
});

// Iniciar servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     🚀 TikTok Monitor Backend          ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║ ✅ Porta: ${PORT}`.padEnd(39) + '║');
  console.log(`║ 🌍 Ambiente: ${ENV}`.padEnd(39) + '║');
  console.log(`║ 📊 Health: http://localhost:${PORT}/health`.padEnd(39) + '║');
  console.log('╚════════════════════════════════════════╝');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📌 SIGTERM recebido, encerrando gracefully...');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📌 SIGINT recebido, encerrando gracefully...');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});
