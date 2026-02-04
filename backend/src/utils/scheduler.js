import cron from 'node-cron';
import { checkAllAccounts } from '../services/monitoringService.js';

// Executa verificação a cada 5 minutos
export const startMonitoringScheduler = () => {
  cron.schedule('*/5 * * * *', () => {
    console.log('🔍 Iniciando verificação de contas...');
    checkAllAccounts();
  });

  console.log('⏰ Agendador de monitoramento iniciado (a cada 5 minutos)');
};

export default startMonitoringScheduler;
