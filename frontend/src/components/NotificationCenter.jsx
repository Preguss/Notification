import { useState, useEffect } from 'react'
import './NotificationCenter.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 10000) // Atualizar a cada 10 segundos
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/notifications`)
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/notifications/${id}/read`, { method: 'PATCH' })
      fetchNotifications()
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error)
    }
  }

  const deleteNotification = async (id) => {
    try {
      await fetch(`${API_URL}/notifications/${id}`, { method: 'DELETE' })
      fetchNotifications()
    } catch (error) {
      console.error('Erro ao deletar notificação:', error)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>🔔 Notificações {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</h2>
      </div>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : notifications.length === 0 ? (
        <p className="empty-state">Nenhuma notificação no momento</p>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-content">
                <div className="notification-title">
                  {notification.accountId?.username && (
                    <strong>@{notification.accountId.username}</strong>
                  )}
                </div>
                <div className="notification-message">
                  {notification.message}
                </div>
                <div className="notification-meta">
                  {notification.change !== 0 && (
                    <span className={`change ${notification.change > 0 ? 'positive' : 'negative'}`}>
                      {notification.change > 0 ? '⬆' : '⬇'} {Math.abs(notification.change)}
                    </span>
                  )}
                  <span className="time">
                    {new Date(notification.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="action-btn mark-read"
                    onClick={() => markAsRead(notification._id)}
                    title="Marcar como lido"
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="action-btn delete"
                  onClick={() => deleteNotification(notification._id)}
                  title="Deletar"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
