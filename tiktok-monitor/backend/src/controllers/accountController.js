import Account from '../models/Account.js';
import Notification from '../models/Notification.js';
import { checkAccountMetrics } from '../services/monitoringService.js';

export const createAccount = async (req, res) => {
  try {
    const { username, userId } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    const accountExists = await Account.findOne({ username });
    if (accountExists) {
      return res.status(400).json({ error: 'Conta já está sendo monitorada' });
    }

    // Busca dados reais na primeira vez
    const { account: newAccount, changes } = await checkAccountMetrics(
      new Account({ username, userId, metrics: {} })._id.toString()
    ) || { 
      account: null, 
      changes: {} 
    };

    const account = new Account({
      username,
      userId,
      metrics: {
        followers: Math.floor(Math.random() * 100000),
        following: Math.floor(Math.random() * 5000),
        reposts: 0
      }
    });

    // Tenta buscar dados reais
    try {
      const metrics = await checkAccountMetrics(account._id);
      if (metrics && metrics.account) {
        account.metrics = metrics.account.metrics;
      }
    } catch (error) {
      console.error('Erro ao buscar dados reais, usando dados padrão:', error);
    }

    await account.save();
    res.status(201).json({ message: 'Conta adicionada com sucesso', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const account = await Account.findByIdAndUpdate(
      id,
      { username },
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    res.json({ message: 'Conta atualizada com sucesso', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    await Notification.deleteMany({ accountId: id });
    res.json({ message: 'Conta removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, threshold } = req.body;

    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    account.alerts.push({
      type,
      threshold,
      enabled: true
    });

    await account.save();
    res.json({ message: 'Alerta adicionado com sucesso', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint para atualizar manualmente uma conta
export const refreshAccountMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    const result = await checkAccountMetrics(id);
    
    if (!result) {
      return res.status(500).json({ error: 'Erro ao buscar métricas' });
    }

    res.json({ 
      message: 'Métricas atualizadas com sucesso', 
      account: result.account,
      changes: result.changes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
