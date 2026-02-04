# Deploy no Render (GRATUITO)

## 🎉 Alternativa 100% Gratuita ao Railway

O Render oferece plano gratuito com:
- 750 horas/mês (suficiente para manter o servidor ativo)
- Suporte a Node.js
- Integração com GitHub
- HTTPS automático

## 📋 Passo a Passo

### 1. Criar Conta no Render

1. Acesse: https://render.com
2. Clique em "Get Started" ou "Sign Up"
3. Escolha "Sign in with GitHub"
4. Autorize o acesso aos seus repositórios

### 2. Criar Web Service

1. No dashboard do Render, clique em **"New +"** (canto superior direito)
2. Selecione **"Web Service"**
3. Conecte seu repositório GitHub:
   - Procure por: `Preguss/Notification`
   - Clique em **"Connect"**

### 3. Configurar o Service

Preencha os campos:

- **Name**: `tiktok-monitor-backend` (ou qualquer nome)
- **Region**: `Frankfurt (EU Central)` (mais próximo do Brasil)
- **Branch**: `master`
- **Root Directory**: `tiktok-monitor/backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 4. Adicionar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

```
MONGODB_URI=mongodb+srv://guest:guest123@cluster0.mongodb.net/tiktok-monitor
PORT=10000
NODE_ENV=production
```

**IMPORTANTE**: O Render usa a porta 10000 por padrão no plano gratuito.

### 5. Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (pode levar 2-5 minutos)
3. Você verá os logs em tempo real
4. Quando aparecer "Your service is live 🎉", copie a URL

### 6. Atualizar Frontend

A URL será algo como: `https://tiktok-monitor-backend.onrender.com`

Atualize o arquivo `frontend/.env.production`:

```env
VITE_API_URL=https://tiktok-monitor-backend.onrender.com
```

### 7. Deploy do Frontend no GitHub Pages

Execute no terminal:

```powershell
cd c:\Users\pregu\notification-repo\tiktok-monitor\frontend
npm run build
```

Depois faça commit e push:

```powershell
cd c:\Users\pregu\notification-repo
git add tiktok-monitor/frontend/.env.production
git add tiktok-monitor/frontend/dist
git commit -m "feat: Update API URL for Render deployment"
git push origin master
```

### 8. Ativar GitHub Pages

1. Acesse: https://github.com/Preguss/Notification/settings/pages
2. Em **"Source"**, selecione **"GitHub Actions"**
3. Aguarde o workflow executar (pode levar 2-3 minutos)
4. Acesse: https://preguss.github.io/Notification/tiktok-monitor/

## ⚠️ Limitações do Plano Gratuito

- **Sleep após 15min de inatividade**: O servidor "dorme" após 15 minutos sem requisições
- **Cold Start**: A primeira requisição após o sleep pode demorar 30-50 segundos
- **Solução**: O próprio cron job do monitoramento manterá o servidor ativo (roda a cada 5 minutos)

## 🔧 Verificar Status

### Testar Backend:
```
https://tiktok-monitor-backend.onrender.com/health
```

Deve retornar:
```json
{
  "status": "OK",
  "database": "connected",
  "timestamp": "2026-02-04T..."
}
```

### Testar Frontend:
```
https://preguss.github.io/Notification/tiktok-monitor/
```

## 🆘 Problemas Comuns

### Backend não inicia
- Verifique os logs no dashboard do Render
- Confirme que as variáveis de ambiente estão corretas
- Certifique-se de que PORT=10000

### "Not connected to server" no frontend
- Aguarde 1 minuto para o cold start
- Verifique se a URL do Render está correta no .env.production
- Teste a URL do backend diretamente no navegador

### MongoDB connection error
- Verifique se o IP 0.0.0.0/0 está permitido no MongoDB Atlas
- Confirme a string de conexão MONGODB_URI

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. Adicione uma conta TikTok pelo frontend
2. Aguarde 5 minutos para o primeiro monitoramento
3. Verifique as notificações de mudanças

## 💡 Dica

Se o Render também pedir pagamento ou limitar demais, existem outras alternativas gratuitas:

- **Cyclic.sh** - Ainda mais simples que Render
- **Fly.io** - 3 VMs gratuitas
- **Vercel** - Bom para APIs serverless
- **Glitch** - Interface simples mas com limitações
