import { useState } from 'react'
import './AccountForm.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AccountForm({ onAccountAdded }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!username) {
      setError('Preencha o nome de usuário')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      const response = await fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao adicionar conta')
        return
      }

      setUsername('')
      onAccountAdded()
    } catch (error) {
      setError('Erro ao conectar com o servidor')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Nome de usuário TikTok</label>
        <input
          id="username"
          type="text"
          placeholder="Ex: pregu_s"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="btn btn-submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Conta'}
      </button>
    </form>
  )
}
