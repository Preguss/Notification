# 🎵 TikTok Monitor - Guia de Instalação e Uso

Um sistema completo de monitoramento de contas TikTok com alertas em tempo real.

## 🚀 Quick Start

### Pré-requisitos
- **Node.js** 16+ instalado
- **MongoDB** rodando localmente (ou mude a URL em `.env`)
- **npm** ou **yarn**

### 1️⃣ Instalação do Backend

```bash
cd backend
npm install
cp .env.example .env
```

**Configure o `.env`:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tiktok-monitor
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Inicie o servidor:**
```bash
npm run dev
```

Você verá:
```
Servidor rodando na porta 5000
⏰ Agendador de monitoramento iniciado (a cada 5 minutos)
```

### 2️⃣ Instalação do Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📋 Funcionalidades Implementadas

### ✅ Backend
- **API REST** completa para contas e notificações
- **MongoDB** para persistência de dados
- **Agendador automático** (node-cron) que verifica contas a cada 5 minutos
- **Sistema de notificações** que detecta mudanças em:
  - 👥 Seguidores
  - 👤 Seguindo
  - 🔄 Reposts
- **Modelos de dados** estruturados (Accounts, Notifications)

### ✅ Frontend (React + Vite)
- **Dashboard** responsivo e moderno
- **Adicionar contas** para monitorar
- **Listar todas as contas** com suas métricas atuais
- **Centro de notificações** com atualização em tempo real
- **Marcar notificações como lidas**
- **Deletar contas e notificações**
- **Status de conexão** do servidor

---

## 🎮 Como Usar

### Adicionar uma Conta para Monitorar

1. Clique em **"➕ Adicionar Conta"**
2. Preencha:
   - **Nome de usuário**: @usuario (ex: `user123`)
   - **ID do usuário**: ID numérico (ex: `1234567890`)
3. Clique em **"Adicionar Conta"**

### Ver Notificações

- As **notificações aparecem automaticamente** quando há mudanças
- Use **✓** para marcar como lida
- Use **✕** para deletar
- O **badge vermelho** mostra quantas não lidas há

### Monitoramento Automático

- O sistema verifica **cada conta a cada 5 minutos**
- Se houver mudanças, **notificações são criadas automaticamente**
- Você pode ajustar o intervalo em `backend/src/utils/scheduler.js`

---

## 📊 API Endpoints

### Contas
```
POST   /api/accounts              - Criar conta
GET    /api/accounts              - Listar todas
GET    /api/accounts/:id          - Obter uma
PUT    /api/accounts/:id          - Atualizar
DELETE /api/accounts/:id          - Deletar
POST   /api/accounts/:id/alerts   - Adicionar alerta
```

### Notificações
```
GET    /api/notifications         - Listar todas
PATCH  /api/notifications/:id/read - Marcar como lida
DELETE /api/notifications/:id     - Deletar
```

### Health Check
```
GET    /api/health                - Verificar status do servidor
```

---

## 📁 Estrutura do Projeto

```
tiktok-monitor/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Conexão MongoDB
│   │   ├── controllers/
│   │   │   ├── accountController.js
│   │   │   └── notificationController.js
│   │   ├── models/
│   │   │   ├── Account.js
│   │   │   └── Notification.js
│   │   ├── routes/
│   │   │   ├── accountRoutes.js
│   │   │   └── notificationRoutes.js
│   │   ├── services/
│   │   │   └── monitoringService.js  # Lógica de verificação
│   │   ├── utils/
│   │   │   └── scheduler.js        # Agendador cron
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AccountList.jsx     # Lista de contas
│   │   │   ├── AccountForm.jsx     # Formulário adicionar
│   │   │   ├── NotificationCenter.jsx  # Notificações
│   │   │   └── *.css               # Estilos
│   │   ├── App.jsx                 # Componente principal
│   │   ├── index.jsx               # Entry point
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Próximas Melhorias

- [ ] Integração com TikTok API real
- [ ] Autenticação de usuários
- [ ] Alertas por email/Discord/Telegram
- [ ] Gráficos de tendência
- [ ] Exportar relatórios
- [ ] Testes unitários
- [ ] Deploy em produção

---

## 🐛 Troubleshooting

### MongoDB não conecta
```bash
# Verifique se MongoDB está rodando:
# Windows: mongod
# Linux: sudo systemctl start mongod

# Ou use uma URL remota no .env:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tiktok-monitor
```

### Porta 5000 já em uso
```bash
# Mude no .env:
PORT=5001
```

### Frontend não conecta ao backend
- Certifique-se que backend está rodando em `http://localhost:5000`
- Verifique o CORS em `backend/src/app.js`

---

## 📝 Licença

MIT - Livre para usar e modificar

---

## 🤝 Suporte

Qualquer dúvida? Verifique os logs do terminal para mais detalhes sobre erros!

Happy Monitoring! 🎵📊
