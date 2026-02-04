# Deploy no Render (GRATUITO) - VERSÃO MELHORADA

## 🎉 Alternativa 100% Gratuita ao Railway

O Render oferece plano gratuito com:
- 750 horas/mês (suficiente para manter o servidor ativo)
- Suporte a Node.js
- Integração com GitHub
- HTTPS automático
- Health checks automáticos

## 📋 Passo a Passo Simplificado

### 1. Acessar Render

1. Acesse: https://render.com
2. Clique em **"Sign up"**
3. Faça login com sua conta GitHub

### 2. Criar Web Service

1. Na dashboard, clique em **"New +"** (canto superior direito)
2. Selecione **"Web Service"**
3. Procure o repositório: **`Preguss/Notification`**
4. Clique em **"Connect"**

### 3. Preencher Configuração

Complete os campos conforme abaixo:

| Campo | Valor |
|-------|-------|
| **Name** | `tiktok-monitor` |
| **Region** | `Frankfurt (EU)` |
| **Branch** | `master` |
| **Root Directory** | `tiktok-monitor/backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm ci` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 4. Adicionar Variáveis de Ambiente

Na seção **"Environment"**, clique em **"Add Environment Variable"** e adicione:

```
MONGODB_URI = mongodb+srv://guest:guest123@cluster0.mongodb.net/tiktok-monitor
PORT = 10000
NODE_ENV = production
```

**Copie exatamente como está acima!**

### 5. Deploy

1. Clique em **"Create Web Service"**
2. Aguarde 2-5 minutos
3. Quando a página ficar verde com "Your service is live 🎉", está pronto!

### 6. Copiar URL do Backend

A URL aparecerá em cima, exemplo:
```
https://tiktok-monitor-XXXXX.onrender.com
```

Copie e guarde essa URL!

### 7. Atualizar Frontend

Edite o arquivo `frontend/.env.production`:

```env
VITE_API_URL=https://tiktok-monitor-XXXXX.onrender.com
```

Substitua `XXXXX` pela sua URL real.

### 8. Deploy do Frontend (GitHub Pages)

Execute no PowerShell:

```powershell
cd c:\Users\pregu\notification-repo\tiktok-monitor\frontend
npm run build
```

Depois:

```powershell
cd c:\Users\pregu\notification-repo
git add tiktok-monitor/frontend/.env.production
git add tiktok-monitor/frontend/dist
git commit -m "feat: Update API URL for Render"
git push origin master
```

### 9. Ativar GitHub Pages

1. Acesse: https://github.com/Preguss/Notification/settings/pages
2. Em **"Source"**, selecione **"GitHub Actions"**
3. Clique em **"Save"**
4. Aguarde 2-3 minutos

### 10. Acessar Seu Site

Abra no navegador:
```
https://preguss.github.io/Notification/tiktok-monitor/
```

## 🔧 Verificar se está Funcionando

### Testar Backend:
```
https://seu-url-render.onrender.com/health
```

Deve mostrar:
```json
{
  "status": "OK",
  "database": "connected",
  "timestamp": "2026-02-04T10:30:00.000Z",
  "uptime": 125.5
}
```

### Testar Raiz:
```
https://seu-url-render.onrender.com/
```

Deve mostrar:
```json
{
  "message": "🎵 TikTok Monitor API",
  "version": "1.0.0",
  "status": "running",
  "database": "connected"
}
```

## 📊 Logs em Tempo Real

Para ver o que está acontecendo:

1. Na página do Render, clique em **"Logs"**
2. Você verá mensagens como:
   ```
   ✅ Porta: 10000
   🌍 Ambiente: production
   ✅ Database status: connected
   ✅ Monitoring scheduler iniciado
   ```

## ⚠️ Problemas Comuns

### "Service is not responding"
- Aguarde 30-50 segundos (primeiro acesso é lento)
- Verifique os logs na dashboard do Render
- Certifique-se que `PORT=10000` está nas variáveis

### "MongoDB connection error"
- Acesse: https://cloud.mongodb.com
- Clique em **"Network Access"**
- Confirme que **"0.0.0.0/0"** está na whitelist

### Frontend mostra "Not connected"
- Verifique a URL no `frontend/.env.production`
- Teste a URL do Render no navegador sozinha
- Aguarde o deploy do GitHub Pages completar

### "No module named..."
- Vá para Render → Settings → Clear build cache and redeploy
- Aguarde novo deploy (vai limpar tudo e refazer)

## 🚀 Melhorias Implementadas

Sua versão agora tem:
- ✅ Health check automático
- ✅ Graceful shutdown
- ✅ Tratamento de erros
- ✅ Logging melhorado
- ✅ Configuração para Render otimizada
- ✅ Suporte a Node >=18

## 💡 Próximos Passos

1. Aguarde o deploy completar (fique de olho nos logs)
2. Teste a URL `/health`
3. Atualize o frontend com a URL correta
4. Faça deploy do frontend
5. Ative GitHub Pages
6. Acesse seu site!

## 🆘 Se Tudo Falhar

Alternativas:
- **Vercel** (melhor para APIs): https://vercel.com
- **Cyclic.sh** (mais simples): https://cyclic.sh
- **Fly.io** (mais robusto): https://fly.io
