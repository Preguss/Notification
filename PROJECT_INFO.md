# TikTok Monitor

Sistema de monitoramento de contas TikTok com alertas em tempo real.

## 📋 Características

- ✅ Monitorar seguidores, seguindo e reposts
- ✅ Alertas automáticos em caso de mudanças
- ✅ Dashboard em tempo real
- ✅ Histórico de mudanças
- ✅ Sistema de notificações

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB
- Node-cron (agendador de tarefas)
- JWT (autenticação)

### Frontend
- React
- Vite
- Axios

## 📁 Estrutura do Projeto

```
tiktok-monitor/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── index.html
└── README.md
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+
- MongoDB

### Instalação

1. **Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas configurações
npm run dev
```

2. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 📝 Próximas Etapas

- [ ] Integração com TikTok API
- [ ] Sistema de autenticação
- [ ] Dashboard completo
- [ ] Alertas via email/Discord
- [ ] Testes unitários

## 📄 Licença

MIT
