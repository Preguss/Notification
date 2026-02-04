import { useState, useEffect } from 'react'
import './AccountList.css'
import AccountForm from './AccountForm'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AccountList() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [refreshing, setRefreshing] = useState(null)

  useEffect(() => {
    fetchAccounts()
    const interval = setInterval(fetchAccounts, 30000) // Atualizar a cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/accounts`)
      const data = await response.json()
      setAccounts(data)
    } catch (error) {
      console.error('Erro ao buscar contas:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshMetrics = async (id) => {
    try {
      setRefreshing(id)
      const response = await fetch(`${API_URL}/accounts/${id}/refresh`, { 
        method: 'POST' 
      })
      const data = await response.json()
      
      if (response.ok) {
        // Atualizar a conta na lista
        setAccounts(accounts.map(acc => 
          acc._id === id ? data.account : acc
        ))
      }
    } catch (error) {
      console.error('Erro ao atualizar métricas:', error)
    } finally {
      setRefreshing(null)
    }
  }

  const deleteAccount = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta conta?')) {
      try {
        await fetch(`${API_URL}/accounts/${id}`, { method: 'DELETE' })
        fetchAccounts()
      } catch (error) {
        console.error('Erro ao deletar conta:', error)
      }
    }
  }

  const handleAccountAdded = () => {
    setShowForm(false)
    fetchAccounts()
  }

  return (
    <div className="account-list">
      <div className="account-header">
        <h2>📊 Contas Monitoradas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '➕ Adicionar Conta'}
        </button>
      </div>

      {showForm && <AccountForm onAccountAdded={handleAccountAdded} />}

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : accounts.length === 0 ? (
        <p className="empty-state">Nenhuma conta monitorada. Adicione uma para começar!</p>
      ) : (
        <div className="accounts-grid">
          {accounts.map(account => (
            <div key={account._id} className="account-card">
              <div className="account-header-card">
                <h3>@{account.username}</h3>
                <div className="card-actions">
                  <button 
                    className="btn-refresh"
                    onClick={() => refreshMetrics(account._id)}
                    disabled={refreshing === account._id}
                    title="Atualizar agora"
                  >
                    {refreshing === account._id ? '⏳' : '🔄'}
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => deleteAccount(account._id)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="metrics">
                <div className="metric">
                  <span className="metric-label">👥 Seguidores</span>
                  <span className="metric-value">
                    {account.metrics.followers?.toLocaleString('pt-BR') || '0'}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">👤 Seguindo</span>
                  <span className="metric-value">
                    {account.metrics.following?.toLocaleString('pt-BR') || '0'}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">🔄 Reposts</span>
                  <span className="metric-value">
                    {account.metrics.reposts?.toLocaleString('pt-BR') || '0'}
                  </span>
                </div>
              </div>

              <div className="account-footer">
                <small>
                  Última verificação: {
                    account.lastChecked
                      ? new Date(account.lastChecked).toLocaleString('pt-BR')
                      : 'Nunca'
                  }
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
