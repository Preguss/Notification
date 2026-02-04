import { useState, useEffect } from 'react'
import './App.css'
import AccountForm from './components/AccountForm'
import AccountList from './components/AccountList'
import NotificationCenter from './components/NotificationCenter'

function App() {
  const [serverStatus, setServerStatus] = useState('connecting')

  useEffect(() => {
    checkServer()
    const interval = setInterval(checkServer, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkServer = async () => {
    try {
      const response = await fetch('/health')
      if (response.ok) {
        setServerStatus('connected')
      } else {
        setServerStatus('error')
      }
    } catch (error) {
      setServerStatus('error')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎵 TikTok Monitor</h1>
          <p>Sistema inteligente de monitoramento de contas</p>
        </div>
        <div className="server-status">
          <div className={`status-indicator ${serverStatus}`}></div>
          <span>{serverStatus === 'connected' ? 'Conectado' : 'Desconectado'}</span>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="layout">
            <div className="main-content">
              <AccountForm />
              <AccountList />
            </div>
            <div className="sidebar">
              <NotificationCenter />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 TikTok Monitor - Sistema em desenvolvimento</p>
      </footer>
    </div>
  )
}

export default App
